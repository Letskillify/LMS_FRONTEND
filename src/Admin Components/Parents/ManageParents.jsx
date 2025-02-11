import React, { useContext, useRef, useState } from "react";
import Profile from "../../assets/img/avatars/Profile.webp";
import { MainContext } from "../../Controller/MainProvider";
import { Link, useNavigate } from "react-router-dom";
import { DeleteApi } from "../../Custom Hooks/CustomeHook";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
const ManageParents = () => {
  const {
    fetchStudentData,
    fetchTrashData,
    handlePrint,
    printPDF,
    exportToExcel,
    handleExportCSV,
  } = useContext(MainContext); // -->> real time karna hai 
  const { StudentData } = getCommonCredentials();
  const [selectedParentDetails, setSelectedParentDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("father");
  const [ParentDataShow, setParentDataShow] = useState(10);
  const Navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredData = StudentData.filter((student) => {
    const studentName = student?.name?.toLowerCase();
    const parentEmail =
      student?.parentDetails?.Father?.email?.toLowerCase() ||
      student?.parentDetails?.Mother?.email?.toLowerCase();
    const parentName =
      student?.parentDetails?.Father?.name?.toLowerCase() ||
      student?.parentDetails?.Mother?.name?.toLowerCase();
    const searchLower = search?.toLowerCase();
    return (
      studentName?.includes(searchLower) ||
      parentName?.includes(searchLower) ||
      parentEmail?.includes(searchLower)
    );
  });

  const [editedData, setEditedData] = useState({});
  const handleEdit = (studentId, Parents) => {
    setEditedData({
      ...editedData,
      [studentId]: {
        ...Parents,
      },
    });
    Navigate("/editparents", { state: { studentId, Parents } });
  };

  const modalRef = useRef();
  const handleDeleteone = async (id) => {
    await DeleteApi(
      `/api/student/add-trash/${id}`,
      "Student Deleted successfully"
    );
    fetchStudentData();
    fetchTrashData();
    modalRef.current.style.display = "none";
  };
  const handleViewMore = (parentDetails) => {
    setSelectedParentDetails(parentDetails);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Delete ALL Data function
  const handleDeleteAll = async () => {
    await DeleteApi(
      "/api/student/add-all-trash",
      "All students Deleted successfully"
    );
    fetchStudentData();
    fetchTrashData();
  };
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-fluid container-p-y">
              <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Parents Account /</span>{" "}
                Manage Parents Account{" "}
              </h4>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-1">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? StudentData.length
                              : Number(e.target.value); // Handle "All" option
                          setParentDataShow(value);
                        }}
                      >
                        <option selected="" value={10}>
                          10
                        </option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={500}>500</option>
                        <option value={1000}>1000</option>
                        <option value="">All</option>
                      </select>
                    </div>
                    <div className="col">
                      <div className="input-group input-group-merge">
                        <span className="input-group-text">
                          <i className="bx bx-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Name or Email ......"
                          value={search}
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleDeleteAll}
                        >
                          <i className="tf-icons bx bx-trash me-1"></i>
                          Delete All
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={exportToExcel}
                        >
                          <i className="tf-icons bx bxs-file me-1"></i>
                          Excel
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={handleExportCSV}
                        >
                          <i className="tf-icons bx bxs-file-doc me-1"></i>
                          CSV
                        </button>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={handlePrint}
                        >
                          <i className="tf-icons bx bxs-printer me-1"></i>
                          Print
                        </button>
                        <Link to={"/studenttrash"} className="btn btn-warning">
                          <i className="tf-icons bx bxs-trash me-1"></i>
                          Trash
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {/* <th>ID Card Number</th> */}
                        <th>Qualification</th>
                        <th>Reset Passwords</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {StudentData ? (
                        <>
                          {(filteredData || StudentData)
                            ?.slice(0, ParentDataShow || [])
                            .map((student) => (
                              <>
                                <tr key={student._id}>
                                  <td>
                                    <span className="d-flex align-items-center fw-bold">
                                      {student?.parentDetails?.Father?.name
                                        ? student?.parentDetails?.Father?.name
                                        : "No Name"}
                                    </span>
                                  </td>
                                  <td>
                                    {student?.parentDetails?.Father?.email
                                      ? student?.parentDetails?.Father?.email
                                      : "No Email"}
                                  </td>
                                  <td>
                                    {student?.parentDetails?.Father
                                      ?.contactNumber
                                      ? student?.parentDetails?.Father
                                        ?.contactNumber
                                      : "No Phone"}
                                  </td>
                                  {/* <td>1367</td> */}
                                  <td>
                                    {student?.parentDetails?.Father
                                      ?.qualification
                                      ? student?.parentDetails?.Father
                                        ?.qualification
                                      : "No Qualification"}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-info"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalCenter"
                                      onClick={() => handleViewMore(student)}
                                    >
                                      View Detail
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-success btn-icon rounded-pill me-1"
                                      onClick={() =>
                                        handleEdit(student._id, student)
                                      }
                                    >
                                      <i className="bx bx-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger btn-icon rounded-pill"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteModal"
                                    >
                                      <i className="bx bx-trash"></i>
                                    </button>
                                    <div
                                      className="modal fade"
                                      id="deleteModal"
                                      tabIndex="-1"
                                      aria-hidden="true"
                                    >
                                      <div
                                        className="modal-dialog modal-dialog-centered modal-sm"
                                        role="document"
                                      >
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              <i className="bx bx-warning text-warning me-2"></i>
                                              Warning!
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <div className="modal-body text-center">
                                            <i
                                              className="bx bx-error-circle text-danger text-center mb-3"
                                              style={{ fontSize: "110px" }}
                                            ></i>
                                            <h6>
                                              Are you sure you want to delete
                                              this data?
                                            </h6>
                                            <p className="text-danger text-center">
                                              Also Delete Student Data with this
                                            </p>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={() =>
                                                handleDeleteone(student._id)
                                              }
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <div
                                  className="modal fade"
                                  id="modalCenter"
                                  tabIndex="-1"
                                  aria-hidden="true"
                                >
                                  <div
                                    className="modal-dialog modal-dialog-centered modal-xl"
                                    role="document"
                                  >
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="modalCenterTitle"
                                        >
                                          Parent Details
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="card shadow-sm">
                                              <div className="card-body text-center">
                                                <img
                                                  src={
                                                    selectedParentDetails
                                                      ?.personalDetails
                                                      ?.profilePhoto
                                                  }
                                                  alt="Avatar"
                                                  className="rounded-circle border border-light mb-2"
                                                  style={{
                                                    height: "100px",
                                                    width: "100px",
                                                  }}
                                                  onError={(e) => {
                                                    e.target.src =
                                                      "/image/defaultImg.png";
                                                  }}
                                                />
                                                <div>
                                                  <h5 className="fw-bold border-bottom pb-2">
                                                    Connect Student
                                                  </h5>
                                                  <div className="text-start overflow-auto">
                                                    <p>
                                                      <strong>Name:</strong>{" "}
                                                      {selectedParentDetails
                                                        ?.personalDetails
                                                        ?.firstName +
                                                        " " +
                                                        selectedParentDetails
                                                          ?.personalDetails
                                                          ?.lastName ||
                                                        "Not Provided"}
                                                    </p>
                                                    <p>
                                                      <strong>Email:</strong>{" "}
                                                      {selectedParentDetails
                                                        ?.contactInfo?.email ||
                                                        "Not Provided"}
                                                    </p>
                                                    <p>
                                                      <strong>Phone:</strong>{" "}
                                                      {selectedParentDetails
                                                        ?.contactInfo?.mobile ||
                                                        "Not Provided"}
                                                    </p>
                                                    <p>
                                                      <strong>Gender:</strong>{" "}
                                                      {selectedParentDetails
                                                        ?.contactInfo?.gender ||
                                                        "Not Provided"}
                                                    </p>
                                                    <p>
                                                      <strong>Category:</strong>{" "}
                                                      {selectedParentDetails
                                                        ?.contactInfo
                                                        ?.category ||
                                                        "Not Provided"}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-8 mt-3">
                                            {selectedParentDetails ? (
                                              <>
                                                <h3>
                                                  Parent's/Guardian's Details
                                                </h3>
                                                <ul
                                                  className="nav nav-tabs border p-1 rounded tab-content text-center"
                                                  role="tablist"
                                                >
                                                  <li className="nav-item border">
                                                    <button
                                                      className={`nav-link ${activeTab === "father"
                                                          ? "active"
                                                          : ""
                                                        }`}
                                                      onClick={() =>
                                                        handleTabClick("father")
                                                      }
                                                    >
                                                      Father
                                                    </button>
                                                  </li>
                                                  <li className="nav-item border">
                                                    <button
                                                      className={`nav-link ${activeTab === "mother"
                                                          ? "active"
                                                          : ""
                                                        }`}
                                                      onClick={() =>
                                                        handleTabClick("mother")
                                                      }
                                                    >
                                                      Mother
                                                    </button>
                                                  </li>
                                                  <li className="nav-item border">
                                                    <button
                                                      className={`nav-link ${activeTab === "guardian"
                                                          ? "active"
                                                          : ""
                                                        }`}
                                                      onClick={() =>
                                                        handleTabClick(
                                                          "guardian"
                                                        )
                                                      }
                                                    >
                                                      Guardian
                                                    </button>
                                                  </li>
                                                </ul>

                                                {/* Tab Content */}
                                                <div className="tab-content">
                                                  {activeTab === "father" && (
                                                    <div className="tab-pane fade show active">
                                                      <h3 className="border-bottom pb-2">
                                                        Father's Details
                                                      </h3>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Name:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father?.name ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Email:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father?.email ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Contact Number:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father
                                                              ?.contactNumber ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Qualification:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father
                                                              ?.qualification ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Occupation:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father
                                                              ?.occupation ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Annual Income:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father
                                                              ?.annualIncome ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Official Address:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father
                                                              ?.officialAddress ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Residential
                                                              Address:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Father
                                                              ?.residentialAddress ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}

                                                  {activeTab === "mother" && (
                                                    <div className="tab-pane fade show active">
                                                      <h3 className="border-bottom pb-2">
                                                        Mother's Details
                                                      </h3>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Name:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother?.name ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Email:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother?.email ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Contact Number:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother
                                                              ?.contactNumber ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Qualification:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother
                                                              ?.qualification ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Occupation:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother
                                                              ?.occupation ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Annual Income:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother
                                                              ?.annualIncome ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Official Address:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother
                                                              ?.officialAddress ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Residential
                                                              Address:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Mother
                                                              ?.residentialAddress ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}

                                                  {activeTab === "guardian" && (
                                                    <div className="tab-pane fade show active">
                                                      <h3 className="border-bottom pb-2">
                                                        Guardian's Details
                                                      </h3>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Name:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.name ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Email:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.email ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Contact Number:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.contactNumber ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Qualification:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.qualification ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Occupation:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.occupation ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Annual Income:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.annualIncome ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Official Address:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.officialAddress ||
                                                              "Not Provided"}
                                                          </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <p>
                                                            <strong>
                                                              Residential
                                                              Address:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.residentialAddress ||
                                                              "Not Provided"}
                                                          </p>
                                                          <p>
                                                            <strong>
                                                              Relation:
                                                            </strong>{" "}
                                                            {selectedParentDetails
                                                              ?.parentDetails
                                                              ?.Guardian
                                                              ?.relation ||
                                                              "Not Provided"}
                                                          </p>
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

                                <div
                                  className="modal fade"
                                  id="modalCenter"
                                  tabIndex="-1"
                                  aria-hidden="true"
                                >
                                  <div
                                    className="modal-dialog modal-dialog-centered modal-xl "
                                    role="document"
                                  >
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="modalCenterTitle"
                                        >
                                          Demo School
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <div className="nav-align-top mb-4">
                                          <div className="table-responsive text-nowrap">
                                            <table className="table table-striped">
                                              <thead>
                                                <tr>
                                                  <th>#</th>
                                                  <th>Photo</th>
                                                  <th>Name</th>
                                                  <th>Class</th>
                                                  <th>Campus</th>
                                                  <th>Action</th>
                                                </tr>
                                              </thead>
                                              <tbody className="table-border-bottom-0">
                                                <tr>
                                                  <td>1</td>
                                                  <td>
                                                    <img
                                                      src={Profile}
                                                      alt="Avatar"
                                                      className="rounded-circle border border-light"
                                                      style={{ height: "50px" }}
                                                    />
                                                  </td>
                                                  <td>
                                                    <span className="d-flex align-items-center fw-bold">
                                                      <span className="me-2"></span>
                                                      Ankush Sharma
                                                    </span>
                                                  </td>
                                                  <td>Two</td>
                                                  <td>Main Campus</td>
                                                  <td>
                                                    <a
                                                      className="btn btn-danger"
                                                      href="javascript:void(0);"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#modalCenter"
                                                    >
                                                      Disconnect
                                                    </a>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>1</td>
                                                  <td>
                                                    <img
                                                      src={Profile}
                                                      alt="Avatar"
                                                      className="rounded-circle border border-light"
                                                      style={{ height: "50px" }}
                                                    />
                                                  </td>
                                                  <td>
                                                    <span className="d-flex align-items-center fw-bold">
                                                      <span className="me-2"></span>
                                                      Ankush Sharma
                                                    </span>
                                                  </td>
                                                  <td>Two</td>
                                                  <td>Main Campus</td>
                                                  <td>
                                                    <a
                                                      className="btn btn-danger"
                                                      href="javascript:void(0);"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#modalCenter"
                                                    >
                                                      Disconnect
                                                    </a>
                                                  </td>
                                                </tr>{" "}
                                                <tr>
                                                  <td>1</td>
                                                  <td>
                                                    <img
                                                      src={Profile}
                                                      alt="Avatar"
                                                      className="rounded-circle border border-light"
                                                      style={{ height: "50px" }}
                                                    />
                                                  </td>
                                                  <td>
                                                    <span className="d-flex align-items-center fw-bold">
                                                      <span className="me-2"></span>
                                                      Ankush Sharma
                                                    </span>
                                                  </td>
                                                  <td>Two</td>
                                                  <td>Main Campus</td>
                                                  <td>
                                                    <a
                                                      className="btn btn-danger"
                                                      href="javascript:void(0);"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#modalCenter"
                                                    >
                                                      Disconnect
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                              <tfoot>
                                                <tr>
                                                  <td colspan="8">
                                                    <nav aria-label="Page navigation">
                                                      <ul className="pagination my-2">
                                                        <li className="page-item prev">
                                                          <a
                                                            className="page-link"
                                                            href="javascript:void(0);"
                                                          >
                                                            <i className="tf-icon bx bx-chevrons-left"></i>
                                                          </a>
                                                        </li>
                                                        <li className="page-item active">
                                                          <a
                                                            className="page-link"
                                                            href="javascript:void(0);"
                                                          >
                                                            1
                                                          </a>
                                                        </li>
                                                        <li className="page-item">
                                                          <a
                                                            className="page-link"
                                                            href="javascript:void(0);"
                                                          >
                                                            2
                                                          </a>
                                                        </li>
                                                        <li className="page-item">
                                                          <a
                                                            className="page-link"
                                                            href="javascript:void(0);"
                                                          >
                                                            3
                                                          </a>
                                                        </li>
                                                        <li className="page-item next">
                                                          <a
                                                            className="page-link"
                                                            href="javascript:void(0);"
                                                          >
                                                            <i className="tf-icon bx bx-chevrons-right"></i>
                                                          </a>
                                                        </li>
                                                      </ul>
                                                    </nav>
                                                  </td>
                                                </tr>
                                              </tfoot>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No Data Found...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
};

export default ManageParents;
