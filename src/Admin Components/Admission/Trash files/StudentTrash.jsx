import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../../Controller/MainProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { DeleteApi, getApi, HitApi, PostApi } from '../../../Custom Hooks/CustomeHook';

const StudentTrash = () => {
    const { StudentTrash, fetchTrashData, fetchStudentData, } = useContext(MainContext);
    const Navigate = useNavigate();

    const handleRenewAll = async () => {
        await HitApi('/api/student/revive-all', 'All students renewed successfully');
        fetchStudentData();
        fetchTrashData();
        Navigate('/admit-students');
    };

    const handlePermanentDeleteAll = async () => {
        await DeleteApi('/api/student/permanent-delete-all', 'All students Deleted successfully');
        fetchTrashData();
    };

    const handleRenew = async (id) => {
        await PostApi(`/api/student/revive/${id}`, 'Student renewed successfully');
        fetchStudentData();
        fetchTrashData();
        Navigate('/admit-students');
    };
    return (
        <>
            <div className="card m-4">
                <div className="d-flex justify-content-between text-center">
                    <h5 className="card-header">Students Trash</h5>
                    <div>
                        <Link className="btn btn-danger m-3" onClick={handlePermanentDeleteAll}>
                            Permanenet Delete All
                        </Link>
                        <Link className="btn btn-success m-3" onClick={handleRenewAll}>
                            Restore All
                        </Link>
                    </div>
                </div>
                <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Roll ID</th>
                                <th>profile</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Parents Name</th>
                                <th>Parents Number</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Restore</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {StudentTrash?.map((student) => (
                                <tr key={student?.StuID}>
                                    <td>{student?.StuID}</td>
                                    <td>
                                        <span className="d-flex align-items-center fw-bold">
                                            <span className="me-2">
                                                <img
                                                    src={student?.personalDetails?.profilePhoto}
                                                    alt="Avatar"
                                                    className="rounded-circle border border-light"
                                                    style={{ height: "50px", width: "50px" }}
                                                    onError={(e) => { e.target.src = "/image/defaultImg.png"; }}
                                                />
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        {student?.personalDetails?.firstName} {student?.personalDetails?.lastName}
                                    </td>
                                    <td>
                                        {
                                            student?.personalDetails?.dateOfBirth
                                                ? new Date(student.personalDetails.dateOfBirth).toISOString().split("T")[0]
                                                : ""}
                                    </td>
                                    <td>
                                        {student?.parentDetails.Father?.name}
                                    </td>
                                    <td>
                                        {student?.parentDetails?.Father?.contactNumber}
                                    </td>
                                    <td>
                                        {student?.personalDetails?.gender}
                                    </td>
                                    <td>
                                        {student?.contactInfo?.email}
                                    </td>
                                    <td>Accepted</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-icon rounded-pill me-1"
                                            onClick={() => handleRenew(student?._id)}
                                        >
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="8">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination my-2">
                                            <li className="page-item prev">
                                                <a className="page-link" href="javascript:void(0);">
                                                    <i className="tf-icon bx bx-chevrons-left"></i>
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="javascript:void(0);">
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="javascript:void(0);">
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item next">
                                                <a className="page-link" href="javascript:void(0);">
                                                    <i className="tf-icon bx bx-chevrons-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
};

export default StudentTrash;
