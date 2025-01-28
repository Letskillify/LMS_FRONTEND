import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // If using Axios
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
function ExamTests() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Sannidhya
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Exam Name is required"),
        date: Yup.date().required("Date is required"),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("End time is required"),
        duration: Yup.number().required("Duration is required"),
    });

    const toggleForm = () => setShowForm(!showForm);

    const handleSubmit = async (formValues, { resetForm }) => {
        console.log("Submitting form with values:", formValues); // Debug here
        try {
            const response = await axios.post('http://localhost:5500/api/exam/post', formValues, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            });
            console.log("Form data submitted:", response.data);
            resetForm();
            fetchExams();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:5500/api/exam/delete-all-history', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });
            console.log("Form data submitted:", response);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const handleDeleteOne = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/exam//delete-history/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });
            console.log("Form data submitted:", response);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const fetchExams = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/exam/get-history");
            setClasses(response?.data);
        } catch (error) {
            console.error("Failed to fetch exams:", error);
        }
    };

    useEffect(() => {
        fetchExams();
    }, [classes]);

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

    
    return (
        <div>
            <div className="page-wrapper container mt-5">
                <div className="content">
                    {/* Page Header */}
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <div className="my-auto mb-2">
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

                    {/* Search */}
                    <div className="d-flex justify-content-between me-5">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Exam Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>

                        <button className="btn btn-primary mb-3" onClick={toggleForm}>
                            Add Exam
                        </button>
                        <button className="btn mb-3" onClick={handleDelete}>
                            Delete All
                        </button>
                        </div>

                    </div>

                    {showForm && (
                        <div className="modal d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New Exam</h5>
                                        <button type="button" className="close" onClick={toggleForm}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <Formik
                                            initialValues={{
                                                name: "",
                                                date: "",
                                                startTime: "",
                                                endTime: "",
                                                duration: "",
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {() => (
                                                <Form>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage
                                                            name="name"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="date">Date</label>
                                                        <Field
                                                            type="date"
                                                            name="date"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage
                                                            name="date"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="startTime">Start Time</label>
                                                        <Field
                                                            type="time"
                                                            name="startTime"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage
                                                            name="startTime"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="endTime">End Time</label>
                                                        <Field
                                                            type="time"
                                                            name="endTime"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage
                                                            name="endTime"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="duration">Duration (mins)</label>
                                                        <Field
                                                            type="number"
                                                            name="duration"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage
                                                            name="duration"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btn-primary">
                                                            Submit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={toggleForm}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Exam Date</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{formatDate(item.date)}</td>
                                        <td>{item.startTime}</td>
                                        <td>{item.endTime}</td>
                                        <td>{item.duration}</td>
                                        <td>
                                            <span
                                                className={`badge ${item.status === "Completed"
                                                    ? "badge-soft-success"
                                                    : item.status === "Ongoing"
                                                        ? "badge-soft-primary"
                                                        : "badge-soft-danger"
                                                    }`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    item.status === "Ongoing" && handleExamClick(item)
                                                }
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDeleteOne(item._id)}>
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

export default ExamTests;
