import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function AdminExam() {
    const navigate = useNavigate();
    const [selectedExam, setSelectedExam] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleViewMore = (exam) => {
        setSelectedExam(exam); // Set the exam details
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedExam(null);
    };

    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [subjectImport, setSubjectImport] = useState([]);
    const [courseImport, setcourseImport] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [showSubjectForm, setShowSubjectForm] = useState(false);
    const handleDeleteOne = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/exam/add-trash/${id}`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                console.log("Deleted exam:", id);
                setClasses((prevClasses) => prevClasses.filter((item) => item._id !== id));
            } else {
                console.error("Failed to delete exam:", response.data);
            }
        } catch (error) {
            console.error("Error deleting exam:", error);
        }
    };
    useEffect(() => {
        // axios.get("http://localhost:5500/api/subject/get")
        //     .then(response => setSubjectImport(response.data))
        //     .catch(error => console.error("Failed to fetch institutes:", error));

    }, [])
    useEffect(() => {
        axios.get("http://localhost:5500/api/courses/get")
            .then(response => setcourseImport(response.data))
            .catch(error => console.error("Failed to fetch courses:", error));
    }, [])

    // console.log("Courses:", courseImport);
    console.log("Subject:", subjectImport);
    // console.log("Subjects:", subjectImport);



    const validationSchema = Yup.object({
        semesterName: Yup.string().required("SName is required"),
        startingDate: Yup.string().required("Starting Date is required"),
        endingDate: Yup.string().required("Ending Date is required"),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("SEns time is required"),
        // assignedTo: Yup.object({
        //     class: Yup.string().required("Class is required"),
        //     section: Yup.string(),
        // }),
        examInstructions: Yup.string(),
        subjects: Yup.array()
            .of(
                Yup.object({
                    subjectId: Yup.string().required("Subject ID is required"),
                    subjectName: Yup.string().required("Subject Name is required"),
                    examDate: Yup.date()
                        .required("Exam date is required")
                        .typeError("Invalid date format"),
                    subjectCode: Yup.string().required("Subject Code is required"),
                    status: Yup.string()
                        .oneOf(
                            ["Scheduled", "Completed", "Cancelled"],
                            "Invalid status"
                        )
                        .required("Status is required"),
                })
            )
            .min(1, "At least one subject is required"),
    });

    // const subjectValidationSchema = Yup.object({
    //     subjectId: Yup.string().required("Subject ID is required"),
    //     subjectName: Yup.string().required("Subject Name is required"),
    //     examDate: Yup.date().required("Exam date is required"),
    //     subjectCode: Yup.string().required("Subject code is required"),

    // });

    const toggleForm = () => setShowForm(!showForm);

    const toggleSubjectForm = () => setShowSubjectForm(!showSubjectForm);

    const calculateDuration = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        const duration = (end - start) / (1000 * 60);
        return duration;
    };

    const handleSubmit = async (formValues, { resetForm }) => {
        console.log("Submitting form with values:", formValues);

        const { startTime, endTime, subjects } = formValues;
        const duration = calculateDuration(startTime, endTime);

        try {
            await axios.post("http://localhost:5500/api/exam/post", {
                ...formValues,
                duration,
                subjects,

            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            resetForm();
            setSubjects([]);
            fetchExams();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
        toggleForm(false);
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

    return (
        <div>
            <div className="page-wrapper container mt-5">
                <div className="content">
                    <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                        <div className="my-auto mb-2 ms-3">
                            <h3 className="page-title mb-1">Exams List</h3>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between me-5">
                        <button className="btn btn-primary mb-3 mx-3" onClick={toggleForm}>
                            Add Exam
                        </button>
                    </div>

                    {showForm && (
                        <div className="container mt-4">
                            <div className="card shadow-sm p-4 ">
                                <div className="d-flex" style={{ justifyContent: 'space-between' }}>

                                    <h4 className="mb-4">Add New Exam</h4>
                                    <button type="button" className="close h-50" onClick={toggleForm}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <Formik
                                    initialValues={{
                                        instituteId: "677cc6cf075b4e701ebca12c",
                                        courseId: "",
                                        semesterName: "",
                                        startingDate: "",
                                        endingDate: "",
                                        startTime: "",
                                        endTime: "",
                                        examInstructions: "",
                                        subjects: [
                                            {
                                                subjectId: "",
                                                subjectName: "",
                                                examDate: "",
                                                subjectCode: "",
                                                status: "Scheduled",
                                            },
                                        ],
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, setFieldValue, handleChange }) => (
                                        <Form>
                                            <div className="mb-4">
                                                <h5>Semester Information</h5>

                                                <div className="row">
                                                    <div className="col-md-6 mt-4 me-1">
                                                        <div className="form-group">
                                                            <label htmlFor="semesterName">Semester Name</label>
                                                            <Field
                                                                type="text"
                                                                name="semesterName"
                                                                className="form-control"
                                                                placeholder="Enter semester name"
                                                            />
                                                            <ErrorMessage
                                                                name="semesterName"
                                                                component="div"
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="courseId">Class/Course</label>
                                                            <Field
                                                                name="courseId"
                                                                as="select" // Render as a select dropdown
                                                                className="form-control"
                                                                value={values.courseId}
                                                                onChange={(e) => {
                                                                    const selectedCourse = courseImport?.find(course => course._id === e.target.value);
                                                                    setSubjectImport(selectedCourse?.courseSubjects || []);
                                                                    handleChange(e);
                                                                }}
                                                            >
                                                                <option value="" disabled>
                                                                    Select a Course
                                                                </option>
                                                                {courseImport?.map((course) => (
                                                                    <option key={course?.courseId} value={String(course._id)}>
                                                                        {course.courseName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="courseId"
                                                                component="div"
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="assignedTo.section">Section</label>
                                                            <Field
                                                                name="assignedTo.section"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="assignedTo.section"
                                                                component="div"
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="startingDate">Starting Date</label>
                                                            <Field
                                                                type="date"
                                                                name="startingDate"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="startingDate"
                                                                component="div"
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="endingDate">Ending Date</label>
                                                            <Field
                                                                type="date"
                                                                name="endingDate"
                                                                className="form-control"
                                                            />
                                                            <ErrorMessage
                                                                name="endingDate"
                                                                component="div"
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mt-4">
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
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mt-4">
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
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="examInstructions">Instructions</label>
                                                            <Field
                                                                type="text"
                                                                name="examInstructions"
                                                                className="form-control"
                                                                placeholder="Enter exam instructions"
                                                            />
                                                            <ErrorMessage
                                                                name="examInstructions"
                                                                component="div"
                                                                className="text-danger small"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <h5>Subjects</h5>
                                                {values.subjects.map((_, index) => (
                                                    <div className="row mb-3" key={index}>
                                                        {/* Subject Dropdown */}
                                                        <div className="col-md-3 mt-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`subjects.${index}.subjectId`}>Subject</label>
                                                                <Field
                                                                    as="select"
                                                                    name={`subjects.${index}.subjectId`}
                                                                    className="form-control"
                                                                    onChange={(e) => {
                                                                        const selectedSubject = subjectImport.find(
                                                                            (subject) => subject._id === e.target.value
                                                                        );
                                                                        if (selectedSubject) {
                                                                            setFieldValue(`subjects.${index}.subjectId`, selectedSubject._id);
                                                                            setFieldValue(`subjects.${index}.subjectName`, selectedSubject.subjectName);
                                                                            setFieldValue(`subjects.${index}.subjectCode`, selectedSubject.subjectCode);
                                                                        }
                                                                    }}
                                                                >
                                                                    <option value="" label="Select a subject" />
                                                                    {subjectImport.map((subject) => (
                                                                        <option key={subject._id} value={subject._id}>
                                                                            {subject.subjectName} ({subject.subjectCode})
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage
                                                                    name={`subjects.${index}.subjectId`}
                                                                    component="div"
                                                                    className="text-danger small"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Exam Date */}
                                                        <div className="col-md-3 mt-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`subjects.${index}.examDate`}>Exam Date</label>
                                                                <Field
                                                                    type="date"
                                                                    name={`subjects.${index}.examDate`}
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage
                                                                    name={`subjects.${index}.examDate`}
                                                                    component="div"
                                                                    className="text-danger small"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Subject Code */}
                                                        <div className="col-md-3 mt-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`subjects.${index}.subjectCode`}>Subject Code</label>
                                                                <Field
                                                                    type="text"
                                                                    name={`subjects.${index}.subjectCode`}
                                                                    className="form-control"
                                                                    readOnly
                                                                    placeholder="Auto-filled"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Status */}
                                                        <div className="col-md-3 mt-4">
                                                            <div className="form-group">
                                                                <label htmlFor={`subjects.${index}.status`}>Status</label>
                                                                <Field
                                                                    as="select"
                                                                    name={`subjects.${index}.status`}
                                                                    className="form-control"
                                                                >
                                                                    <option value="Scheduled">Scheduled</option>
                                                                    <option value="Completed">Completed</option>
                                                                    <option value="Cancelled">Cancelled</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Add More Subjects Button */}
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        setFieldValue("subjects", [
                                                            ...values.subjects,
                                                            {
                                                                subjectId: "",
                                                                subjectName: "",
                                                                examDate: "",
                                                                subjectCode: "",
                                                                status: "Scheduled",
                                                            },
                                                        ])
                                                    }
                                                >
                                                    Add More Subjects
                                                </button>
                                            </div>



                                            <div className="text-right">
                                                <button type="submit" className="btn btn-primary mx-2">
                                                    Submit
                                                </button>
                                                <button type="close" className="btn btn-danger mx-2" onClick={toggleForm}>
                                                    Close
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    )}
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
                                            <div className="col-md-6"><p><strong>Course:</strong> {selectedExam.courseId}</p></div>
                                            <div className="col-md-6"><p><strong>Section:</strong> {selectedExam.assignedTo?.section}</p></div>
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
                                <th>Class/Course</th>
                                <th>Section</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((item, i) => (
                                <tr key={i} className="table-row text-center">
                                    <td>{item.semesterName}</td>
                                    <td>{new Date(item.startingDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.endingDate).toLocaleDateString()}</td>
                                    <td>{item.duration} minutes</td>
                                    <td>{item.status}</td>
                                    <td>{item.courseId || "N/A"}</td>
                                    <td>{item.assignedTo?.section || "N/A"}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-info me-3 "
                                                onClick={() => handleViewMore(item)} // Pass the exam details here
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteOne(item._id)} // Pass the item._id here
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default AdminExam;
