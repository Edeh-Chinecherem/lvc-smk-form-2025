import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Save the token in localStorage
                localStorage.setItem("token", data.token);
                navigate("/dashboard"); // Redirect to the dashboard
            } else {
                setError(data.message || "Invalid login credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to login. Please try again later.");
        }
    };

    return (
        <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Admin Login</h2>
        {error && <p className="login-error">{error}</p>}
        <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit" className="login-button">Login</button>
    </form>
</div>
    );
};

export default Login;