import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // If using Axios



function StudentPanel() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
        const [selectedExam, setSelectedExam] = useState(null);
        const [showModal, setShowModal] = useState(false)

    const [searchTerm, setSearchTerm] = useState("");

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };
    const handleViewMore = (exam) => {
        setSelectedExam(exam); // Set the exam details
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedExam(null);
    };


    const fetchExams = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/exam/get");
            setClasses(response.data);
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    };

    

    useEffect(() => {
        fetchExams();
    }, []);

    const handleExamClick = (exam) => {
        const currentDate = new Date();
        const examStart = new Date(`${exam.date}T${exam.startTime}Z`);
        const examEnd = new Date(`${exam.date}T${exam.endTime}Z`);

        if (currentDate >= examStart && currentDate <= examEnd) {
            navigate(`/exampaper/${exam.examId}`, { state: { exam } });
        } else if (currentDate < examStart) {
            alert("The exam has not started yet.");
        } else {
            alert("The exam has already ended.");
        }
    };
    const filteredExams = exams.filter((exam) =>
        exam.name && exam.name.toLowerCase().includes(searchTerm.toLowerCase())

    );
    return (
        <div>
            <div className="page-wrapper container mt-5">
                <div className="content">
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <div className="my-auto mb-2 ms-3">
                            <h3 className="page-title mb-1">Exams List</h3>
                            <nav>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <a href="/">Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-item Completed" aria-current="page">
                                        Exams and tests
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between me-5 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Exam Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {showModal && selectedExam && (
                        <div className="modal show d-block mt-5 " tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Exam Details</h5>
                                        <button type="button" className="close" onClick={handleCloseModal}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            {/* <div className="col-md-6"><p><strong>Class:</strong> {selectedExam.assignedTo}</p></div>
                                            <div className="col-md-6"><p><strong>Section:</strong> {selectedExam.assignedTo?.section}</p></div> */}
                                            <div className="col-md-6"> <p><strong>Starting Date:</strong> {new Date(selectedExam.startingDate).toLocaleDateString()}</p></div>
                                            <div className="col-md-6"> <p><strong>Ending Date:</strong> {new Date(selectedExam.endingDate).toLocaleDateString()}</p></div>
                                            <div className="col-md-6"> <p><strong>Starting Time:</strong> {selectedExam.startTime}</p></div>
                                            <div className="col-md-6"><p><strong>Ending Time:</strong> {selectedExam.endTime}</p></div>
                                            <div className="col-md-6"> <p><strong>Status:</strong> {selectedExam.status}</p></div>
                                            <div className="col-md-6"><p><strong>Instructions:</strong> {selectedExam.examInstructions || "N/A"}</p></div>
                                            <div className="col-md-6"><p><strong>Duration:</strong> {selectedExam.duration} minutes</p></div>
                                        </div>

                                        <h5 className="mt-3">Subjects</h5>
                                        <table className="table table-bordered mt-2">
                                            <thead>
                                                <tr>
                                                    {/* <th>Subject ID</th> */}
                                                    <th>Subject Name</th>
                                                    <th>Subject Code</th>
                                                    <th>Exam Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="">
                                                {selectedExam.subjects.map((subject, index) => (
                                                    <tr key={index}>
                                                        {/* <td>{subject.subjectId}</td> */}
                                                        <td>{subject.subjectName}</td>
                                                        <td>{subject.subjectCode}</td>
                                                        <td>{new Date(subject.examDate).toLocaleDateString()}</td>
                                                        <td>{subject.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>Exam Name</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Duration</th>
                                <th>Status</th>
                                {/* <th>Class</th>
                                <th>Section</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((item, i) => (
                                <tr key={i} className="text-center">
                                    <td>{item.semesterName}</td>
                                    <td>{new Date(item.startingDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.endingDate).toLocaleDateString()}</td>
                                    <td>{item.duration} minutes</td>
                                    <td>{item.status}</td>
                                    {/* <td>{item.assignedTo?.class}</td>
                                    <td>{item.assignedTo?.section}</td> */}
                                    <td>
                                        <button
                                            className="btn btn-info mb-3 mx-3"
                                            onClick={() => handleViewMore(item)} // Pass the exam details here
                                        >
                                            View More
                                        </button>
                                        <button
                                            className="btn btn-danger mb-3 mx-3"
                                            onClick={() => handleDeleteOne(item._id)} // Pass the item._id here
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentPanel;
