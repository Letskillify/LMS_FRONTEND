import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDeleteAdmissionEnquiryMutation, useGetAdmissionEnquiriesByInstituteIdQuery, useUpdateAdmissionEnquiryMutation } from "../../Redux/Api/admissionEnquiry";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import EnquiryTable from "./components/AdmissionEnquiryTable";

function AdmissionEnquiry() {
    const showToast = useGlobalToast();
    const {InstituteId} = getCommonCredentials();
    const [enquiries, setEnquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewEnquiry, setViewEnquiry] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [rejectingEnquiry, setRejectingEnquiry] = useState(null);


    const {data} = useGetAdmissionEnquiriesByInstituteIdQuery(InstituteId, {
        skip: !InstituteId,
    })

    const [updateEnquiry] = useUpdateAdmissionEnquiryMutation();
    const [deleteAdmissionEnquiry] = useDeleteAdmissionEnquiryMutation();

    useEffect(() => {
        if (data) {
            setEnquiries(data?.items);
        }
    }, [data]);

    const handleAccept = async (enquiry) => {
        try {
            const response = await updateEnquiry({ id: enquiry._id, enquiryData: { ...enquiry, status: "approved" } });

            if (response.data.status === 200) {
                showToast("Enquiry accepted successfully", "success");
            }
        } catch (error) {
            console.error("Error accepting enquiry:", error);
        }
    };

    const handleReject = async () => {
        if (!rejectReason) {
            showToast("Please enter a reason for rejection", "error");
            return;
        }

        try {
            const response = await updateEnquiry({ id: rejectingEnquiry._id, enquiryData: { ...rejectingEnquiry, status: "rejected", rejectReason } });

            if (response.data.status === 200) {
                showToast("Enquiry rejected successfully", "success");
            }
        } catch (error) {
            console.error("Error rejecting enquiry:", error);
        }
    };

    const handleDeleteEnquiry = async (id) => {
        try {
            const response = await deleteAdmissionEnquiry(id);

            if (response?.data?.status === 200) {
                showToast("Enquiry deleted successfully", "success");
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
        }
    };

    const filteredEnquiries = enquiries?.filter((enquiry) => {
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
                    <div className="card m-4">
                        <EnquiryTable
                            filteredEnquiries={filteredEnquiries}
                            setViewEnquiry={setViewEnquiry}
                            handleDeleteEnquiry={handleDeleteEnquiry}
                        />
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
