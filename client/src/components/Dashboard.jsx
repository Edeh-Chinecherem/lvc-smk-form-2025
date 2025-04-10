import React, { useEffect, useState } from "react";
import "../styles/index.css"; // Ensure your CSS styles are imported

const Dashboard = () => {
    const [campers, setCampers] = useState([]);
    const [sucfMembers, setSucfMembers] = useState([]);
    const [pilgrims, setPilgrims] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:5000/api/attendees"); // Fetch data from the backend
                const data = await response.json();

                // Filter data by category
                setCampers(data.filter((user) => user.category === "Camper"));
                setSucfMembers(data.filter((user) => user.category === "SUCF"));
                setPilgrims(data.filter((user) => user.category === "Pilgrim"));
            } catch (err) {
                console.error("Failed to fetch data:", err);
                alert("Failed to load dashboard data.");
            }
        }

        fetchData();
    }, []);

    const renderTable = (data, columns) => (
        <div className="table-container">
            <table className="dashboard-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((user, index) => (
                            <tr key={index}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>{user[column.toLowerCase()] || "N/A"}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center" }}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <img src="/sulogo.jpg" alt="LVC SMK Zone Logo" className="dashboard-logo" />
                <h1 className="dashboard-title">LVC 2025 SMK Zone Dashboard</h1>
            </header>
            <main className="dashboard-main">
                <h2>Camp Registration Dashboard</h2>

                {/* Section for Campers */}
                <section className="dashboard-section">
                    <h3>Campers</h3>
                    {renderTable(campers, [
                        "Name",
                        "Gender",
                        "Email",
                        "Address",
                        "Phone",
                        "School",
                        "Church",
                        "Age",
                        "Class",
                        "Community",
                        "Medical Conditions",
                        "Medical Details",
                    ])}
                </section>

                {/* Section for SUCF Members */}
                <section className="dashboard-section">
                    <h3>SUCF Members</h3>
                    {renderTable(sucfMembers, [
                        "Name",
                        "Gender",
                        "Email",
                        "Address",
                        "Phone",
                        "Church",
                    ])}
                </section>

                {/* Section for Pilgrims */}
                <section className="dashboard-section">
                    <h3>Pilgrims</h3>
                    {renderTable(pilgrims, [
                        "Name",
                        "Gender",
                        "Email",
                        "Address",
                        "Phone",
                        "Church",
                    ])}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;