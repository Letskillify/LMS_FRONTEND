import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const ClassHomeWork = () => {
    const [allData, setAllData] = useState([]);
    const [editingHomework, setEditingHomework] = useState(null);
    const [courseImport, setcourseImport] = useState([]);
    const [subjectImport, setSubjectImport] = useState([]);


    const formatDateForInput = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        axios.get("http://localhost:5500/api/courses/get")
            .then(response => setcourseImport(response.data))
            .catch(error => console.error("Failed to fetch courses:", error));
    }, [])
    // console.log(courseImport);



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

    const handleSubmitHomework = async (values, { resetForm }) => {
        try {
            const response = await axios.post('http://localhost:5500/api/homework/post', values);
            setAllData((prevData) => [...prevData, response.data]);
            resetForm();

            const addModal = document.getElementById('add_home_work');
            const modal = bootstrap.Modal.getInstance(addModal);
            modal.hide();
        } catch (error) {
            console.error('Error adding homework:', error.response?.data || error.message);
        }
    };

    const handleEditClick = (homework) => {
        setEditingHomework({
            ...homework,
            dueDate: formatDateForInput(homework.dueDate),
        });

        const editModal = new bootstrap.Modal(document.getElementById('edit_homework_modal'));
        editModal.show();
    };

    const handleUpdateHomework = async (values, { resetForm }) => {
        try {
            const response = await axios.put(`http://localhost:5500/api/homework/update/${values._id}`, values);

            const updatedHomework = response.data;
            console.log("Updated Homework:", updatedHomework);

            const fetchHomework = async () => {
                try {
                    const homeworkResponse = await axios.get('http://localhost:5500/api/homework/get');
                    setAllData(homeworkResponse.data);
                } catch (error) {
                    console.error('Error fetching updated homework:', error.response?.data || error.message);
                }
            };

            fetchHomework();

            resetForm();
            setEditingHomework(null);
            const editModal = document.getElementById('edit_homework_modal');
            const modal = bootstrap.Modal.getInstance(editModal);
            modal.hide();
        } catch (error) {
            console.error('Error updating homework:', error.response?.data || error.message);
        }
    };



    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        subject: Yup.string().required('Subject is required'),
        assignedTo: Yup.object().shape({
            class: Yup.string().required('Class is required'),
            section: Yup.string().required('Section is required'),
        }),
        dueDate: Yup.date().required('Due Date is required'),
        submittedBy: Yup.object().shape({
            submissionDate: Yup.date(),
            fileUrl: Yup.string()
                .url('Invalid URL format')
                .matches(/\.(pdf|docx?)$/, 'File must be a PDF or DOC/DOCX')
                .nullable(),

            grade: Yup.string(),
            feedback: Yup.string(),

        }),

    });

    return (
        <div className="page-wrapper container pt-5">
            <div className="content">
                <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                    <div className="my-auto mb-2">
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
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_home_work">
                            <i className="ti ti-square-rounded-plus-filled me-2" /> Add Home Work
                        </button>
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
                                                className="btn btn-warning mx-2"
                                                onClick={() => handleEditClick(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => handleDeleteOne(item?._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade pt-5" id="add_home_work" tabIndex="-1" aria-labelledby="addHomeworkModal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addHomeworkModal">Add Homework</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{
                                    title: '',
                                    description: '',
                                    subject: '',
                                    assignedTo: { class: '', section: '' },
                                    dueDate: '',
                                    attachments: [],
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmitHomework}
                            >
                                {({ values, errors, touched, setFieldValue, handleChange }) => (
                                    <Form>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="class" className="form-label">Class</label>
                                                <Field
                                                    as="select"
                                                    name="assignedTo.class"
                                                    className="form-control"
                                                    value={values.courseId}
                                                    onChange={(e) => {
                                                        const selectedCourse = courseImport?.find(course => course._id === e.target.value);
                                                        setSubjectImport(selectedCourse?.courseSubjects || []);
                                                        handleChange(e);
                                                    }}
                                                >
                                                    <option value="">Select Class</option>
                                                    {courseImport.map((course) => (
                                                        <option key={course._id} value={course._id}>
                                                            {course.courseName}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {errors.assignedTo?.class && touched.assignedTo?.class && (
                                                    <div className="text-danger">{errors.assignedTo.class}</div>
                                                )}
                                            </div>


                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="section" className="form-label">Section</label>
                                                <Field name="assignedTo.section" className="form-control" />
                                                {errors.assignedTo?.section && touched.assignedTo?.section && (
                                                    <div className="text-danger">{errors.assignedTo.section}</div>
                                                )}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="subject" className="form-label">Subject</label>
                                                <Field
                                                    as="select"
                                                    name="subject"
                                                    className="form-control"
                                                    value={values.subject}
                                                   
                                                >
                                                    <option value="">Select Subject</option>
                                                    {subjectImport.map((subject) => (
                                                        <option key={subject._id} value={subject._id}>
                                                            {subject.subjectName}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {errors.subject && touched.subject && <div className="text-danger">{errors.subject}</div>}
                                            </div>


                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="title" className="form-label">Title</label>
                                                <Field name="title" className="form-control" />
                                                {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <Field as="textarea" name="description" className="form-control" />
                                                {errors.description && touched.description && <div className="text-danger">{errors.description}</div>}
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="dueDate" className="form-label">Due Date</label>
                                                <Field name="dueDate" type="date" className="form-control" />
                                                {errors.dueDate && touched.dueDate && <div className="text-danger">{errors.dueDate}</div>}
                                            </div>


                                            <div className="mb-3 col-md-12">
                                                <label htmlFor="attachments" className="form-label">Attachments</label>
                                                {values.attachments.map((attachment, index) => (
                                                    <div key={index} className="d-flex align-items-center mb-2">
                                                        <Field
                                                            name={`attachments.${index}.fileName`}
                                                            placeholder="File Name"
                                                            className="form-control me-2"
                                                        />
                                                        <Field
                                                            name={`attachments.${index}.fileUrl`}
                                                            placeholder="File URL"
                                                            className="form-control me-2"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                const updatedAttachments = [...values.attachments];
                                                                updatedAttachments.splice(index, 1);
                                                                setFieldValue('attachments', updatedAttachments);
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}

                                                <input
                                                    type="file"
                                                    className="form-control mt-3"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const newAttachment = { fileName: file.name, fileUrl: URL.createObjectURL(file) };
                                                            setFieldValue('attachments', [...values.attachments, newAttachment]);
                                                        }
                                                    }}
                                                />

                                                {errors.attachments && (
                                                    <div className="text-danger">{errors.attachments}</div>
                                                )}
                                            </div>


                                        </div>
                                        <button type="submit" className="btn btn-primary mx-2">Submit</button>
                                        <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade mt-5 pt-5" id="edit_homework_modal" tabIndex="-1" aria-labelledby="editHomeworkModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editHomeworkModal">Edit Homework</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {editingHomework && (
                                <Formik
                                    enableReinitialize
                                    initialValues={editingHomework}
                                    validationSchema={validationSchema}
                                    onSubmit={handleUpdateHomework}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className="row">
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="class" className="form-label">Class</label>
                                                    <Field name="assignedTo.class" className="form-control" />
                                                    {errors.assignedTo?.class && touched.assignedTo?.class && (
                                                        <div className="text-danger">{errors.assignedTo.class}</div>
                                                    )}
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="section" className="form-label">Section</label>
                                                    <Field name="assignedTo.section" className="form-control" />
                                                    {errors.assignedTo?.section && touched.assignedTo?.section && (
                                                        <div className="text-danger">{errors.assignedTo.section}</div>
                                                    )}
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="subject" className="form-label">Subject</label>
                                                    <Field name="subject" className="form-control" />
                                                    {errors.subject && touched.subject && <div className="text-danger">{errors.subject}</div>}
                                                </div>

                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                    <Field name="title" className="form-control" />
                                                    {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <Field as="textarea" name="description" className="form-control" />
                                                    {errors.description && touched.description && <div className="text-danger">{errors.description}</div>}
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                                    <Field name="dueDate" type="date" className="form-control" />
                                                    {errors.dueDate && touched.dueDate && (
                                                        <div className="text-danger">{errors.dueDate}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-success mx-2">Update</button>
                                            <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClassHomeWork;
