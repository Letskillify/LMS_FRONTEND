import React, { useContext, useState, useEffect } from "react";
import Profile from "../../assets/img/avatars/Profile.webp";
import { MainContext } from "../../Controller/MainProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toJpeg } from "html-to-image";
import { DeleteApi } from "../../Custom Hooks/CustomeHook";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import StudentInformationTable from "./components/StudentInformationTable";

const styles = `
  .modal-body .card {
    transition: transform 0.2s;
  }
  
  .modal-body .card:hover {
    transform: translateY(-2px);
  }
  
  .list-unstyled li {
    transition: background-color 0.2s;
    padding: 8px;
    border-radius: 4px;
  }
  
  .list-unstyled li:hover {
    background-color: rgba(0,0,0,0.02);
  }
  
  .badge {
    font-size: 0.9em;
    font-weight: 500;
  }
`;

const Studentsinformation = () => {
  const { StudentData: studentData, Class, Section } = getCommonCredentials();

  const Navigate = useNavigate();
  const [mainCampus, setMainCampus] = React.useState("");
  const [className, setClassName] = React.useState("");
  const [section, setSection] = React.useState("");
  const [type, setType] = React.useState("");
  const [filtereData, setFiltereData] = useState();
  const [popupData, setPopupData] = useState(false);
  const [popupImg, setPopupImg] = useState();

  const openPopup = (document) => {
    setPopupData(true);
    setPopupImg(document);
    console.log(popupData);
  };

  const closePopup = () => {
    setPopupData(false);
  };

  const formatAddress = (address) => {
    if (!address) return '-';
    if (typeof address === 'string') return address;
    
    const {
      houseNo = '',
      streetName = '',
      city = '',
      pincode = '',
      state = '',
      country = ''
    } = address;

    return [
      houseNo,
      streetName,
      city,
      state,
      country,
      pincode
    ].filter(Boolean).join(', ') || '-';
  };

  const filterFunction = () => {
    const filteredData = studentData.filter((student) => {
      const campusMatch = mainCampus === "" || student.campus === mainCampus;
      const classNameMatch =
        className === "" || student.className === className;
      const sectionMatch = section === "" || student.section === section;
      const typeMatch = type === "" || student.type === type;
      return campusMatch && classNameMatch && sectionMatch && typeMatch;
    });
    setFiltereData(filteredData);
  };

  /** Filters studentsData array based on search query */
  const handleSearch = (query) => {
    // Implement search logic here
    const filteredData = studentData.filter((item) => {
      const nameMatch = item.personalDetails?.firstName
        ?.toLowerCase()
        .includes(query.toLowerCase());
      const parentNameMatch = item.parentDetails?.Father?.name
        ?.toLowerCase()
        .includes(query.toLowerCase());
      const numberMatch =
        item.parentDetails?.Father?.contactNumber?.includes(query);
      return nameMatch || parentNameMatch || numberMatch;
    });
    setFiltereData(filteredData);
  };

  // edit Data of Student

  const [editedData, setEditedData] = useState({});
  const handleEdit = (studentId, student) => {
    Navigate("/editstudents", { 
      state: { 
        studentId, 
        student, 
        path: window.location.pathname 
      } 
    });
  };

  const handleDeleteAll = async () => {
    await DeleteApi(
      "/api/student/add-all-trash",
      "All students Deleted successfully"
    );
  };
  const handleDeleteone = async (id) => {
    await DeleteApi(
      `/api/student/add-trash/${id}`,
      "Student Deleted successfully"
    );
  };
  const handleDownload = async (profilePhotoUrl) => {
    if (!profilePhotoUrl) {
      alert("No profile photo available to download");
      return;
    }

    try {
      const response = await fetch(profilePhotoUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `profile-photo-${Date.now()}.${blob.type.split('/')[1]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading profile photo:', error);
      alert("Failed to download profile photo");
    }
  };

  const handleViewProfile = (student) => {
    if (student) {
      setPopupData(true);
      setPopupImg(student);
    }
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  console.log(popupImg);
  
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-fluid container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    Students Management /
                  </span>{" "}
                  Students Information
                </h4>
                <div className="card mb-4">
                  <h5 className="card-header">Fillter Information</h5>
                  <div className="card-body">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        filterFunction();
                      }}
                    >
                      <div className="row">
                        <div className="col">
                          <label className="form-label">Main Campus</label>
                          <select
                            onChange={(e) => setMainCampus(e.target.value)}
                            className="form-select"
                          >
                            <option value="">All</option>
                            <option value="Campus One">Campus One</option>
                            <option value="Campus Two">Campus Two</option>
                            <option value="Campus Three">Campus Three</option>
                            <option value="Campus Four">Campus Four</option>
                            <option value="Campus Five">Campus Five</option>
                            <option value="Campus Six">Campus Six</option>
                            <option value="Campus Seven">Campus Seven</option>
                            <option value="Campus Eight">Campus Eight</option>
                            <option value="Campus Nine">Campus Nine</option>
                            <option value="Campus Ten">Campus Ten</option>
                          </select>
                        </div>
                        <div className="col">
                          <label className="form-label">Class</label>
                          <select
                            onChange={(e) => setClassName(e.target.value)}
                            className="form-select"
                          >
                            <option value="">All</option>
                            {Class?.map((item, index) => (
                              <option key={index} value={item}>
                                {item?.className}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col">
                          <label className="form-label">Section</label>
                          <select
                            onChange={(e) => setSection(e.target.value)}
                            className="form-select"
                          >
                            <option value="">All</option>
                            {Section?.map((item, index) => (
                              <option key={index} value={item}>
                                {item?.sectionName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col">
                          <label className="form-label">Tpye</label>
                          <select
                            onChange={(e) => setType(e.target.value)}
                            className="form-select"
                          >
                            <option value="">All</option>
                            <option value="Regular">Regular</option>
                            <option value="Deactivate">Deactivate</option>
                            <option value="Passout">Passout</option>
                          </select>
                        </div>
                        <div className="col">
                          <label className="form-label">Filtter</label>
                          <button
                            type="submit"
                            className="btn btn-success w-100"
                          >
                            {" "}
                            Fillter Data
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="input-group input-group-merge">
                          <span className="input-group-text">
                            <i className="bx bx-search"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="btn-group">
                          <Link
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDeleteAll}
                          >
                            <i className="tf-icons bx bx-trash me-1"></i>
                            Delete All
                          </Link>
                          <Link type="button" className="btn btn-success">
                            <i className="tf-icons bx bxs-file me-1"></i>
                            Excel
                          </Link>
                          <Link type="button" className="btn btn-warning">
                            <i className="tf-icons bx bxs-file-doc me-1"></i>
                            CSV
                          </Link>
                          <Link type="button" className="btn btn-info">
                            <i className="tf-icons bx bxs-printer me-1"></i>
                            Print
                          </Link>
                          <Link
                            to={"/studenttrash"}
                            className="btn btn-warning"
                          >
                            <i className="tf-icons bx bxs-trash me-1"></i>
                            Trash
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h5 className="card-header">Students Information</h5>
                  <StudentInformationTable
                    StudentData={filtereData || studentData}
                    handleViewProfile={handleViewProfile}
                    handleEdit={handleEdit}
                    handleDeleteone={handleDeleteone}
                    handleDownload={handleDownload}
                  />
                </div>
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>

      {/* Enhanced responsive profile view modal */}
      {popupData && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header text-white">
                  <h5 className="modal-title ">Student Profile </h5>
                  <button type="button" className="btn-close " onClick={closePopup}></button>
                </div>
                <hr />
                <div className="modal-body p-4">
                  {/* Profile Header */}
                  <div className="row align-items-center mb-4">
                    <div className="col-lg-3 col-md-4 text-center mb-3 mb-md-0">
                      <div className="position-relative d-inline-block">
                        <img 
                          src={popupImg?.personalDetails?.profilePhoto || "/image/defaultImg.png"} 
                          alt="Profile" 
                          className="img-fluid rounded-circle border border-primary"
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                        />
                        <span className="position-absolute bottom-0 end-0 p-2 bg-primary rounded-circle">
                          <i className="bx bxs-user-circle text-white"></i>
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <h3 className="mb-1 text-dark mb-3">
                        {popupImg?.personalDetails?.firstName} {popupImg?.personalDetails?.lastName}
                      </h3>
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        <span className="badge bg-primary">Roll ID: {popupImg?.secondaryId}</span>
                        <span className="badge bg-info">Class: {popupImg?.enrollmentDetails?.class?.className || '-'}</span>
                        <span className="badge bg-success">Status: {popupImg?.enrollmentDetails?.admissionType || 'Regular'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Information Cards */}
                  <div className="row g-3">
                    {/* Personal Details Card */}
                    <div className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-light">
                          <h5 className="card-title mb-0">
                            <i className="bx bxs-user-detail me-2 text-primary"></i>
                            Personal Details
                          </h5>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                              <i className="bx bxs-calendar me-2 text-muted"></i>
                              <strong>Date of Birth:</strong> {popupImg?.personalDetails?.dateOfBirth ? 
                                new Date(popupImg.personalDetails.dateOfBirth).toLocaleDateString() : '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bx-male-female me-2 text-muted"></i>
                              <strong>Gender:</strong> {popupImg?.personalDetails?.gender || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bx-droplet me-2 text-muted"></i>
                              <strong>Blood Group:</strong> {popupImg?.personalDetails?.bloodGroup || '-'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Card */}
                    <div className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-light">
                          <h5 className="card-title mb-0">
                            <i className="bx bxs-contact me-2 text-primary"></i>
                            Contact Information
                          </h5>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                              <i className="bx bxs-envelope me-2 text-muted"></i>
                              <strong>Email:</strong> {popupImg?.contactInfo?.email || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-phone me-2 text-muted"></i>
                              <strong>Phone:</strong> {popupImg?.contactInfo?.phone || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-map me-2 text-muted"></i>
                              <strong>Address:</strong> {formatAddress(popupImg?.contactInfo?.address)}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Parent Details Card */}
                    <div className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-light">
                          <h5 className="card-title mb-0">
                            <i className="bx bxs-family me-2 text-primary"></i>
                            Parent Details
                          </h5>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                              <i className="bx bx-male me-2 text-muted"></i>
                              <strong>Father's Name:</strong> {popupImg?.parentDetails?.Father?.name || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-phone me-2 text-muted"></i>
                              <strong>Father's Contact:</strong> {popupImg?.parentDetails?.Father?.contactNumber || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bx-female me-2 text-muted"></i>
                              <strong>Mother's Name:</strong> {popupImg?.parentDetails?.Mother?.name || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-phone me-2 text-muted"></i>
                              <strong>Mother's Contact:</strong> {popupImg?.parentDetails?.Mother?.contactNumber || '-'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Academic Details Card */}
                    <div className="col-md-6">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-light">
                          <h5 className="card-title mb-0">
                            <i className="bx bxs-graduation me-2 text-primary"></i>
                            Academic Details
                          </h5>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                              <i className="bx bxs-school me-2 text-muted"></i>
                              <strong>Class:</strong> {popupImg?.className || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-category me-2 text-muted"></i>
                              <strong>Section:</strong> {popupImg?.section || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-buildings me-2 text-muted"></i>
                              <strong>Campus:</strong> {popupImg?.campus || '-'}
                            </li>
                            <li className="mb-2">
                              <i className="bx bxs-user-badge me-2 text-muted"></i>
                              <strong>Status:</strong> {popupImg?.enrollmentDetails?.admissionType || 'Regular'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-danger" onClick={closePopup}>
                    <i className="bx bx-x me-1"></i>Close
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => handleEdit(popupImg._id, popupImg)}
                  >
                    <i className="bx bx-edit me-1"></i>Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Studentsinformation;
