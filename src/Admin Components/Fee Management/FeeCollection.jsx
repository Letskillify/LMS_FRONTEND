import React, { useState } from "react";

function FeeCollection() {
    const [viewById, setViewById] = useState(true);
    const [formData, setFormData] = useState({
        studentId: "",
        class: "",
        rollNumber: "",
        paymentMode: "Cash",
        amount: "",
        discount: "",
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        console.log("Form Data Submitted:", formData);
        console.log("Submission Date & Time:", currentDate.toLocaleString());
    };

    return (
        <div className="container" >
            <div className="card mt-5 p-4">
                <h3 className="text-center mt-2 mb-0">Fee Submission Form</h3>
                <hr />
                <div className="button-group" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <button
                        onClick={() => setViewById(true)}
                        style={{
                            padding: "10px 20px",
                            border: "1px solid #ddd",
                            backgroundColor: viewById ? "#f0f0f0" : "#fff",
                            color: "#000",
                            cursor: "pointer",
                            borderRadius: "4px",
                            marginRight: "10px",
                            fontWeight: viewById ? "bold" : "normal",
                        }}
                    >
                        By ID
                    </button>
                    <button
                        onClick={() => setViewById(false)}
                        style={{
                            padding: "10px 20px",
                            border: "1px solid #ddd",
                            backgroundColor: !viewById ? "#f0f0f0" : "#fff",
                            color: "#000",
                            cursor: "pointer",
                            borderRadius: "4px",
                            fontWeight: !viewById ? "bold" : "normal",
                        }}
                    >
                        By Class & Roll Number
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {viewById ? (
                        <div className="form-group">
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Student ID</label>
                            <input
                                type="text"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                placeholder="Enter student ID"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    marginBottom: "15px",
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                            <div style={{ width: "48%" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Class</label>
                                <input
                                    type="text"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleInputChange}
                                    placeholder="Enter class"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                            <div style={{ width: "48%" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Roll Number</label>
                                <input
                                    type="text"
                                    name="rollNumber"
                                    value={formData.rollNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter roll number"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Payment Mode</label>
                        <select
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "15px",
                            }}
                        >
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                            <option value="UPI">UPI</option>
                            <option value="Cheque">Cheque</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Amount</label>
                        <input
                            type="text"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "15px",
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Discount (if applicable)</label>
                        <input
                            type="text"
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            placeholder="Enter discount amount"
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginBottom: "15px",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FeeCollection;
