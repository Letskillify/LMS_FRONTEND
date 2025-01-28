import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MainContext } from "../../Controller/MainProvider";

const CreateSemester = () => {
    const [semesters, setSemesters] = useState([]);
    const { userId } = useContext(MainContext); // Get userId from context
    const [error, setError] = useState(null); // State for error messages
    const [showModal, setShowModal] = useState(false); // Modal state
    const [editingSemester, setEditingSemester] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError("Institute ID is missing. Please make sure you are logged in.");
        }
    }, [semesters, userId]);

    const initialValues = {
        instituteId: userId || "", // Fallback to empty string if userId is undefined
        semesterName: editingSemester ? editingSemester.semesterName : "",
        semesterStartMonth: editingSemester ? editingSemester.semesterStartMonth : "",
        semesterEndMonth: editingSemester ? editingSemester.semesterEndMonth : "",
    };

    const validationSchema = Yup.object({
        semesterName: Yup.string().required("Semester Name is required"),
        semesterStartMonth: Yup.string().required("Start Month is required"),
        semesterEndMonth: Yup.string().required("End Month is required"),
    });

    const fetchSemesters = async () => {
        try {
            const response = await axios.get("/api/semester/get");
            setSemesters(response.data);
        } catch (error) {
            console.error("Error fetching semesters:", error);
            alert("Failed to load semesters.");
        }
    };

    useEffect(() => {
        if (userId) {
            fetchSemesters();
        }
    }, [semesters, userId]);

    const isSemesterNameTaken = (name) => {
        return semesters.some((semester) => semester.semesterName.toLowerCase() === name.toLowerCase());
    };

    const onSubmit = async (values, { resetForm }) => {
        if (isSemesterNameTaken(values.semesterName)) {
            setError("Semester already exists. Please try a different name.");
            return;
        }

        try {
            if (editingSemester) {
                const response = await axios.put(`/api/semester/update/${editingSemester._id}`, values);
                setSemesters((prevSemesters) =>
                    prevSemesters.map((semester) =>
                        semester._id === editingSemester._id ? response.data : semester
                    )
                );
                alert("Semester updated successfully!");
            } else {
                const response = await axios.post("/api/semester/post", values);
                setSemesters((prevSemesters) => [...prevSemesters, response.data]);
                alert("Semester created successfully!");
            }

            resetForm();
            setError(null);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating/updating semester:", error);
            alert("Failed to create/update semester. Please try again.");
        }
    };

    const handleDelete = async (semesterId) => {
        try {
            await axios.delete(`/api/semester/delete/${semesterId}`);
            setSemesters((prevSemesters) =>
                prevSemesters.filter((semester) => semester._id !== semesterId)
            );
            alert("Semester deleted successfully!");
        } catch (error) {
            console.error("Error deleting semester:", error);
            alert("Failed to delete semester. Please try again.");
        }
    };

    const handleEdit = (semester) => {
        setEditingSemester(semester);
        setShowModal(true);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="card-title mb-0 text-uppercase fw-bold">Semesters</h3>
                    <button className="btn btn-primary text-uppercase fw-bold" onClick={() => setShowModal(true)}>
                        Create Semester
                    </button>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Semester Name</th>
                                    <th>Start Month</th>
                                    <th>End Month</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesters.length > 0 ? (
                                    semesters.map((semester, index) => (
                                        <tr key={semester._id}>
                                            <td>{index + 1}</td>
                                            <td>{semester.semesterName}</td>
                                            <td>{semester.semesterStartMonth}</td>
                                            <td>{semester.semesterEndMonth}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => handleEdit(semester)}
                                                    >
                                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(semester._id)}
                                                    >
                                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            <div className="alert alert-info" role="alert">
                                                No semesters found.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
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
                            <div className="modal-header bg-gradient-to-r from-primary to-secondary text-white">
                                <h3 className="modal-title fw-bold text-uppercase">
                                    {editingSemester ? "Edit Semester" : "Create Semester"}
                                </h3>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body px-4 py-3">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="row">
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="semesterName" className="form-label">
                                                        Semester Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="semesterName"
                                                        name="semesterName"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name="semesterName"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="semesterStartMonth" className="form-label">
                                                        Semester Start Month
                                                    </label>
                                                    <Field
                                                        type="month"
                                                        id="semesterStartMonth"
                                                        name="semesterStartMonth"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name="semesterStartMonth"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="semesterEndMonth" className="form-label">
                                                        Semester End Month
                                                    </label>
                                                    <Field
                                                        type="month"
                                                        id="semesterEndMonth"
                                                        name="semesterEndMonth"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name="semesterEndMonth"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary text-uppercase fw-bold"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success w-50 text-uppercase fw-bold"
                                                >
                                                    {editingSemester ? "Update Semester" : "Create Semester"}
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
        </div>
    );
};

export default CreateSemester;
