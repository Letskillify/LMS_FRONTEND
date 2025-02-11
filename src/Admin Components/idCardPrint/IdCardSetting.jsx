import React, { useEffect, useState } from "react";
import Profile from "./profile1.jpg"
import { useImageUploader } from "../../Custom Hooks/CustomeHook"
import axios from "axios";

const IdCardSetting = () => {
    const { uploadedData, handleImageUpload } = useImageUploader();
    const [fields, setFields] = useState({
        vertical: true,
        name: true,
        rollNo: true,
        admissionNo: true,
        motherName: true,
        fatherName: true,
        class: true,
        dob: true,
        mobile: true,
        address: true,
        department: true,
        studentId: true,
        year: true,
        bloodGroup: true,
        emergencyContact: true,
        email: true,
        imageAlignment: "left",
        qrAlignment: "right",
        bgImage: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [bgImage, setbgImage] = useState("");

    const fetchSettings = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/student/id-card-settings");
            setFields(response.data);
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const toggleField = (field) => {
        setFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    useEffect(() => {
        if (uploadedData["bgImage"]) {
            setFields((prev) => ({ ...prev, bgImage: uploadedData["bgImage"] }));
        }
    }, [uploadedData]);

    const handleImageUploadWrapper = async (event) => {
        await handleImageUpload(event, "bgImage");
        setFields((prev) => ({ ...prev, bgImage: uploadedData["bgImage"] }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                "http://localhost:5500/api/student/id-card-settings",
                fields
            );
            // console.log("Settings saved:", response.data);
            setMessage("Saved Setting")
        } catch (error) {
            // console.error("Error saving settings:", error);
            setMessage("Not Saved")
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">ID Card Settings</h4>

            {/* Requirements Form */}
            <div className="card p-3 mb-4">
                <h5>Select Fields to Display</h5>
                <div className="d-flex flex-wrap gap-3">
                    {Object.keys(fields).map(
                        (field) =>
                            field !== "imageAlignment" &&
                            field !== "qrAlignment" && (
                                <div key={field} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={fields[field]}
                                        onChange={() => toggleField(field)}
                                    />
                                    <label className="form-check-label">{field}</label>
                                </div>
                            )
                    )}
                </div>
                <div className="mt-3">
                    <label><b>Upload Background Image:</b></label>
                    <input type="file" accept="image/*" onChange={handleImageUploadWrapper} />
                </div>
                {!fields.vertical && (
                    <div className="mt-3">
                        <label>Select Image Alignment:</label>
                        <select
                            className="form-select"
                            value={fields.imageAlignment}
                            onChange={(e) =>
                                setFields({ ...fields, imageAlignment: e.target.value })
                            }
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                )}

                {!fields.vertical && (
                    <div className="mt-3">
                        <label>Select QR Code Alignment:</label>
                        <select
                            className="form-select"
                            value={fields.qrAlignment}
                            onChange={(e) =>
                                setFields({ ...fields, qrAlignment: e.target.value })
                            }
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                )}
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save Settings"}
                    </button>
                    {message && <p className="mt-2 text-success">{message}</p>}
                </div>
            </div>

            {/* ID Cards */}
            <div className="d-flex justify-content-center gap-3 flex-wrap">
                <div
                    className="card"
                    style={{
                        width: fields.vertical ? "2.125in" : "3.375in",
                        height: fields.vertical ? "3.375in" : "2.125in",
                        borderRadius: "10px",
                        backgroundImage: fields.bgImage ? `url(${fields.bgImage})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "12px",
                    }}
                >
                    <h6 className="text-center fw-bold">
                        Saint Paul's Convent
                    </h6>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: fields.vertical ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {fields.vertical === true && (
                            <img
                                style={{ marginBottom: "20px", width: "80px", height: "80px", borderRadius: "10%" }}
                                alt="Photo"
                                src={Profile}
                            />
                        )}
                        {fields.imageAlignment === "left" && (
                            <img
                                style={{ marginBottom: "20px", width: "80px", height: "80px", borderRadius: "10%", marginRight: "20px" }}
                                alt="Photo"
                                src={Profile}

                            />
                        )}
                        <ul className="list-unstyled" style={{ fontSize: "10px", flex: 1 }}>
                            {fields.name && <li><b>Name:</b> John Doe</li>}
                            {fields.rollNo && <li><b>Roll No:</b> 12345</li>}
                            {fields.motherName && <li><b>Mother's Name:</b> Jane Doe</li>}
                            {fields.fatherName && <li><b>Father's Name:</b> Richard Doe</li>}
                            {fields.class && <li><b>Class:</b> 10th</li>}
                            {fields.dob && <li><b>Date of Birth:</b> 10/05/2004</li>}
                            {fields.mobile && <li><b>Mobile No:</b> +1234567890</li>}
                        </ul>
                        {fields.imageAlignment === "right" && !fields.vertical && (
                            <img
                                style={{ marginBottom: "20px", width: "80px", height: "80px", borderRadius: "10%" }}
                                alt="Photo"
                                src={Profile}
                            />
                        )}
                    </div>
                    <div className="row mt-2" style={{ fontSize: "10px" }}>
                        <div className="col-12 text-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <b>Class Teacher</b>
                                <b>Principal</b>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className="card"
                    style={{
                        width: fields.vertical ? "2.125in" : "3.375in",
                        height: fields.vertical ? "3.375in" : "2.125in",
                        borderRadius: "10px",
                        padding: "12px",
                        fontFamily: "Arial, sans-serif",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        fontSize: "10px",
                        backgroundImage: fields.bgImage ? `url(${fields.bgImage})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: fields.vertical ? "column" : "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {fields.qrAlignment === "left" && (
                            <div
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    backgroundColor: "#ddd",
                                    borderRadius: "4px",
                                    margin: "10px",
                                }}
                            ></div>
                        )}

                        <ul className="list-unstyled" style={{ fontSize: "10px", flex: 1 }}>
                            {fields.department && <li><b>Department:</b> Computer Science</li>}
                            {fields.studentId && <li><b>Student ID:</b> CS2024001</li>}
                            {fields.year && <li><b>Year:</b> 2024-25</li>}
                            {fields.bloodGroup && <li><b>Blood Group:</b> O+</li>}
                            {fields.emergencyContact && <li><b>Emergency Contact:</b> +91 9876543210</li>}
                            {fields.address && <li><b>Address:</b> 123 Main Street, City, Country</li>}

                            {fields.email && <li><b>Email:</b> student@example.com</li>}
                        </ul>

                        {fields.qrAlignment === "right" && (
                            <div
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#ddd",
                                    borderRadius: "4px",
                                    margin: "10px",
                                }}
                            ></div>
                        )}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "10px", fontSize: "10px" }}>
                        <p><strong>Issued by:</strong> University Name</p>
                        <p><strong>Valid Until:</strong> 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdCardSetting;
