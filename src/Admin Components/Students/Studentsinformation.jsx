import React, { useContext, useState } from 'react'
import Profile from "../../assets/img/avatars/Profile.webp"
import { MainContext } from '../../Controller/MainProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toJpeg } from 'html-to-image';
import { DeleteApi } from '../../Custom Hooks/CustomeHook';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
const Studentsinformation = () => {

    // ALL DATA PROVIDER
    const { fetchTrashData, fetchStudentData, handlePrint, printPDF, exportToExcel, handleExportCSV } = useContext(MainContext) // -->> real time karna hai 
    const { StudentData: studentData } = getCommonCredentials();

    /** Filters studentsData array based on mainCampus, className, section and type */
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
            const classNameMatch = className === "" || student.className === className;
            const sectionMatch = section === "" || student.section === section;
            const typeMatch = type === "" || student.type === type;
            return campusMatch && classNameMatch && sectionMatch && typeMatch;
        });
        setFiltereData(filteredData);
    }




    /** Filters studentsData array based on search query */
    const handleSearch = (query) => {
        // Implement search logic here
        const filteredData = studentData.filter(item => {
            const nameMatch = item.personalDetails?.firstName?.toLowerCase().includes(query.toLowerCase());
            const parentNameMatch = item.parentDetails?.Father?.name?.toLowerCase().includes(query.toLowerCase());
            const numberMatch = item.parentDetails?.Father?.contactNumber?.includes(query);
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
        await DeleteApi('/api/student/add-all-trash', 'All students Deleted successfully');
        fetchStudentData();
        fetchTrashData();
    };
    const handleDeleteone = async (id) => {
        await DeleteApi(`/api/student/add-trash/${id}`, 'Student Deleted successfully');
        fetchStudentData();
        fetchTrashData();
    };
    const handleDownload = async (Data) => {
        const response = await fetch(Data);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = Data.split('/').pop();
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <div className="layout-page">
                        <div className="content-wrapper">
                            <div className="container-fluid container-p-y">
                                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Students Management /</span> Students Information</h4>
                                <div className="card mb-4">
                                    <h5 className="card-header">Fillter Information</h5>
                                    <div className="card-body">
                                        <form onSubmit={(e) => { e.preventDefault(); filterFunction() }}>
                                            <div className="row">
                                                <div className="col">
                                                    <label className="form-label">Main Campus</label>
                                                    <select onChange={(e) => setMainCampus(e.target.value)} className="form-select">
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
                                                    <select onChange={(e) => setClassName(e.target.value)} className="form-select">
                                                        <option value="">All</option>
                                                        <option value="I">I</option>
                                                        <option value="II">II</option>
                                                        <option value="III">III</option>
                                                        <option value="IV">IV</option>
                                                        <option value="V">V</option>
                                                        <option value="VI">VI</option>
                                                        <option value="VII">VII</option>
                                                        <option value="VIII">VIII</option>
                                                        <option value="IX">IX</option>
                                                        <option value="X">X</option>
                                                        <option value="XI">XI</option>
                                                        <option value="XII">XII</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Section</label>
                                                    <select onChange={(e) => setSection(e.target.value)} className="form-select">
                                                        <option value="">All</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Tpye</label>
                                                    <select onChange={(e) => setType(e.target.value)} className="form-select">
                                                        <option value="">All</option>
                                                        <option value="Regular">Regular</option>
                                                        <option value="Deactivate">Deactivate</option>
                                                        <option value="Passout">Passout</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Filtter</label>
                                                    <button type="submit" className="btn btn-success w-100"> Fillter Data</button>
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
                                                    <span className="input-group-text"><i className="bx bx-search"></i></span>
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
                                                    <Link type="button" className="btn btn-danger" onClick={handleDeleteAll}>
                                                        <i className='tf-icons bx bx-trash me-1'></i>
                                                        Delete All
                                                    </Link>
                                                    <Link type="button" className="btn btn-success" onClick={exportToExcel}>
                                                        <i className='tf-icons bx bxs-file me-1'></i>
                                                        Excel
                                                    </Link>
                                                    <Link type="button" className="btn btn-warning" onClick={handleExportCSV}>
                                                        <i className='tf-icons bx bxs-file-doc me-1'></i>
                                                        CSV
                                                    </Link>
                                                    <Link type="button" className="btn btn-info" onClick={handlePrint}>
                                                        <i className='tf-icons bx bxs-printer me-1'></i>
                                                        Print
                                                    </Link>
                                                    <Link to={"/studenttrash"} className="btn btn-warning">
                                                        <i className='tf-icons bx bxs-trash me-1'></i>
                                                        Trash
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h5 className="card-header">Students Information</h5>
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Roll ID</th>
                                                    <th>profile</th>
                                                    <th>Name</th>
                                                    <th>DOB</th>
                                                    <th>Parents Name</th>
                                                    <th>Parents Number</th>
                                                    <th>Gender</th>
                                                    <th>Email</th>
                                                    <th>Request Status</th>
                                                    <th>Profile</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-border-bottom-0">
                                                {(filtereData || studentData).map((student) => (
                                                    <tr key={student._id}>
                                                        <td>{student.StuID}</td>
                                                        <td>
                                                            <span className="d-flex align-items-center fw-bold">
                                                                <span className="me-2">
                                                                    <img
                                                                        src={student?.personalDetails?.profilePhoto}
                                                                        alt="Avatar"
                                                                        className="rounded-circle border border-light"
                                                                        style={{ height: "50px", width: "50px" }}
                                                                        onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                                                                    />
                                                                </span>

                                                            </span></td>
                                                        <td>
                                                            {student?.personalDetails?.firstName} {student?.personalDetails?.lastName}
                                                        </td>
                                                        <td>{student?.personalDetails?.dateOfBirth
                                                            ? new Date(student.personalDetails.dateOfBirth).toISOString().split("T")[0]
                                                            : ""}</td>
                                                        <td>
                                                            {student?.parentDetails.Father?.name}
                                                        </td>
                                                        <td>
                                                            {student?.parentDetails?.Father?.contactNumber}
                                                        </td>
                                                        <td>
                                                            {student?.personalDetails?.gender}
                                                        </td>
                                                        <td>
                                                            {student?.contactInfo?.email}
                                                        </td>
                                                        <td>
                                                            <div className="btn-group" id="dropdown-icon-demo">
                                                                <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                                                    Certificate & Reports
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <Link to="javascript:void(0);" className="dropdown-item" onClick={() => openPopup(student.personalDetails?.dateOfBirth)}>DOB Certificate</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="javascript:void(0);" className="dropdown-item" onClick={() => openPopup(student?.documents?.transferCertificate)}>transfer Certificate</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="javascript:void(0);" className="dropdown-item" onClick={() => openPopup(student.previous?.passOutYear)}>School Leaving Certificate</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="javascript:void(0);" className="dropdown-item" onClick={() => openPopup(student.attendenceDetails?.totalDays)}>Attendance Report</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="javascript:void(0);" className="dropdown-item" onClick={() => openPopup(student)}>ID Card Generate</Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Link className="btn btn-warning" to={`/studentdetail/${student?.StuID}`}>
                                                                <i className='bx bx-show me-1'></i>
                                                                Profile
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-success btn-icon rounded-pill me-1"
                                                                onClick={() => handleEdit(student._id, student, "student-info")}
                                                            >
                                                                <i className="bx bx-edit"></i>
                                                            </button>
                                                            <Link className="btn btn-danger btn-icon rounded-pill" onClick={() => handleDeleteone(student?._id)} ><i className="bx bx-trash"></i></Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                            {popupData && (
                                                <div class="position-absolute top-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                                    <div class="modal-dialog mt-5">
                                                        <div class="modal-content bg-light justify-content-center align-items-center d-flex w-100 mt-5 pt-3">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title">Download/Share Document</h5>
                                                            </div>
                                                            <div class="modal-body d-flex justify-content-center align-items-center">
                                                                <img src={popupImg} alt="document" style={{ maxWidth: "100%", maxHeight: "500px" }} />
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" onClick={closePopup}>Close</button>
                                                                <button type="button" class="btn btn-success" onClick={() => handleDownload(popupImg)}>Download</button>
                                                                <button type="button" class="btn btn-primary">Share</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="content-backdrop fade"></div>
                        </div>
                    </div>
                </div >
                <div className="layout-overlay layout-menu-toggle"></div>
            </div >
        </>
    )
}

export default Studentsinformation
