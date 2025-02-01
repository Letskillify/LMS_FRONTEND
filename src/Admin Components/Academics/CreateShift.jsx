import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MainContext } from "../../Controller/MainProvider";
import { Bounce, toast } from "react-toastify";

const CreateShift = () => {
    const [shifts, setShifts] = useState([]);
    const { userId } = useContext(MainContext); // Get userId from context
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [editingShift, setEditingShift] = useState(null);
    const [Edit, setEdit] = useState(false);
    const [SelectEdit, setSelectEdit] = useState(null);

    const validation = Yup.object({
        shiftName: Yup.string().required("Shift Name is required"),
        shiftStatus: Yup.string()
            .oneOf(["Active", "Inactive"], "Invalid shift status")
            .required("Shift Status is required"),
        shiftStartTime: Yup.string().matches(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Invalid time format (HH:mm)"
        ).required("Shift Start Time is required"),
        shiftEndTime: Yup.string().matches(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Invalid time format (HH:mm)"
        ).required("Shift End Time is required"),
        instituteId: Yup.string().required("Institute ID is required"),
    })

    const fetchShift = async () => {
        try {
            const response = await axios.get("/api/shift/get");
            setShifts(response.data);
        }
        catch (error) {
            console.error("Error fetching shift:", error);
        }
    };
    const handleShifts = async (values, { resetForm }) => {
        console.log(values);

        try {
            const response = await axios.post("/api/shift/post", values, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 201) {
                toast.success("Shift created successfully", {
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
                fetchShift();
            }
        } catch (error) {
            console.error("Error sumbitting form:", error);
            toast.error(error.response.data.message || "Error creating shift", {
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

    const handleShfitDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/shift/delete/${id}`);
            if (response.status === 201) {
                toast.success("shift deleted successfully", {
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
                setShifts(shifts.filter((item => item._id !== id)));
                fetchShift();
            }
        } catch (error) {
            console.error("Error deleting Shift:", error);
            toast.error(error.response.data.message || "Error deleting shift", {
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

    const handleShfitEdit = async (values, id) => {
        try {
            const response = await axios.put(`/api/shift/update/${id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) {
                toast.success("shift updated successfully", {
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
                setShowModal(false);
                fetchShift();
            }
        }
        catch (error) {
            console.error("Error updating shift:", error);
            toast.error(error.response.data.message || "Error updating shift", {
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
        fetchShift();
    }, []);
    return (
        <div className="container mt-5 mb-5">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="card-title mb-0 text-uppercase fw-bold">Shifts</h3>
                    <button className="btn btn-primary text-uppercase fw-bold" onClick={() => setShowModal(true)}>
                        Create Shift
                    </button>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Shift Name</th>
                                    <th>Status</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shifts.length > 0 ? (
                                    shifts.map((shift, index) => (
                                        <tr key={shift._id}>
                                            <td>{index + 1}</td>
                                            <td>{shift.shiftName}</td>
                                            <td>{shift.shiftStatus}</td>
                                            <td>{shift.shiftStartTime}</td>
                                            <td>{shift.shiftEndTime}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => { setEdit(true); setSelectEdit(shift) }}
                                                    >
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleShfitDelete(shift._id)}
                                                    >
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            <div className="alert alert-info" role="alert">
                                                No shifts found.
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
                                                        {editingShift ? "Edit Shift" : "Create Shift"}
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
                                                            shiftName: SelectEdit.shiftName,
                                                            shiftStatus: SelectEdit.shiftStatus,
                                                            shiftStartTime: SelectEdit.shiftStartTime,
                                                            shiftEndTime: SelectEdit.shiftEndTime,
                                                        }}
                                                        onSubmit={(values) => handleShfitEdit(values, SelectEdit._id)}
                                                    >
                                                        {() => (
                                                            <Form>
                                                                <div className="row">
                                                                    <div className="col-12 col-md-6 mb-3">
                                                                        <label htmlFor="shiftName" className="form-label">
                                                                            Shift Name
                                                                        </label>
                                                                        <Field
                                                                            type="text"
                                                                            id="shiftName"
                                                                            name="shiftName"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage
                                                                            name="shiftName"
                                                                            component="div"
                                                                            className="invalid-feedback d-block"
                                                                        />
                                                                    </div>

                                                                    <div className="col-12 col-md-6 mb-3">
                                                                        <label htmlFor="shiftStatus" className="form-label">
                                                                            Shift Status
                                                                        </label>
                                                                        <Field
                                                                            as="select"
                                                                            id="shiftStatus"
                                                                            name="shiftStatus"
                                                                            className="form-control"
                                                                        >
                                                                            <option disabled >Select</option>
                                                                            <option value="Active">Active</option>
                                                                            <option value="Inactive">Inactive</option>
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name="shiftStatus"
                                                                            component="div"
                                                                            className="invalid-feedback d-block"
                                                                        />
                                                                    </div>

                                                                    <div className="col-12 col-md-6 mb-3">
                                                                        <label htmlFor="shiftStartTime" className="form-label">
                                                                            Shift Start Time
                                                                        </label>
                                                                        <Field
                                                                            type="time"
                                                                            id="shiftStartTime"
                                                                            name="shiftStartTime"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage
                                                                            name="shiftStartTime"
                                                                            component="div"
                                                                            className="invalid-feedback d-block"
                                                                        />
                                                                    </div>

                                                                    <div className="col-12 col-md-6 mb-3">
                                                                        <label htmlFor="shiftEndTime" className="form-label">
                                                                            Shift End Time
                                                                        </label>
                                                                        <Field
                                                                            type="time"
                                                                            id="shiftEndTime"
                                                                            name="shiftEndTime"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage
                                                                            name="shiftEndTime"
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
                                                                        className="btn btn-success w-25 text-uppercase fw-bold"
                                                                    >
                                                                        {editingShift ? "Update Shift" : "Create Shift"}
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
                                    {editingShift ? "Edit Shift" : "Create Shift"}
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
                                        shiftName: "",
                                        shiftStatus: "",
                                        shiftStartTime: "",
                                        shiftEndTime: "",
                                        instituteId: userId,
                                    }}
                                    validationSchema={validation}
                                    onSubmit={handleShifts}
                                >
                                    {() => (
                                        <Form>
                                            <div className="row">
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shiftName" className="form-label">
                                                        Shift Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="shiftName"
                                                        name="shiftName"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name="shiftName"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shiftStatus" className="form-label">
                                                        Shift Status
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        id="shiftStatus"
                                                        name="shiftStatus"
                                                        className="form-control"
                                                    >
                                                        <option >Select</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="shiftStatus"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shiftStartTime" className="form-label">
                                                        Shift Start Time
                                                    </label>
                                                    <Field
                                                        type="time"
                                                        id="shiftStartTime"
                                                        name="shiftStartTime"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name="shiftStartTime"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shiftEndTime" className="form-label">
                                                        Shift End Time
                                                    </label>
                                                    <Field
                                                        type="time"
                                                        id="shiftEndTime"
                                                        name="shiftEndTime"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name="shiftEndTime"
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
                                                    className="btn btn-success w-25 text-uppercase fw-bold"
                                                >
                                                    {editingShift ? "Update Shift" : "Create Shift"}
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

export default CreateShift;
