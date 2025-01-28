import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MainContext } from "../../Controller/MainProvider";

const CreateShift = () => {
    const [shifts, setShifts] = useState([]);
    const { userId } = useContext(MainContext); // Get userId from context
    const [error, setError] = useState(null); // State for error messages
    const [showModal, setShowModal] = useState(false); // Modal state
    const [editingShift, setEditingShift] = useState(null); // State to track the shift being edited

    useEffect(() => {
        if (!userId) {
            setError("Institute ID is missing. Please make sure you are logged in.");
        }
    }, [shifts, userId]);

    const initialValues = {
        instituteId: userId || "", // Fallback to empty string if userId is undefined
        shiftName: editingShift ? editingShift.shiftName : "",
        shiftStatus: editingShift ? editingShift.shiftStatus : "Active", // Default to Active
        shiftStartTime: editingShift ? editingShift.shiftStartTime : "",
        shiftEndTime: editingShift ? editingShift.shiftEndTime : "",
    };

    const validationSchema = Yup.object({
        shiftName: Yup.string().required("Shift Name is required"),
        shiftStartTime: Yup.string().required("Start Time is required"),
        shiftEndTime: Yup.string().required("End Time is required"),
    });

    const fetchShifts = async () => {
        try {
            const response = await axios.get("/api/shift/get");
            setShifts(response.data);
        } catch (error) {
            console.error("Error fetching shifts:", error);
            alert("Failed to load shifts.");
        }
    };

    useEffect(() => {
        if (userId) {
            fetchShifts();
        }
    }, [shifts, userId]);

    const isShiftNameTaken = (name) => {
        return shifts.some((shift) => shift.shiftName.toLowerCase() === name.toLowerCase());
    };

    const onSubmit = async (values, { resetForm }) => {
        if (isShiftNameTaken(values.shiftName)) {
            setError("Shift already exists. Please try a different name.");
            return;
        }

        try {
            if (editingShift) {
                const response = await axios.put(`/api/shift/update/${editingShift._id}`, values);
                setShifts((prevShifts) =>
                    prevShifts.map((shift) =>
                        shift._id === editingShift._id ? response.data : shift
                    )
                );
                alert("Shift updated successfully!");
            } else {
                const response = await axios.post("/api/shift/post", values);
                setShifts((prevShifts) => [...prevShifts, response.data]);
                alert("Shift created successfully!");
            }

            resetForm();
            setError(null);
            setShowModal(false);
        } catch (error) {
            console.error("Error creating/updating shift:", error);
            alert("Failed to create/update shift. Please try again.");
        }
    };

    const handleDelete = async (shiftId) => {
        try {
            await axios.delete(`/api/shift/delete/${shiftId}`);
            setShifts((prevShifts) =>
                prevShifts.filter((shift) => shift._id !== shiftId)
            );
            alert("Shift deleted successfully!");
        } catch (error) {
            console.error("Error deleting shift:", error);
            alert("Failed to delete shift. Please try again.");
        }
    };

    const handleEdit = (shift) => {
        setEditingShift(shift);
        setShowModal(true);
    };

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
                                                        className="btn btn-success"
                                                        onClick={() => handleEdit(shift)}
                                                    >
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(shift._id)}
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
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
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
