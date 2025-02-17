import React, { useContext, useState } from "react";
import Profile from "../../assets/img/avatars/Profile.webp";
import { MainContext } from "../../Controller/MainProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toJpeg } from "html-to-image";
import { DeleteApi } from "../../Custom Hooks/CustomeHook";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import StudentInformationTable from "./components/StudentInformationTable";
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
  const handleEdit = (studentId, student, path) => {
    setEditedData({
      ...editedData,
      [studentId]: {
        ...student,
      },
    });
    Navigate("/editstudents", { state: { studentId, student, path } });
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
  const handleDownload = async (Data) => {
    const response = await fetch(Data);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = Data.split("/").pop();
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
                    StudentData={studentData}
                    // handleViewProfile={handleViewProfile}
                    // handleApproveRequest={handleApproveRequest}
                  />
                </div>
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
};

export default Studentsinformation;
