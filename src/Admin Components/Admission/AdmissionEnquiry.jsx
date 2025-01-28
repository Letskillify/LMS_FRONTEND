import React, { useState, useEffect } from "react";
import axios from "axios";

function AdmissionEnquiry() {
    const [enquiries, setEnquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewEnquiry, setViewEnquiry] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [rejectingEnquiry, setRejectingEnquiry] = useState(null);

    const fetchAdmission = async () => {
        try {
            const response = await axios.get('http://localhost:5500/api/admission-enquiry/get');
            setEnquiries(response.data);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        }
    };

    const handleAccept = async (enquiry) => {
        try {
            await axios.post('http://localhost:5500/api/admission-enquiry/accept', { id: enquiry._id });
            await sendSms(enquiry.phoneNo, `Dear ${enquiry.name}, your admission has been accepted!`);
            alert(`Accepted and SMS sent to ${enquiry.name}`);
        } catch (error) {
            console.error("Error accepting enquiry:", error);
        }
    };

    const handleReject = async () => {
        if (!rejectReason) {
            alert("Please provide a reason for rejection.");
            return;
        }

        try {
            await axios.post('http://localhost:5500/api/admission-enquiry/reject', {
                id: rejectingEnquiry._id,
                reason: rejectReason,
            });
            await sendSms(rejectingEnquiry.phoneNo, `Dear ${rejectingEnquiry.name}, your admission has been rejected. Reason: ${rejectReason}`);
            alert(`Rejected and SMS sent to ${rejectingEnquiry.name}`);
            setRejectingEnquiry(null);
            setRejectReason("");
        } catch (error) {
            console.error("Error rejecting enquiry:", error);
        }
    };

    const sendSms = async (phoneNumber, message) => {
        try {
            await axios.post('http://localhost:5500/api/send-sms', {
                phoneNumber,
                message,
            });
        } catch (error) {
            console.error("Error sending SMS:", error);
        }
    };
    const handleDeleteEnquiry = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/admission-enquiry/delete/${id}`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                setEnquiries((prevEnquiries) => prevEnquiries.filter((item) => item._id !== id));
            } else {
                console.error("Failed to delete enquiry:", response.data);
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
        }
    };

    useEffect(() => {
        fetchAdmission();
    }, []);

    const filteredEnquiries = enquiries.filter((enquiry) => {
        const term = searchTerm.toLowerCase();
        return (
            enquiry.name.toLowerCase().includes(term) ||
            enquiry.phoneNo.toLowerCase().includes(term) ||
            enquiry.email.toLowerCase().includes(term) ||
            enquiry.appliedFor.toLowerCase().includes(term) ||
            enquiry.passoutYear.toLowerCase().includes(term) ||
            enquiry.city.toLowerCase().includes(term) ||
            enquiry.state.toLowerCase().includes(term) ||
            enquiry.gender.toLowerCase().includes(term)
        );
    });

    return (
        <div>
            <div className="page-wrapper container mt-2">
                <div className="content">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <a href="index.html">Dashboard</a>
                                </li>
                                <li className="breadcrumb-item Present" aria-current="page">
                                    Admission
                                </li>
                                <li className="breadcrumb-item Present" aria-current="page">
                                    All Enquiries
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="d-flex justify-content-end my-3 mx-3">
                        <div className="input-group w-50">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Phone No</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="text-center">
                                        <td>{enquiry.name}</td>
                                        <td>{enquiry.phoneNo}</td>
                                        <td>{enquiry.email}</td>
                                        <td>{enquiry.gender}</td>
                                        <td>{enquiry.status}</td>
                                        <td className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setViewEnquiry(enquiry)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm mx-2"
                                                onClick={() => handleDeleteEnquiry(enquiry._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredEnquiries.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center">No results found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {viewEnquiry && (
                        <div className="modal show d-block" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">View Enquiry</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setViewEnquiry(null)}
                                        ></button>
                                    </div>
                                    <div className="modal-body" >
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{viewEnquiry.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone No</th>
                                                    <td>{viewEnquiry.phoneNo}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{viewEnquiry.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>Gender</th>
                                                    <td>{viewEnquiry.gender}</td>
                                                </tr>
                                                <tr>
                                                    <th>Applied For</th>
                                                    <td>{viewEnquiry.appliedFor}</td>
                                                </tr>
                                                <tr>
                                                    <th>City</th>
                                                    <td>{viewEnquiry.city}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th>
                                                    <td>{viewEnquiry.status}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {viewEnquiry && (
                        <div className="modal show d-block" >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">View Member</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setViewEnquiry(null)}
                                        ></button>
                                    </div>
                                    <div className="modal-body" >
                                        <p><strong>Name:</strong> {viewEnquiry.name}</p>
                                        <p><strong>Phone No:</strong> {viewEnquiry.phoneNo}</p>
                                        <p><strong>Email:</strong> {viewEnquiry.email}</p>
                                        <p><strong>Gender:</strong> {viewEnquiry.gender}</p>
                                        <p><strong>Applied For:</strong> {viewEnquiry.appliedFor}</p>
                                        <p><strong>Passout Year:</strong> {viewEnquiry.passoutYear}</p>
                                        <p><strong>City:</strong> {viewEnquiry.city}</p>
                                        <p><strong>State:</strong> {viewEnquiry.state}</p>
                                        <p><strong>Status:</strong> {viewEnquiry.status}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleAccept(viewEnquiry)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => setRejectingEnquiry(viewEnquiry)}
                                        >
                                            Reject
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setViewEnquiry(null)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {rejectingEnquiry && (
                        <div className="modal show d-block">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Reject Admission</h5>
                                        <button
                                            className="btn-close"
                                            onClick={() => setRejectingEnquiry(null)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>
                                            <strong>Name:</strong> {rejectingEnquiry.name}
                                        </p>
                                        <textarea
                                            className="form-control"
                                            placeholder="Enter reason for rejection..."
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setRejectingEnquiry(null)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={handleReject}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdmissionEnquiry;
