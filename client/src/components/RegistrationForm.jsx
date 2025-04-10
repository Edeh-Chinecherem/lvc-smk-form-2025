import React, { useState } from "react";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        email: "",
        address: "",
        phone: "",
        category: "",
        school: "",
        church: "",
        age: "",
        class: "",
        group: "",
        medicalConditions: "no",
        medicalDetails: "",
        community: "",
    });

    const [showMedicalDetails, setShowMedicalDetails] = useState(false);

    const communities = [
        "Faith", "Hope", "Love", "Joy", "Peace", "Patience", "Kindness", "Goodness", "Gentleness", "Self-Control",
        "Righteousness", "Grace", "Mercy", "Purity", "Holiness", "Humility", "Integrity", "Courage", "Obedience",
        "Generosity", "Forgiveness", "Wisdom", "Compassion", "Perseverance", "Zeal"
    ];

    const communityAssignments = {}; // Tracks the number of campers in each community

    const assignCommunity = (classGroup) => {
        // Filter communities with less than 30 members
        const eligibleCommunities = communities.filter(
            (community) =>
                !communityAssignments[community] ||
                communityAssignments[community] < 30
        );

        if (eligibleCommunities.length === 0) {
            alert("All communities are full!");
            return null;
        }

        // Randomly select a community
        const randomCommunity =
            eligibleCommunities[Math.floor(Math.random() * eligibleCommunities.length)];

        // Ensure class group limits (15 for JSS1–JSS3, 15 for SS1–SS3)
        const classGroupKey = `${randomCommunity}-${classGroup}`;
        if (!communityAssignments[classGroupKey]) {
            communityAssignments[classGroupKey] = 0;
        }

        if (communityAssignments[classGroupKey] < 15) {
            communityAssignments[classGroupKey]++;
            if (!communityAssignments[randomCommunity]) {
                communityAssignments[randomCommunity] = 0;
            }
            communityAssignments[randomCommunity]++;
            return randomCommunity;
        } else {
            return assignCommunity(classGroup); // Retry if the class group limit is reached
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "medicalConditions") {
            setShowMedicalDetails(value === "yes");
        }

        if (name === "category") {
            const isCamper = value === "camper";
            setFormData({
                ...formData,
                school: isCamper ? formData.school : "",
                age: isCamper ? formData.age : "",
                class: isCamper ? formData.class : "",
                [name]: value,
            });
        }

        if (name === "class" && formData.category === "camper") {
            const classGroup =
                value === "jss1" || value === "jss2" || value === "jss3"
                    ? "junior"
                    : "senior";

            const assignedCommunity = assignCommunity(classGroup);

            if (assignedCommunity) {
                setFormData((prevData) => ({
                    ...prevData,
                    community: assignedCommunity,
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.category === "camper") {
            const classGroup =
                formData.class === "jss1" ||
                formData.class === "jss2" ||
                formData.class === "jss3"
                    ? "junior"
                    : "senior";

            const assignedCommunity = assignCommunity(classGroup);

            if (!assignedCommunity) {
                alert("Unable to assign a community. Please try again.");
                return;
            }

            formData.community = assignedCommunity;
        }

        try {
            // Send form data to the backend
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful!");
                setFormData({
                    name: "",
                    gender: "",
                    email: "",
                    address: "",
                    phone: "",
                    category: "",
                    school: "",
                    church: "",
                    age: "",
                    class: "",
                    group: "",
                    medicalConditions: "no",
                    medicalDetails: "",
                    community: "",
                });
                setShowMedicalDetails(false);
            } else {
                alert("Failed to register. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to register. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <img src="/sulogo.jpg" alt="LVC SMK Zone Logo" className="form-logo" />
            <h1 className="form-title">LVC 2025 SMK Zone</h1>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Gender */}
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                {/* Email */}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {/* Address */}
                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                ></textarea>

                {/* Phone Number */}
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                {/* Category */}
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="pilgrim">Pilgrim</option>
                    <option value="sucf">SUCF</option>
                    <option value="camper">Camper</option>
                </select>

                {/* Name of School */}
                <label htmlFor="school">Name of School:</label>
                <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    disabled={formData.category !== "camper"}
                    required={formData.category === "camper"}
                />

                {/* Name of Church */}
                <label htmlFor="church">Name of Church:</label>
                <input
                    type="text"
                    id="church"
                    name="church"
                    value={formData.church}
                    onChange={handleChange}
                    required
                />

                {/* Age */}
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={formData.category !== "camper"}
                    required={formData.category === "camper"}
                />

                {/* Class */}
                <label htmlFor="class">Class:</label>
                <select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    disabled={formData.category !== "camper"}
                    required={formData.category === "camper"}
                >
                    <option value="">Select</option>
                    <option value="jss1">JSS1</option>
                    <option value="jss2">JSS2</option>
                    <option value="jss3">JSS3</option>
                    <option value="ss1">SS1</option>
                    <option value="ss2">SS2</option>
                    <option value="ss3">SS3</option>
                    <option value="school-leaver">School Leaver</option>
                </select>

                {/* Medical Conditions */}
                <label htmlFor="medical-conditions">Do you have medical conditions?</label>
                <select
                    id="medical-conditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    required
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>

                {/* Medical Details */}
                {showMedicalDetails && (
                    <div id="medical-details-container">
                        <label htmlFor="medical-details">If yes, please specify:</label>
                        <textarea
                            id="medical-details"
                            name="medicalDetails"
                            rows="3"
                            value={formData.medicalDetails}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                )}

                {/* Assigned Community */}
                <label htmlFor="community">Assigned Community:</label>
                <input
                    type="text"
                    id="community"
                    name="community"
                    value={formData.community}
                    readOnly
                />

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegistrationForm;