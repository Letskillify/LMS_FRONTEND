// import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const AdminHomeWork = () => {
    const [allData, setAllData] = useState([]);

    const [viewing, setViewing] = useState(null);


    useEffect(() => {
        const fetchHomework = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/homework/get');
                setAllData(response.data);
            } catch (error) {
                console.error('Error fetching homework:', error.response?.data || error.message);
            }
        };
        fetchHomework();
    }, []);

    const handleView = (homework) => {
        setViewing(homework);
        const viewModal = new bootstrap.Modal(document.getElementById('view_homework_modal'));
        viewModal.show();
    };
    const handleDeleteOne = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/homework/add-trash/${id}`);
            if (response.status === 200) {
                setAllData((prevClasses) => prevClasses.filter((item) => item._id !== id));
            } else {
                console.error("Failed to delete homework:", response.data);
            }
        } catch (error) {
            console.error("Error deleting homework:", error.response?.data || error.message);
        }
    };

    return (
        <div className="page-wrapper container mt-5">
            <div className="content">
                <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                    <div className="my-auto mb-2 ms-3">
                        <h3 className="page-title mb-1">Home Work</h3>
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <a href="index.html">Dashboard</a>
                                </li>

                                <li className="breadcrumb-item">
                                    <a href="#">Academic</a>
                                </li>
                                <li className="breadcrumb-item active">Home Work</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between">
                        <h4>Class Home Work</h4>

                    </div>

                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Subject</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.assignedTo?.class || 'N/A'}</td>
                                        <td>{item.assignedTo?.section || 'N/A'}</td>
                                        <td>{item.subject}</td>
                                        <td>{item.title}</td>
                                        <td>{new Date(item.dueDate).toLocaleDateString()}</td>


                                        <td>

                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => handleDeleteOne(item?._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-info mx-2"
                                                onClick={() => handleView(item)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    <div className="modal fade" id="view_homework_modal" tabIndex="-1" aria-labelledby="viewHomeworkModal" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content shadow-lg border-0 rounded-3">
                                <div className="modal-header border-bottom-0">
                                    <h5 className="modal-title text-primary" id="viewHomeworkModal">Homework Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {viewing && (
                                        <div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Class:</strong></div>
                                                <div className="col-md-8">{viewing.assignedTo?.class || 'N/A'}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Section:</strong></div>
                                                <div className="col-md-8">{viewing.assignedTo?.section || 'N/A'}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Subject:</strong></div>
                                                <div className="col-md-8">{viewing.subject}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Title:</strong></div>
                                                <div className="col-md-8">{viewing.title}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Description:</strong></div>
                                                <div className="col-md-8">{viewing.description}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Due Date:</strong></div>
                                                <div className="col-md-8">{new Date(viewing.dueDate).toLocaleDateString()}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4"><strong>Attachments:</strong></div>
                                                <div className="col-md-8">
                                                    {viewing.attachments && viewing.attachments.length > 0 ? (
                                                        <ul className="list-unstyled">
                                                            {viewing.attachments.map((attachment, index) => (
                                                                <li key={index} className="mb-2">
                                                                    <a
                                                                        href={attachment.fileUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        download={attachment.fileName}
                                                                        className="text-decoration-none text-primary me-2"
                                                                    >
                                                                        <i className="bi bi-paperclip"></i> {attachment.fileName}
                                                                    </a>
                                                                    <a
                                                                        href={attachment.fileUrl}
                                                                        download={attachment.fileName}
                                                                        className="btn btn-sm btn-outline-secondary"
                                                                    >
                                                                        <i className="bi bi-download"></i> Download
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-muted">No attachments</span>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer border-top-0">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    );
};

export default AdminHomeWork;
