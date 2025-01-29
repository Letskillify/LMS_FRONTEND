import { Formik, Field, Form } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
import { MainContext } from '../../Controller/MainProvider';

function ClassGroup() {
    const [courseGroups, setCourseGroups] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null); // State to track the group being edited
    const { userId } = useContext(MainContext);

    useEffect(() => {
        fetchCourseGroups(); // Fetch course groups on component mount
    }, []);

    const fetchCourseGroups = async () => {
        try {
            const response = await axios.get('/api/course-group/get');
            setCourseGroups(response.data);
        } catch (error) {
            console.error('Error fetching Course Groups:', error);
        }
    };

    const handleGroup = async (values, { resetForm }) => {
        try {
            const response = await axios.post('/api/course-group/post', values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                toast.success("Section added successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                setCourseGroups([...courseGroups, response.data]);
                resetForm();
                fetchCourseGroups();
            }
        } catch (error) {
            console.error('Error submitting Section:', error);
            toast.error(error.response?.data?.message || "Error adding section", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    const handleEditSubmit = async (values) => {
        try {
            const response = await axios.put(`/api/course-group/update/${editingGroup._id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                toast.success("Section updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                setEditingGroup(null);
                fetchCourseGroups();
            }
        } catch (error) {
            console.error('Error updating Section:', error);
            toast.error(error.response?.data?.message || "Error updating section", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/course-group/delete/${id}`);
            if (response.status === 200) {
                toast.success("Section deleted successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                setCourseGroups(courseGroups.filter((group) => group._id !== id));
            }
        } catch (error) {
            console.error('Error deleting Section:', error);
            toast.error(error.response?.data?.message || "Error deleting section", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                {/* Create Course Group */}
                <div className="mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Course Group</h5>
                            <Formik
                                initialValues={{
                                    courseGroupName: '',
                                    includedInCourseGroup: '',
                                    description: '',
                                    instituteId: userId
                                }}
                                onSubmit={handleGroup}
                            >
                                {() => (
                                    <Form className="row g-3">
                                        <div className="col-12 col-md-6 mb-3">
                                            <label  className="form-label">Course Group Name</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="courseGroupName"
                                                name="courseGroupName"
                                                placeholder="Enter course group name"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <label  className="form-label">Included Courses</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="includedInCourseGroup"
                                                name="includedInCourseGroup"
                                                placeholder="Enter courses (comma separated)"
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label  className="form-label">Description</label>
                                            <Field
                                                as="textarea"
                                                className="form-control"
                                                id="description"
                                                name="description"
                                                rows="3"
                                                placeholder="Enter description"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

                {/* List Course Groups */}
                <div className="mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">List of Course Groups</h5>
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Included Courses</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseGroups.length > 0 ? (
                                        courseGroups.map((group, index) => (
                                            <tr key={group._id}>
                                                <td>{index + 1}</td>
                                                <td>{group.courseGroupName}</td>
                                                <td>{group.includedInCourseGroup}</td>
                                                <td>{group.description}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm me-2"
                                                        onClick={() => setEditingGroup(group)}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#editCourseGroupModal"
                                                    >
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm "
                                                        onClick={() => handleDelete(group._id)}
                                                    >
                                                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Edit Course Group Modal */}
                {editingGroup &&  (
                    <div
                        className="modal fade"
                        id="editCourseGroupModal"
                        tabIndex="-1"
                        aria-labelledby="editCourseGroupModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Course Group</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        courseGroupName: editingGroup.courseGroupName,
                                        includedInCourseGroup: editingGroup.includedInCourseGroup,
                                        description: editingGroup.description,
                                        instituteId: userId,
                                    }}
                                    onSubmit={handleEditSubmit}
                                >
                                    {() => (
                                        <Form className="modal-body">
                                            <div className="mb-3">
                                                <label  className="form-label">Course Group Name</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="courseGroupName"
                                                    name="courseGroupName"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label  className="form-label">Included Courses</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="includedInCourseGroup"
                                                    name="includedInCourseGroup"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label  className="form-label">Description</label>
                                                <Field
                                                    as="textarea"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    rows="3"
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
                )}
            </div>
        </div>
    );
}

export default ClassGroup;
