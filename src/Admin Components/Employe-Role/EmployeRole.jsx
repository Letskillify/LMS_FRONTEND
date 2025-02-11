import React, { useContext, useEffect, useState } from 'react';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';

function EmployeRole() {
    const { userId } = getCommonCredentials();
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState({});
    const [popup, setPopup] = useState(false);


    const handleRole = async () => {
        try {
            const response = await axios.get(`/api/define-role/get`);
            setRoles(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRoleChange = async (values) => {
        try {
            const response = await axios.post(`/api/define-role/post`, values, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 201) {
                alert('Data Sent Successfully');
                handleRole();
            }
        } catch (error) {
            console.error(error);
        }
}

    const handleRoleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/define-role/delete/${id}`);
            if (response.status === 200) {
                setRoles(roles.filter(role => role._id !== id));
                handleRole();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleRoleEdit = async (values) => {
        try {
            const response = await axios.put(`/api/define-role/update/${selectedRole._id}`, values);
            if (response.status === 200) {
                const newRoles = roles.map(role => {
                    if (role._id === selectedRole._id) {
                        return { ...role, ...values };
                    }
                    return role;
                });
                setRoles(newRoles);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        handleRole();
    }, [])
    return (
        <div className="px-4 py-5">
            <div className="row">
                {/* Create Medium Section */}
                <div className="col-md-4 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Employe Role</h5>
                            <Formik
                                initialValues={{
                                    RoleName: '',
                                    instituteId: userId,
                                }}
                                onSubmit={handleRoleChange}
                            >
                                {({ }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="RoleName"
                                                id="RoleName"
                                                className="form-control"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

                {/* List Medium Section */}
                <div className="col-md-8 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title">List Medium</h5>
                                <div>
                                    <a href="#" className="text-primary me-3">
                                        All
                                    </a>
                                    <a href="#" className="text-primary">
                                        Trashed
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mb-3">
                                <div>
                                    <button className="btn btn-secondary btn-sm me-2">
                                        <i className="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                    <button className="btn btn-secondary btn-sm me-2">
                                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                                    </button>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fa fa-download" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control ms-4 form-control-sm"
                                        placeholder="Search"
                                        style={{ width: '200px' }}
                                    />
                                </div>
                            </div>
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col-4">No.</th>
                                        <th scope="col-4">Name</th>
                                        <th scope="col-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((item, index) => (
                                        <tr key={item._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td className='text-capitalize'>{item.RoleName}</td>
                                            <td>
                                                <button className="btn btn-edit btn-primary me-2" onClick={() => {
                                                    setPopup(true);
                                                    setSelectedRole(item);
                                                }}>
                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </button>
                                                <button className="btn btn-delete btn-danger" onClick={() => handleRoleDelete(item._id)}>
                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
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

            {popup && selectedRole && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Role</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setPopup(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={{
                                        RoleName: selectedRole.RoleName || "",
                                    }}
                                    onSubmit={handleRoleEdit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <Field
                                                    type="text"
                                                    name="RoleName"
                                                    className="form-control"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">
                                                Update
                                            </button>
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
}
export default EmployeRole
