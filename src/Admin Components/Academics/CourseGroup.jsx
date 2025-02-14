import { Formik, Field, Form } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
import { MainContext } from '../../Controller/MainProvider';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import { useCreateCourseGroupMutation, useDeleteCourseGroupMutation, useUpdateCourseGroupMutation } from '../../Redux/Api/academicsApi/courseGroupSlilce';
import useGlobalToast from '../../GlobalComponents/GlobalToast';

function CourseGroup() {
    const showToast = useGlobalToast();
    const [courseGroups, setCourseGroups] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);
    console.log("editingGroup", editingGroup);
    const { userId, InstituteId, CourseGroup } = getCommonCredentials();

    const [createCourseGroup] = useCreateCourseGroupMutation();
    const [updateCourseGroup] = useUpdateCourseGroupMutation();
    const [deleteCourseGroup] = useDeleteCourseGroupMutation();

    useEffect(() => {
        setCourseGroups(CourseGroup);
    }, [CourseGroup]);

    const handleGroup = async (values, { resetForm }) => {
        try {
            const response = await createCourseGroup(values);
            if (response.data.status === 201) {
                showToast("CourseGroup Created Successfully", "success");
                resetForm();
            }
        } catch (error) {
            console.error('Error submitting CourseGroup:', error);
            showToast("Error submitting CourseGroup", "error");
        }
    };

    const handleEditSubmit = async (values) => {
        try {
            const response = await updateCourseGroup({ courseGroupId: editingGroup._id, courseGroupData: values });
            if (response.data.status === 200) {
                showToast("CourseGroup Updated Successfully", "success");
                setEditingGroup(null);
            }
        } catch (error) {
            console.error('Error updating CourseGroup:', error);
            showToast("Error updating CourseGroup", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteCourseGroup(id);
            if (response.data.status === 200) {
                showToast("CourseGroup Deleted Successfully", "success");
            }
        } catch (error) {
            console.error('Error deleting CourseGroup:', error);
            showToast("Error deleting CourseGroup", "error");
        }
    };

    return (
        <div className="px-4 py-5">
            <div className="row">
                {/* Create Course Group */}
                <div className="mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-5">Course Group</h5>
                            <Formik
                                initialValues={{
                                    courseGroupName: '',
                                    description: '',
                                    instituteId: InstituteId
                                }}
                                onSubmit={handleGroup}
                            >
                                {() => (
                                    <Form className="row g-3">
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="form-label">Course Group Name</label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="courseGroupName"
                                                name="courseGroupName"
                                                placeholder="Enter course group name"
                                            />
                                        </div>
                                        <div className="col-md-6 col-12 mb-3">
                                            <label className="form-label">Description</label>
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
                            <h5 className="card-title mb-4">List of Course Groups</h5>
                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseGroups?.length > 0 ? (
                                        courseGroups?.map((group, index) => (
                                            <tr key={group._id}>
                                                <td>{index + 1}</td>
                                                <td>{group.courseGroupName}</td>
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
                {editingGroup && (
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
                                        instituteId: editingGroup.instituteId,
                                    }}
                                    onSubmit={handleEditSubmit}
                                >
                                    {() => (
                                        <Form className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Course Group Name</label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="courseGroupName"
                                                    name="courseGroupName"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Description</label>
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

export default CourseGroup;
