import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MainContext } from "../../Controller/MainProvider";
import { Bounce, toast } from "react-toastify";

const CreateSemester = () => {
    const [semesters, setSemesters] = useState([]);
    const { userId } = useContext(MainContext); // Get userId from context
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [error, setError] = useState(null); // State for error message
    const [editingSemester, setEditingSemester] = useState(null);
    const [Edit, setEdit] = useState(false);
    const [SelectEdit, setSelectEdit] = useState(null);

    const fetchSemesters = async () => {
        try {
            const response = await axios.get("/api/semester/get");
            setSemesters(response.data);
        }
        catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    const handleSemesters = async (values, { resetForm }) => {
        try {
            const response = await axios.post("/api/semester/post", values, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 201) {
                toast.success("Semester created successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pouseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                resetForm();
                fetchSemesters();

            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response.data.message || "Error creating semester", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pouseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }
    const handleSemestersDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/semester/delete/${id}`);
            if (response.status === 201) {
                toast.success("Semester deleted successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pouseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setSemesters(semesters.filter((item => item._id !== id)));
                fetchSemesters();
            }
        } catch (error) {
            console.error("Error deleting semester:", error);
            toast.error(error.response.data.message || "Error deleting semester", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pouseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })
        }
    }


    const handleSemestersEdit = async (values, id) => {
        try {
            const response = await axios.put(`/api/semester/update/${id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) { 
                toast.success("Semester updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pouseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })
                setPopup(false);
                fetchSemesters();
            }
        }
        catch (error) {
            console.error("Error updating semester:", error);
            toast.error(error.response.data.message || "Error updating semester", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pouseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

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
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => {setEdit(true); setSelectEdit(semester)}}

                                                    >
                                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>

                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleSemestersDelete(semester._id)}
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

                                {Edit && (
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
                                                        onClick={() => setEdit(false)}
                                                    ></button>
                                                </div>

                                                <div className="modal-body px-4 py-3">
                                                    {error && <div className="alert alert-danger">{error}</div>}
                                                    <Formik
                                                        initialValues={{
                                                            semesterName: SelectEdit.semesterName,
                                                            semesterStartMonth: SelectEdit.semesterStartMonth,
                                                            semesterEndMonth: SelectEdit.semesterEndMonth,
                                                        }}
                                                        onSubmit={(values) => handleSemestersEdit(values, SelectEdit._id)}
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
                                    initialValues={{
                                        semesterName: "",
                                        semesterStartMonth: "",
                                        semesterEndMonth: "",
                                        instituteId: userId,
                                    }}
                                    onSubmit={handleSemesters}
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
