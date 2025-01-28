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
                                                    className="btn btn-primary w-100"
                                                    onClick={() => handleLiveClassClick(item)}
                                                >
                                                    Join
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
