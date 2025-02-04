import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FeeDetails() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [query, setQuery] = useState('');
    const [studentsData, setStudentsData] = useState([]);
    const [formData, setFormData] = useState({
        allClasses: '',
        allSections: '',
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        applyFilters({ ...formData, [name]: value });
    };



    const applyFilters = (filters) => {
        let filteredData = studentsData;

        // Apply filters
        if (filters?.allClasses && filters?.allClasses !== 'All Classes') {
            filteredData = filteredData?.filter(student => student?.courseStream?.toLowerCase() === filters?.allClasses?.toLowerCase());
        }
        if (filters?.allSections && filters?.allSections !== 'All Sections') {
            filteredData = filteredData?.filter(student => student?.section?.toLowerCase() === filters?.allSections?.toLowerCase());
        }
        if (filters?.status && filters?.status !== 'All status') {
            filteredData = filteredData?.filter(student => student?.status?.toLowerCase() === filters.status?.toLowerCase());
        }

        // Apply search query
        if (query) {
            filteredData = filteredData.filter((data) =>
                (data?.firstName ? data?.firstName?.toLowerCase().includes(query.toLowerCase()) : false) ||
                (data?.rollNo ? data?.rollNo?.toString().includes(query.toLowerCase()) : false)
            );
        }

        setSearchData(filteredData);
    };

    const handleViewDetails = (student) => {
        setSelectedStudent(student);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedStudent(null);
    };

    const handleSearch = (value) => {
        setQuery(value);
        const filteredData = studentsData?.filter((data) =>
            (data?.firstName ? data?.firstName?.toLowerCase().includes(value.toLowerCase()) : false) ||
            (data?.rollNo ? data?.rollNo?.toString().includes(value.toLowerCase()) : false) ||
            (data?.section ? data?.section?.toLowerCase().includes(value.toLowerCase()) : false) ||
            (data?.status ? data?.status?.toLowerCase().includes(value.toLowerCase()) : false) ||
            (data?.courseStream ? data?.courseStream?.toLowerCase().includes(value.toLowerCase()) : false)
        );
        setSearchData(filteredData);
    };

    useEffect(() => {
        axios.get('api/fees/get').then(res => setStudentsData(res.data)).catch(err => console.log(err));
    }, []);
    console.log(studentsData, 'studentsData');




    return (
        <div className='page-wrapper'>
            <div className="card m-3 p-3">
                <div className="">
                    <h3>Students List</h3>
                    <hr />
                </div>

                <div className="studentfees-filters p-2">
                    <div className="studentfees-search-bar d-flex mb-3">
                        <input
                            type="text"
                            placeholder="Search by name or roll number..."
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button
                            className="btn btn-secondary ms-3 w-25"
                            style={{ margin: "0px 20px 0px 0px" }}
                        >
                            Filters
                        </button>
                    </div>

                    <div className="mb-3 row">
                        <div className="col-4">
                            <select
                                className="me-1 w-100"
                                name="allClasses"
                                onChange={handleChange}
                            >
                                <option value="">All Classes</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <select
                                className="me-1 w-100"
                                name="allSections"
                                onChange={handleChange}
                            >
                                <option value="">All Sections</option>
                                <option value="A">Section A</option>
                                <option value="B">Section B</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <select
                                className="me-1 w-100"
                                name="status"
                                onChange={handleChange}
                            >
                                <option value="">All Status</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="partially_paid">Partially Paid</option>
                            </select>
                        </div>
                    </div>
                </div>

                <table className='student-fees-table'>
                    <thead>
                        <tr>
                            <th>Student Details</th>
                            <th>Class Info</th>
                            <th>Contact</th>
                            <th>Fee Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchData || studentsData).map((student, index) => (
                            <tr key={index}>
                                <td>
                                    {student?.personalDetails?.firstName + " " + student?.studentId?.personalDetails?.lastName}
                                    <br />
                                    <small>{student?.studentId?.enrollmentDetails?.rollNo}</small>
                                </td>
                                <td>
                                    <span className={`courseStream ${student?.courseStream?.toLowerCase()}`} >

                                        {student?.studentId?.enrollmentDetails?.courseStream?.toUpperCase()}
                                        <br />
                                    </span>
                                    <span className={`section p-1 px-3 ${student?.courseStream?.toLowerCase()}`}>

                                        {student?.studentId?.enrollmentDetails?.section?.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    {student?.studentId?.parentDetails?.Father?.name}
                                    <br />
                                    {student?.studentId?.parentDetails?.Father?.contactNumber}
                                </td>
                                <td>
                                    <span className={`status p-1 px-3 ${student?.status?.toLowerCase()}`} style={{ backgroundColor: student.status === 'Pending' ? '#d1ecf1' : student.status === 'Partially_Paid' ? '#d4edd8' : student.status === 'Overdue' ? '#f8d7da' : '' }}>
                                        {student?.status?.toUpperCase()}


                                    </span>
                                    <br />
                                    Due: {student?.dueDate ? new Date(student?.dueDate).toLocaleDateString() : ''}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleViewDetails(student)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedStudent && (
                    <div className={`popup-overlay ${showPopup ? 'show' : ''}`}>
                        <div className={`popup ${showPopup ? 'show' : ''}`}>
                            <div className="popup-header">
                                <h2>Student Details</h2>
                                <span className="close" onClick={handleClosePopup}>
                                    &times;
                                </span>
                            </div>
                            <div className="popup-body">
                                <div className="section">
                                    <h3>Personal Information</h3>
                                    <div className="info-grid">
                                        <div>
                                            <span>Name</span>
                                            <strong>{selectedStudent?.studentId?.personalDetails?.firstName + " " + selectedStudent?.studentId?.personalDetails?.lastName}</strong>
                                        </div>
                                        <div>
                                            <span>Roll Number</span>
                                            <strong>{selectedStudent?.studentId?.enrollmentDetails?.rollNo}</strong>
                                        </div>
                                        <div>
                                            <span>Class</span>
                                            <strong>{selectedStudent?.studentId?.enrollmentDetails?.courseStream} {selectedStudent?.studentId?.enrollmentDetails?.section}</strong>
                                        </div>
                                        <div>
                                            <span>Parent's Name</span>
                                            <strong>{selectedStudent?.studentId?.parentDetails?.Father?.name}</strong>
                                        </div>
                                        <div>
                                            <span>Contact</span>
                                            <strong>{selectedStudent?.studentId?.parentDetails?.Father?.contactNumber}</strong>
                                        </div>
                                        <div>
                                            <span>Email</span>
                                            <strong>{selectedStudent?.studentId?.contactInfo?.email}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="section">
                                    <h3>Fee Status</h3>
                                    <div className="fee-status">
                                        <div className="fee-box green">
                                            Paid Amount<br />
                                            {selectedStudent?.amountPaid}
                                        </div>
                                        <div className="fee-box red">
                                            Pending Amount<br />
                                            {selectedStudent?.amountPaid}
                                        </div>
                                        <div className="fee-box blue">
                                            Due Date<br />
                                            {selectedStudent?.dueDate ? new Date(selectedStudent?.dueDate).toLocaleDateString() : ''}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeeDetails;


