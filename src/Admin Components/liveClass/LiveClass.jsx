import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function LiveClasses() {
    const navigate = useNavigate();
    const [liveClasses, setLiveClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    // const [tutors, setTutors] = useState([]);
    const [institutes, setInstitutes] = useState([]);

    // Fetch subject, course, tutor, and institute data
    useEffect(() => {
        // Fetch subjects
        axios.get("http://localhost:5500/api/subject/get")
            .then(response => setSubjects(response.data))
            .catch(error => console.error("Failed to fetch subjects:", error));

        // Fetch courses
        axios.get("http://localhost:5500/api/courses/get")
            .then(response => setCourses(response.data))
            .catch(error => console.error("Failed to fetch courses:", error));


        // Fetch institutes
        axios.get("http://localhost:5500/api/institute/get")
            .then(response => setInstitutes(response.data))
            .catch(error => console.error("Failed to fetch institutes:", error));
    }, [liveClasses]);
    const fetchLiveClasses = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/live-class/get");
            setLiveClasses(response.data);
        } catch (error) {
            console.error("Failed to fetch live classes:", error);
        }
    };


    const handleDeleteOne = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/live-class/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });
            alert("Deleted Data");
            fetchLiveClasses();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        classDate: Yup.date().required("Class Date is required"),
        startTime: Yup.string().required("Start Time is required"),
        endTime: Yup.string().required("End Time is required"),
        duration: Yup.string().required("Duration is required"),
        link: Yup.string().url("Invalid URL").required("Class Link is required"),
        description: Yup.string().required("Description is required"),
        status: Yup.string()
            .oneOf(["Scheduled", "Ongoing", "Completed", "Cancelled"])
            .required("Status is required"),
        courseId: Yup.string().required("Course is required"),
        subjectId: Yup.string().required("Subject is required"),
        instituteID: Yup.string().required("Institute is required"),
    });

    const initialValues = {
        title: "",
        courseId: "",
        subjectId: "",
        classDate: "",
        startTime: "",
        endTime: "",
        duration: "",
        link: "",
        description: "",
        status: "Scheduled",
        attendees: [],
        instituteID: "",
    };

    const toggleForm = () => setShowForm(!showForm);


    const handleSubmit = async (formValues, { resetForm }) => {
        try {
            const response = await axios.post("http://localhost:5500/api/live-class/post", formValues, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Form submitted:", response.data);
            resetForm();
            fetchLiveClasses();
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
        }
    };

    const handleLiveClassClick = (liveClass) => {
        const classLink = liveClass.link;

        // Redirecting the user to the class link in a new tab
        window.open(classLink, "_blank");
    };

    useEffect(() => {
        fetchLiveClasses();
    }, []);
    

    return (
        <div>
            <div className="page-wrapper container mt-5">
                <div className="content">
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <h3 className="page-title mb-1">Live Classes List</h3>
                        <button className="btn btn-primary mb-3 me-2" onClick={toggleForm}>
                            Add Live Class
                        </button>
                    </div>

                    {showForm && (
                        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New Live Class</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={toggleForm}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {() => (
                                                <Form className="row g-3">
                                                    <div className="col-md-6">
                                                        <label>Title</label>
                                                        <Field name="title" className="form-control" placeholder="Enter Title" />
                                                        <ErrorMessage name="title" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Course</label>
                                                        <Field as="select" name="courseId" className="form-select" placeholder="Select Course">
                                                            <option value="">Select Course</option>
                                                            {courses.map(course => (
                                                                <option key={course._id} value={course._id}>
                                                                    {course.courseName}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="courseId" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Subject</label>
                                                        <Field as="select" name="subjectId" className="form-select" placeholder="Select Subject">
                                                            <option value="">Select Subject</option>
                                                            {subjects.map(subject => (
                                                                <option key={subject._id} value={subject._id}>
                                                                    {subject.subjectName}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="subjectId" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Institute</label>
                                                        <Field as="select" name="instituteID" className="form-select" placeholder="Select Institute">
                                                            <option value="">Select Institute</option>
                                                            {institutes.map(institute => (
                                                                <option key={institute._id} value={institute._id}>
                                                                    {institute.name}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="instituteID" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Class Date</label>
                                                        <Field type="date" name="classDate" className="form-control" placeholder="Enter Class Date" />
                                                        <ErrorMessage name="classDate" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Start Time</label>
                                                        <Field type="time" name="startTime" className="form-control" placeholder="Enter Start Time" />
                                                        <ErrorMessage name="startTime" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>End Time</label>
                                                        <Field type="time" name="endTime" className="form-control" placeholder="Enter End Time" />
                                                        <ErrorMessage name="endTime" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Duration</label>
                                                        <Field name="duration" className="form-control" placeholder="Enter Duration" />
                                                        <ErrorMessage name="duration" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Class Link</label>
                                                        <Field name="link" className="form-control" placeholder="Enter Class Link" />
                                                        <ErrorMessage name="link" component="div" className="text-danger" />
                                                    </div><div className="col-md-6">
                                                        <label>Status</label>
                                                        <Field as="select" name="status" className="form-select" placeholder="Select Status">
                                                            <option value="Scheduled">Scheduled</option>
                                                            <option value="Ongoing">Ongoing</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </Field>
                                                        <ErrorMessage name="status" component="div" className="text-danger" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>Description</label>
                                                        <Field as="textarea" name="description" className="form-control" placeholder="Enter Description" />
                                                        <ErrorMessage name="description" component="div" className="text-danger" />
                                                    </div>

                                                    <div className="col-12 modal-footer">
                                                        <button type="submit" className="btn btn-primary">
                                                            Submit
                                                        </button>
                                                        <button type="button" className="btn btn-secondary" onClick={toggleForm}>
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

                    <table className="table table-striped">
                        <thead>
                            <tr className="text-center">
                                <th>Title</th>
                                <th>Course</th>
                                <th>Subject</th>
                                <th>Class Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveClasses.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center">No data available</td>
                                </tr>
                            ) : (
                                liveClasses
                                    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <tr key={item._id} className="text-center">
                                            <td>{item.title}</td>
                                            <td>{item.courseId?.courseName || "N/A"}</td>
                                            <td>{item.subjectId?.subjectName || "N/A"}</td>
                                            <td>{new Date(item.classDate).toLocaleDateString()}</td>
                                            <td>{item.startTime}</td>
                                            <td>{item.endTime}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info me-2"
                                                    onClick={() => handleLiveClassClick(item)}
                                                >
                                                    Join
                                                </button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteOne(item._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default LiveClasses;
