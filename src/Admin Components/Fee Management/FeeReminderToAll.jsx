import React, { useState } from "react";

function FeeReminderToAll() {
    const [formData, setFormData] = useState({
        notificationType: "",
        recipient: "",
        message: "",
    });

    const [recentNotifications, setRecentNotifications] = useState([
        {
            date: "2023-08-01",
            type: "Fee Reminder",
            recipient: "All Students",
            message: "Please pay your fees for the current semester by August 15th.",
        },
    ]);

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

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0];
        const currentTime = currentDate.toLocaleTimeString();

        // Log data to the console
        console.log("Notification Data Submitted:");
        console.log("Date:", formattedDate);
        console.log("Time:", currentTime);
        console.log("Notification Type:", formData.notificationType);
        console.log("Recipient:", formData.recipient);
        console.log("Message:", formData.message);

        // Add notification to the recent notifications list
        setRecentNotifications((prevNotifications) => [
            ...prevNotifications,
            {
                date: formattedDate,
                type: formData.notificationType,
                recipient: formData.recipient,
                message: formData.message,
            },
        ]);

        // Clear the form
        setFormData({
            notificationType: "",
            recipient: "",
            message: "",
        });
    };

    return (
        <div className="tracker-container">
            <h3 className="text-center m-2 rounded fw-bold border p-3">Fees Reminder To All</h3>

            <form onSubmit={handleSubmit}>
                <div className="border p-3 rounded row m-2">
                    <div className="mb-4 col-6">
                        <label style={{ display: "block", marginBottom: "5px" }}>Notification Type</label>
                        <select
                            name="notificationType"
                            value={formData.notificationType}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        >
                            <option value="">Select notification type</option>
                            <option value="Fee Reminder">Fee Reminder</option>
                            <option value="Payment Receipt">Payment Receipt</option>
                            <option value="General Announcement">General Announcement</option>
                        </select>
                    </div>

                    <div className="mb-4 col-6">
                        <label style={{ display: "block", marginBottom: "5px" }}>Recipient</label>
                        <select
                            name="recipient"
                            value={formData.recipient}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        >
                            <option value="">Select recipient</option>
                            <option value="All Students">All Students</option>
                            <option value="Specific Class">Specific Class</option>
                            <option value="Individual Student">Individual Student</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter your message here"
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                height: "80px",
                            }}
                        ></textarea>
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
                        Send Notification
                    </button>
                </div>
            </form>

            <div>
                <h3 className="text-center m-2 rounded fw-bold border p-3">Recent Reminders</h3>
                <table className="pending-fees-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Recipient</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentNotifications.map((notification, index) => (
                            <tr key={index}>
                                <td>{notification.date}</td>
                                <td>{notification.type}</td>
                                <td>{notification.recipient}</td>
                                <td>{notification.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FeeReminderToAll;
