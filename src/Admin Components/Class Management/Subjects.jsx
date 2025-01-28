import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MainContext } from "../../Controller/MainProvider";
import { Link } from "react-router-dom";
import { getApi } from "../../Custom Hooks/CustomeHook";

const Subjects = () => {
    const [addclass, setAddclass] = useState([]); // State to store fetched courses
    const [StudentDataShow, setStudentDataShow] = useState(10); // Control number of students to show
    const [showModal, setShowModal] = useState(false); // State to toggle the modal
    const [showView, setShowView] = useState(false); // State to toggle the modal
    const [selectedCourse, setSelectedCourse] = useState(null); // Store selected class details
    const [subjects, setSubjects] = useState([]); // Store subjects for the selected class
    const [selectedCourseId, setSelectedCourseId] = useState(null); // Store selected course ID for adding subject

    // Fetch addclass (formerly courses) from the backend

    const fetchAddclass = async () => {
        getApi("/api/courses/get").then((data) => setAddclass(data));
    };

    // Fetch addclass data on component mount
    useEffect(() => {
        fetchAddclass();
    }, []);
    
    // // Handle delete course
    // const handleDelete = async (courseId) => {
    //     try {
    //         await axios.delete(`http://localhost:5500/api/courses/delete/${courseId}`);
    //         alert("Course deleted successfully!");
    //         fetchAddclass(); // Refresh the course list
    //     } catch (error) {
    //         console.error("Error deleting course:", error);
    //         alert("Failed to delete course.");
    //     }
    // };

    // Handle subject form submission
    const handleSubjectSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.post(
                "/api/subject/post", values
            );
            console.log("Subject added:", response.data);
            alert("Subject added successfully!");
            fetchAddclass();
            setShowModal(false); // Close modal
            resetForm(); // Reset form
        } catch (error) {
            console.error("Error adding subject:", error);
            alert("Failed to add subject.");
        }
    };
    const handleViewClick = (course, subjectsData) => {
        setSelectedCourse(course); // Set selected class details
        const filteredSubjects = addclass.slice(0, StudentDataShow).filter((sub) => sub.courseId === course._id); // Get subjects for the selected class
        setSubjects(subjectsData); // Set subjects
        setShowView(true); // Open the modal
    };
    // Dummy data for subjects (for testing purpose)


    const validationSchemaSubject = Yup.object({
        courseName: Yup.string()
            .trim()
            .required("Course Name is required"),
        courseCode: Yup.string()
            .trim()
            .required("Course Code is required"),
        courseDescription: Yup.string()
            .trim()
            .required("Course Description is required"),
        courseBoard: Yup.string()
            .trim()
            .required("Course Board/University is required"),
        courseSection: Yup.array()
            .of(Yup.string().trim().required("Section cannot be empty"))
            .min(1, "At least one section must be selected"),
        courseDepartment: Yup.string()
            .trim()
            .required("Course Department is required"),
        courseSemester: Yup.string()
            .trim()
            .matches(/^\d+$/, "Course Semester must be a number")
            .required("Course Semester is required"),
        courseYear: Yup.string()
            .trim()
            .matches(/^\d+$/, "Course Year must be a number")
            .required("Course Year is required"),
    });


    return (
        <>

            <div className="container" style={{ marginTop: "50px" }}>
                <div className="card">
                    <div className="card-header bg-themprimary">
                        <h5 className="mb-0 text-white fw-bold">Add Class Information </h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Class Name</th>
                                    <th>Class Code</th>
                                    <th>Class Description</th>
                                    <th>Class Board</th>
                                    <th>Department</th>
                                    <th>Semester</th>
                                    <th>Year</th>
                                    <th>Sections</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addclass.length > 0 ? (
                                    addclass.slice(0, StudentDataShow).map((course) => (
                                        <tr key={course._id}>
                                            <td>
                                                <Link to={`/coursedetail/${course.courseCode}`} className="text-decoration-none">
                                                    {course.courseName}
                                                </Link>
                                            </td>
                                            <td>{course.courseCode}</td>
                                            <td>{course.courseDescription}</td>
                                            <td>{course.courseBoard}</td>
                                            <td>{course.courseDepartment}</td>
                                            <td>{course.courseSemester}</td>
                                            <td>{course.courseYear}</td>
                                            <td>{course.courseSection}</td>
                                            <td>
                                                <div className="d-flex justify-content-start gap-2">
                                                    <button
                                                        className="btn btn-info btn-sm"
                                                        onClick={() => handleViewClick(course, course?.courseSubjects)}
                                                    >
                                                        <i className="bx bx-show"></i> View
                                                    </button>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => {
                                                            setSelectedCourseId(course._id);
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        Add Subject
                                                    </button>
                                                </div>
                                            </td>
                                            {/* Modal for Adding Subject */}
                                            {showModal && (
                                                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                                                    <div className="modal-dialog" style={{ maxWidth: '800px' }}>
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h3 className="modal-title">Add Subject</h3>
                                                                <button
                                                                    type="button"
                                                                    className="btn-close"
                                                                    onClick={() => setShowModal(false)}
                                                                ></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <Formik

                                                                   
                                                                    initialValues={{
                                                                        courseId: selectedCourseId,
                                                                        subjectCode: "",
                                                                        subjectDescription: "",
                                                                        subjectType: "",
                                                                        subjectDepartment: "",
                                                                        subjectSemester: "",
                                                                        subjectYear: "",
                                                                    }}
                                                                    onSubmit={handleSubjectSubmit}
                                                                >
                                                                    {({ setFieldValue }) => (
                                                                        <Form>
                                                                            <div className="row">
                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectName" className="form-label">Subject Name</label>
                                                                                    <Field type="text" className="form-control" name="subjectName" />
                                                                                </div>
                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectCode" className="form-label">Subject Code</label>
                                                                                    <Field type="text" className="form-control" name="subjectCode" />
                                                                                </div>

                                                                            </div>

                                                                            <div className="row">

                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectDepartment" className="form-label">Subject Department</label>
                                                                                    <Field type="text" className="form-control" name="subjectDepartment" />
                                                                                </div>
                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectSemester" className="form-label">Subject Semester</label>
                                                                                    <Field type="number" className="form-control" name="subjectSemester" />
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">

                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectYear" className="form-label">Subject Year</label>
                                                                                    <Field type="number" className="form-control" name="subjectYear" />
                                                                                </div>
                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectDescription" className="form-label">Subject Description</label>
                                                                                    <Field type="text" className="form-control" name="subjectDescription" />
                                                                                </div>
                                                                                <div className="col-6 mb-3">
                                                                                    <label htmlFor="subjectType" className="form-label">Subject Type</label>
                                                                                    <Field as="select" className="form-control" name="subjectType">
                                                                                        <option value="" disabled>Select Subject Type</option>
                                                                                        <option value="Theory">Theory</option>
                                                                                        <option value="Practical">Practical</option>
                                                                                    </Field>
                                                                                </div>

                                                                            </div>

                                                                            <div className="modal-footer">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-secondary"
                                                                                    onClick={() => setShowModal(false)}
                                                                                >
                                                                                    Close
                                                                                </button>
                                                                                <button type="submit" className="btn btn-primary">
                                                                                    Add Subject
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            No courses available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* Popup View btn */}
                        {showView && selectedCourse && (
                            <div
                                className="modal fade show"
                                tabIndex="-1"
                                style={{
                                    display: "block",
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    zIndex: 1050,
                                }}
                            >
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content border-0 rounded-4 shadow-lg" style={{ background: "#f7f7f7" }}>
                                        {/* Modal Header */}
                                        <div className="modal-header bg-gradient-to-r from-primary to-secondary text-white">
                                            <h3 className="modal-title fw-bold text-uppercase">View Details</h3>
                                            <button
                                                type="button"
                                                className="btn-close btn-close-white"
                                                onClick={() => setShowView(false)}
                                            ></button>
                                        </div>

                                        {/* Modal Body */}
                                        <div className="modal-body px-4 py-3">
                                            {/* Class Details */}
                                            <div className="mb-5">
                                                <h4 className="text-primary mb-4">Class Details</h4>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Class Name:</strong> {selectedCourse.courseName}
                                                        </div>
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Class Code:</strong> {selectedCourse.courseCode}
                                                        </div>
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Description:</strong> {selectedCourse.courseDescription}
                                                        </div>
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Board:</strong> {selectedCourse.courseBoard}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Department:</strong> {selectedCourse.courseDepartment}
                                                        </div>
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Semester:</strong> {selectedCourse.courseSemester}
                                                        </div>
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Year:</strong> {selectedCourse.courseYear}
                                                        </div>
                                                        <div className="mb-3 p-3 border rounded-3 shadow-sm" style={{ backgroundColor: "#fff" }}>
                                                            <strong>Sections:</strong> {selectedCourse.courseSection.join(", ")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Subject Details */}
                                            <div>
                                                <h4 className="text-primary mb-4">Subjects</h4>
                                                {subjects.length > 0 ? (
                                                    <div className="list-group">
                                                        {subjects.map((subject, index) => (
                                                            <div
                                                                key={index}
                                                                className="list-group-item list-group-item-action mb-3 border-bottom "
                                                                style={{
                                                                    background: "#fff",
                                                                    transition: "transform 0.2s ease-in-out",
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                            >
                                                                <div className="px-3 " style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Subject Name:</strong> {subject?.subjectName}<hr />
                                                                </div>
                                                                <div className="px-3  " style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Subject Code:</strong> {subject?.subjectCode}<hr />
                                                                </div>
                                                                <div className="px-3" style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Department:</strong> {subject?.subjectDepartment}<hr />
                                                                </div>
                                                                <div className="px-3" style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Semester:</strong> {subject?.subjectSemester}<hr />
                                                                </div>
                                                                <div className="px-3" style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Year:</strong> {subject?.subjectYear}<hr />
                                                                </div>
                                                                <div className="px-3" style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Description:</strong> {subject?.subjectDescription}<hr />
                                                                </div>
                                                                <div className="px-3" style={{ backgroundColor: "#f9f9f9" }}>
                                                                    <strong>Type:</strong> {subject?.subjectType}<hr />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-danger">No subjects available for this class.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Modal Footer */}
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setShowView(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                    </div>
                </div>
            </div>


        </>
    );
};

export default Subjects;
