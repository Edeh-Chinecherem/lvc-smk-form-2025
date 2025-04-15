import React, { useState } from "react";
import "../styles/index.css";

const AdminRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Admin registered successfully");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setMessage(data.message || "Failed to register admin");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setMessage("Failed to register admin. Please try again later.");
        }
    };

    return (
        <div className="admin-register-container">
    <form className="admin-register-form" onSubmit={handleRegister}>
        <h2 className="admin-register-title">Admin Registration</h2>
        {message && <p className="admin-register-error">{message}</p>}
        <input
            type="text"
            className="admin-register-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            type="password"
            className="admin-register-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <input
            type="password"
            className="admin-register-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        <button type="submit" className="admin-register-button">Register</button>
    </form>
</div>
    );
};

export default AdminRegister;