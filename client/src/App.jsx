import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AdminRegister from "./components/AdminRegister"; // Import the Admin Registration component

const Navbar = () => (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0", marginBottom: "20px" }}>
    <ul style={{ listStyle: "none", display: "flex", gap: "20px", padding: 0 }}>
    <li>
    <Link to="/" style={{ textDecoration: "none", color: "blue" }}>Registration Form</Link>
    </li>
    <li>
    <Link to="/dashboard" style={{ textDecoration: "none", color: "blue" }}>Dashboard</Link>
    </li>
    <li>
    <Link to="/admin/register" style={{ textDecoration: "none", color: "blue" }}>Admin Register</Link>
    </li>
    </ul>
    </nav>
    );
    
    const App = () => {
    // Function to check if the user is authenticated
    const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Check if a token exists in localStorage
    };
    
    return (
        <Router>
            <div>
                {/* Navbar for navigation */}
                <Navbar />

                {/* Routes for different pages */}
                <Routes>
                    {/* Route for the Registration Form */}
                    <Route path="/" element={<RegistrationForm />} />

                    {/* Route for the Login Page */}
                    <Route path="/login" element={<Login />} />

                    {/* Route for the Admin Registration Page */}
                    <Route
                        path="/admin/register"
                        element={isAuthenticated() ? <AdminRegister /> : <Navigate to="/login" />}
                    />

                    {/* Protected Route for the Dashboard */}
                    <Route
                        path="/dashboard"
                        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;