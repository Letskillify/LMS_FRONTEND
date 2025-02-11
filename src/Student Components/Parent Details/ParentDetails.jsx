import React, { useContext, useEffect, useState } from 'react'
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';

const ParentDetails = () => {
    const [selectedParentDetails, setSelectedParentDetails] = useState()
    const [activeTab, setActiveTab] = useState("father");
    const { Student } = getCommonCredentials();
    console.log(Student);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (Student) {
            setSelectedParentDetails(Student);
        }
    }, [Student]);


    return (
        <>
            <div className="" id="modalCenter" tabIndex="-1" aria-hidden="true">
                <div className="m-3" role="document">
                    <div className="card">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCenterTitle">Parent Details</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card shadow-sm">
                                        <div className="card-body text-center">
                                            <img
                                                src={selectedParentDetails?.personalDetails?.profilePhoto}
                                                alt="Avatar"
                                                className="rounded-circle border border-light mb-2"
                                                style={{ height: "100px", width: "100px" }}
                                                onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                                            />
                                            <div>
                                                <h5 className='fw-bold border-bottom pb-2'>Connect Student</h5>
                                                <div className="text-start overflow-auto">
                                                    <p><strong>Name:</strong> {selectedParentDetails?.personalDetails?.firstName + " " + selectedParentDetails?.personalDetails?.lastName || "Not Provided"}</p>
                                                    <p><strong>Email:</strong> {selectedParentDetails?.contactInfo?.email || "Not Provided"}</p>
                                                    <p><strong>Phone:</strong> {selectedParentDetails?.contactInfo?.mobile || "Not Provided"}</p>
                                                    <p><strong>Gender:</strong> {selectedParentDetails?.contactInfo?.gender || "Not Provided"}</p>
                                                    <p><strong>Category:</strong> {selectedParentDetails?.contactInfo?.category || "Not Provided"}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 mt-3">
                                    {selectedParentDetails ? (
                                        <>
                                            <h3>Parent's/Guardian's Details</h3>
                                            <ul className="nav nav-tabs border p-1 rounded tab-content text-center" role="tablist">

                                                <li className="nav-item border">
                                                    <button
                                                        className={`nav-link ${activeTab === "father" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("father")}
                                                    >
                                                        Father
                                                    </button>
                                                </li>
                                                <li className="nav-item border">
                                                    <button
                                                        className={`nav-link ${activeTab === "mother" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("mother")}
                                                    >
                                                        Mother
                                                    </button>
                                                </li>
                                                <li className="nav-item border">
                                                    <button
                                                        className={`nav-link ${activeTab === "guardian" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("guardian")}
                                                    >
                                                        Guardian
                                                    </button>
                                                </li>

                                            </ul>

                                            {/* Tab Content */}
                                            <div className="tab-content">

                                                {activeTab === "father" && (
                                                    <div className="tab-pane fade show active">
                                                        <h3 className="border-bottom pb-2">Father's Details</h3>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p><strong>Name:</strong> {selectedParentDetails?.parentDetails?.Father?.name || "Not Provided"}</p>
                                                                <p><strong>Email:</strong> {selectedParentDetails?.parentDetails?.Father?.email || "Not Provided"}</p>
                                                                <p><strong>Contact Number:</strong> {selectedParentDetails?.parentDetails?.Father?.contactNumber || "Not Provided"}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><strong>Qualification:</strong> {selectedParentDetails?.parentDetails?.Father?.qualification || "Not Provided"}</p>
                                                                <p><strong>Occupation:</strong> {selectedParentDetails?.parentDetails?.Father?.occupation || "Not Provided"}</p>
                                                                <p><strong>Annual Income:</strong> {selectedParentDetails?.parentDetails?.Father?.annualIncome || "Not Provided"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p><strong>Official Address:</strong> {selectedParentDetails?.parentDetails?.Father?.officialAddress || "Not Provided"}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><strong>Residential Address:</strong> {selectedParentDetails?.parentDetails?.Father?.residentialAddress || "Not Provided"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === "mother" && (
                                                    <div className="tab-pane fade show active">
                                                        <h3 className="border-bottom pb-2">Mother's Details</h3>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p><strong>Name:</strong> {selectedParentDetails?.parentDetails?.Mother?.name || "Not Provided"}</p>
                                                                <p><strong>Email:</strong> {selectedParentDetails?.parentDetails?.Mother?.email || "Not Provided"}</p>
                                                                <p><strong>Contact Number:</strong> {selectedParentDetails?.parentDetails?.Mother?.contactNumber || "Not Provided"}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><strong>Qualification:</strong> {selectedParentDetails?.parentDetails?.Mother?.qualification || "Not Provided"}</p>
                                                                <p><strong>Occupation:</strong> {selectedParentDetails?.parentDetails?.Mother?.occupation || "Not Provided"}</p>
                                                                <p><strong>Annual Income:</strong> {selectedParentDetails?.parentDetails?.Mother?.annualIncome || "Not Provided"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p><strong>Official Address:</strong> {selectedParentDetails?.parentDetails?.Mother?.officialAddress || "Not Provided"}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><strong>Residential Address:</strong> {selectedParentDetails?.parentDetails?.Mother?.residentialAddress || "Not Provided"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === "guardian" && (
                                                    <div className="tab-pane fade show active">
                                                        <h3 className="border-bottom pb-2">Guardian's Details</h3>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p><strong>Name:</strong> {selectedParentDetails?.parentDetails?.Guardian?.name || "Not Provided"}</p>
                                                                <p><strong>Email:</strong> {selectedParentDetails?.parentDetails?.Guardian?.email || "Not Provided"}</p>
                                                                <p><strong>Contact Number:</strong> {selectedParentDetails?.parentDetails?.Guardian?.contactNumber || "Not Provided"}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><strong>Qualification:</strong> {selectedParentDetails?.parentDetails?.Guardian?.qualification || "Not Provided"}</p>
                                                                <p><strong>Occupation:</strong> {selectedParentDetails?.parentDetails?.Guardian?.occupation || "Not Provided"}</p>
                                                                <p><strong>Annual Income:</strong> {selectedParentDetails?.parentDetails?.Guardian?.annualIncome || "Not Provided"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p><strong>Official Address:</strong> {selectedParentDetails?.parentDetails?.Guardian?.officialAddress || "Not Provided"}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p><strong>Residential Address:</strong> {selectedParentDetails?.parentDetails?.Guardian?.residentialAddress || "Not Provided"}</p>
                                                                <p><strong>Relation:</strong> {selectedParentDetails?.parentDetails?.Guardian?.relation || "Not Provided"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <p>No Details Available</p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ParentDetails
