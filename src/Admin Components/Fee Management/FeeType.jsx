import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { toast, Bounce } from "react-toastify";

const FeeType = () => {
    const { userId } = getCommonCredentials();
    const [feeTypes, setFeeTypes] = useState([]);
    const [popup, setPopup] = useState(false);
    const [selectedFeeType, setSelectedFeeType] = useState(null);

    // ✅ Fetch Fee Types
    const fetchFeeTypes = async () => {
        try {
            const { data } = await axios.get("/api/fees-type/get");
            setFeeTypes(data);  // Auto refresh UI
        } catch (error) {
            console.error("Error fetching fee types:", error);
        }
    };

    useEffect(() => {
        fetchFeeTypes(); // Fetch data on component mount
    }, []);

    // ✅ Add Fee Type
    const handleFeeSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.post("/api/fees-type/post", values);
            if (response.status === 200) {
                toast.success("Fee Type added successfully", { theme: "colored", transition: Bounce });
                resetForm();
                fetchFeeTypes(); // Auto-refresh without reload
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error adding fee type", { theme: "colored", transition: Bounce });
        }
    };

    // ✅ Update Fee Type
    const handleEdit = async (values) => {
        if (!selectedFeeType) return;
        try {
            const response = await axios.put(`/api/fees-type/update/${selectedFeeType._id}`, values);
            if (response.status === 200) {
                toast.success("Fee Type updated successfully", { theme: "colored", transition: Bounce });
                setPopup(false);
                fetchFeeTypes(); // Auto-refresh without reload
            }
        } catch (error) {
            console.error("Error updating fee type:", error);
            toast.error("Error updating fee type", { theme: "colored", transition: Bounce });
        }
    };

    // ✅ Delete Fee Type
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/fees-type/delete/${id}`);
            if (response.status === 200) {
                toast.success("Fee Type deleted successfully", { theme: "colored", transition: Bounce });
                fetchFeeTypes(); // Auto-refresh without reload
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error deleting fee type", { theme: "colored", transition: Bounce });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Fee Type Management</h2>
            <div className="row">
                {/* ✅ Add New Fee Type */}
                <div className="col-md-5 mb-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="text-center">Add New Fee Type</h5>
                        <Formik
                            initialValues={{ feesType: "", description: "", isCompulsory: false, instituteId: userId }}
                            validationSchema={Yup.object({ feesType: Yup.string().required("Fee Type is required") })}
                            onSubmit={handleFeeSubmit}
                        >
                            <Form>
                                <div className="mb-2">
                                    <label className="form-label">Fee Type Name</label>
                                    <Field type="text" name="feesType" className="form-control" placeholder="Fee Type Name" />
                                    <ErrorMessage name="feesType" component="div" className="text-danger" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Description</label>
                                    <Field type="text" name="description" className="form-control" placeholder="Description" />
                                </div>
                                <div className="mb-2 form-check">
                                    <Field type="checkbox" name="isCompulsory" className="form-check-input" />
                                    <label className="form-check-label">Is Compulsory?</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Add Fee Type</button>
                            </Form>
                        </Formik>
                    </div>
                </div>

                {/* ✅ Fee Types List */}
                <div className="col-md-7">
                    <div className="card p-3 shadow-sm">
                        <h5 className="text-center">Fee Types List</h5>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Fee Type</th>
                                        <th>Description</th>
                                        <th>Compulsory</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeTypes.map((feeType, index) => (
                                        <tr key={feeType._id}>
                                            <td>{index + 1}</td>
                                            <td>{feeType.feesType}</td>
                                            <td>{feeType.description}</td>
                                            <td>{feeType.isCompulsory ? "Yes" : "No"}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm me-2" onClick={() => { setSelectedFeeType(feeType); setPopup(true); }}>
                                                    <i className="fa fa-pencil-square-o"></i>
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(feeType._id)}>
                                                    <i className="fa fa-trash-o"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Edit Fee Type Popup */}
            {popup && selectedFeeType && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h5>Edit Fee Type</h5>
                            <button className="close-button" onClick={() => setPopup(false)}>
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                        <Formik
                            initialValues={{
                                feesType: selectedFeeType.feesType || "",
                                description: selectedFeeType.description || "",
                                isCompulsory: selectedFeeType.isCompulsory || false,
                                instituteId: userId
                            }}
                            onSubmit={handleEdit}
                        >
                            <Form>
                                <div className="mb-2">
                                    <label className="form-label">Fee Type Name</label>
                                    <Field type="text" name="feesType" className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Description</label>
                                    <Field type="text" name="description" className="form-control" />
                                </div>
                                <div className="mb-2 form-check">
                                    <Field type="checkbox" name="isCompulsory" className="form-check-input" />
                                    <label className="form-check-label">Is Compulsory?</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Update Fee Type</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeType;
