import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../Controller/MainProvider';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const InstituteProfile = () => {
    const {institute } = useContext(MainContext);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate(); // Hook for navigation


    useEffect(() => {
        if (institute) {
            setLoading(false);
        }
    }, [institute]);

    
    const handleEdit = () => {
        Navigate("/editinstituteprofile", { state: { institute } });
    };

    return (
        <>
            {loading ? (
                <h1 className="text-center mt-5">Loading...</h1>
            ) : (
                <div className="container mt-4">
                    <div className="main-body">
                        {/* First Row - Profile Card and Institute Information */}
                        <div className="row gutters-sm">
                            <div className="col-12 col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <img
                                            src={institute?.logo}
                                            alt="Institute Logo"
                                            className="rounded-circle mb-3"
                                            width={150}
                                            onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                                        />
                                        <h4>{institute?.name}</h4>
                                        <p className="text-secondary mb-1">{institute?.instituteType}</p>
                                        <p className="text-muted font-size-sm">{institute?.address?.city}, {institute?.address?.state}</p>
                                        <button className="btn btn-primary me-2">Follow</button>
                                        <button className="btn btn-outline-primary ms-2">Message</button>
                                    </div>
                                </div>
                            </div>

                            {/* Institute Information */}
                            <div className="col-12 col-md-8 mb-3">
                                <div className="card" style={{ height: "370px" }}>
                                    <div className="card-body">
                                        <h5>Institute Information</h5>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Status</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{institute?.status}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Established Year</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{institute?.establishedYear}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Number of Courses</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">{institute?.NoOfCoursesOffered}</div>
                                        </div>

                                        {/* Address Information */}
                                        <h5 className="mt-4">Address Information</h5>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {institute?.address?.line1}, {institute?.address?.line2}, {institute?.address?.city}, {institute?.address?.state}, {institute?.address?.country} - {institute?.address?.postalCode}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Map Location</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <a href={institute?.address?.MapLocationUrl} target="_blank" rel="noopener noreferrer">
                                                    View on Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="row gutters-sm">
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Contact Information</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.contact?.email || 'N/A'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Phone</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.contact?.mobile || 'N/A'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Whatsapp</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.contact?.whatsapp || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Authorized Person Details */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Authorized Person</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Name</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.AuthorizedPerson?.name || 'N/A'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Designation</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.AuthorizedPerson?.designation || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Facilities */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Facilities</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Library</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.libraryFacilities ? 'Available' : 'Not Available'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Cafeteria</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.cafeteriaFacilities ? 'Available' : 'Not Available'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Hostel</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.hostelFacilities ? 'Available' : 'Not Available'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Accreditation */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Accreditation</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Accreditation</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.accreditation || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Institute Type */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Institute Type</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Type</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.instituteType || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Affiliation Details */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Affiliation</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Affiliation No.</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.affiliationNO || 'N/A'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Affiliation Year</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.affiliationYear || 'N/A'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Affiliation Name</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.affiliationName || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Bank Details */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Bank Details</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Account Holder Name</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.bankDetails?.accountHolderName || 'N/A'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">Bank Name</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.bankDetails?.bankName || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="col-12 col-md-6 mb-3">
                                <div className="card" style={{ height: "280px" }}>
                                    <div className="card-body">
                                        <h5>Documents</h5>
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">ISO Certificate</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.document?.ISOcertificate ? 'Uploaded' : 'Not Uploaded'}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3"><h6 className="mb-0">GST Certificate</h6></div>
                                            <div className="col-sm-9 text-secondary">{institute?.document?.GSTcertificate ? 'Uploaded' : 'Not Uploaded'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Edit Button at the Start */}
                        <div className="d-flex justify-content-end mt-3 mb-5 ms-3">
                            {institute && (
                                <button
                                    onClick={() => handleEdit(institute)}
                                    className="btn btn-success py-2 w-50  shadow-lg mb-4"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default InstituteProfile;
