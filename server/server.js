const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For hashing passwords

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for attendees and admins (replace with a database in production)
const attendees = [];
const admins = [];

// Route to allow admin to create login details
app.post("/api/admin/register", async (req, res) => {
    const { username, password } = req.body;

    // Validate the incoming data
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    const existingAdmin = admins.find((admin) => admin.username === username);
    if (existingAdmin) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new admin to the in-memory storage
    const newAdmin = { username, password: hashedPassword };
    admins.push(newAdmin);

    console.log("New admin registered:", newAdmin);

    res.status(201).json({ message: "Admin registered successfully" });
});

// Route to handle admin login
app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;

    // Validate the incoming data
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Find the admin by username
    const admin = admins.find((admin) => admin.username === username);
    if (!admin) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
});

// Route to register an attendee
app.post("/api/register", (req, res) => {
    const attendee = req.body;

    // Validate the incoming data
    if (!attendee.name || !attendee.category) {
        return res.status(400).json({ message: "Name and category are required" });
    }

    console.log("Received data:", attendee);

    // Add the attendee to the in-memory storage
    attendees.push(attendee);

    res.status(200).json({ message: "Registration successful" });
});

// Route to get attendees by category
app.get("/api/attendees", (req, res) => {
    const { category } = req.query; // Get the category from query parameters

    if (category) {
        // Filter attendees by category
        const filteredAttendees = attendees.filter(
            (attendee) => attendee.category.toLowerCase() === category.toLowerCase()
        );
        res.status(200).json(filteredAttendees);
    } else {
        // Return all attendees if no category is specified
        res.status(200).json(attendees);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5000`);
});