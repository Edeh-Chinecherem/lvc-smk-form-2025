const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for attendees (replace with a database in production)
const attendees = [];

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