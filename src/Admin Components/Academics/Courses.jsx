import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { MainContext } from "../../Controller/MainProvider";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

function Courses() {
    const { userId } = useContext(MainContext);
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);

    // Validation schema using Yup
    const validationSchema = Yup.object({
        courseName: Yup.string().required("Course Name is required"),
        courseDescription: Yup.string()
            .default("No description provided")
            .required("Course Description is required"),
        courseType: Yup.string()
            .oneOf(["Diploma", "Degree", "Class", "Certification"], "Invalid course type")
            .required("Course Type is required"),
        courseDuration: Yup.string()
            .matches(/^[0-9]+\s?(days|weeks|months|years)$/i, "Invalid format (e.g., 3 months)")
            .required("Course Duration is required"),
        includeSemester: Yup.boolean().default(false),
    });

    const initialValues = {
        courseName: editingCourse?.courseName || "",
        courseDescription: editingCourse?.courseDescription || "",
        courseType: editingCourse?.courseType || "",
        courseDuration: editingCourse?.courseDuration || "",
        includeSemester: editingCourse?.includeSemester || false,
        instituteId: userId || "",
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get("/api/courses/get");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (editingCourse) {
                await axios.put(`/api/courses/${editingCourse.id}`, values);
                toast.success("Course updated successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                await axios.post("/api/courses/post", values);
                toast.success("Course added successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            resetForm();
            setEditingCourse(null);
            fetchCourses();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error saving course", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/courses/delete/${id}`);
            toast.success("Course deleted successfully!", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
            fetchCourses();
        } catch (error) {
            toast.error("Error deleting course", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="px-4">
            <div className="my-5 p-4 border rounded shadow">
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <h2 className="form-header mb-4 text-center">
                                {editingCourse ? "Edit Course" : "Add Course"}
                            </h2>
                            <div className="row g-3">
                                {/* Course Name */}
                                <div className="col-md-6">
                                    <label htmlFor="courseName" className="form-label">Course Name</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="courseName"
                                        placeholder="Enter Course Name"
                                    />
                                    <ErrorMessage name="courseName" component="div" className="text-danger small mt-1" />
                                </div>

                                {/* Course Type */}
                                <div className="col-md-6">
                                    <label htmlFor="courseType" className="form-label">Course Type</label>
                                    <Field as="select" className="form-select" name="courseType">
                                        <option value="">Select Course Type</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Degree">Degree</option>
                                        <option value="Class">Class</option>
                                        <option value="Certification">Certification</option>
                                    </Field>
                                    <ErrorMessage name="courseType" component="div" className="text-danger small mt-1" />
                                </div>

                                {/* Course Duration */}
                                <div className="col-md-6">
                                    <label htmlFor="courseDuration" className="form-label">Course Duration</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="courseDuration"
                                        placeholder="Enter Course Duration (e.g., 3 months)"
                                    />
                                    <ErrorMessage name="courseDuration" component="div" className="text-danger small mt-1" />
                                </div>

                                {/* Course Description */}
                                <div className="col-md-6">
                                    <label htmlFor="courseDescription" className="form-label">Course Description</label>
                                    <Field
                                        as="textarea"
                                        className="form-control"
                                        name="courseDescription"
                                        placeholder="Enter Course Description"
                                        rows="1"
                                    />
                                    <ErrorMessage name="courseDescription" component="div" className="text-danger small mt-1" />
                                </div>

                                {/* Include Semester */}
                                <div className="col-12">
                                    <div className="form-check">
                                        <Field
                                            type="checkbox"
                                            className="form-check-input"
                                            id="includeSemester"
                                            name="includeSemester"
                                        />
                                        <label htmlFor="includeSemester" className="form-check-label">
                                            Include Semester
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary">
                                        {editingCourse ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Courses Table */}
            <div className="card">
                <div className="my-5">
                    <h3 className="text-center mb-4">Courses List</h3>
                    <div className="table-responsive" style={{ overflowX: 'auto' }}>
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Course Name</th>
                                    <th className="text-center">Course Type</th>
                                    <th className="text-center">Course Duration</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? (
                                    courses.map((course, index) => (
                                        <tr key={course.id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{course.courseName}</td>
                                            <td className="text-center">{course.courseType}</td>
                                            <td className="text-center">{course.courseDuration}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => handleEdit(course)}
                                                    >
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm ms-2"
                                                        onClick={() => handleDelete(course._id)}
                                                    >
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No courses available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Courses;
