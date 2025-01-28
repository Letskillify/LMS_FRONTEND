import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { getApi, PostApi } from '../../Custom Hooks/CustomeHook';
import { Link } from 'react-router-dom';

const AddSections = () => {
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        getApi("/api/courses/get").then((data) => setCourses(data));
        getApi("/api/section/get").then((data) => setSections(data));
    }, []);

    const handleSubmit = (values) => {
        PostApi("/api/section/post", "Section added successfully", values);
    };
    console.log(courses);
    
    return (
        <>
            <div className='page-wrapper'>
                <div className="card m-4">
                    <div className="card-header bg-themprimary text-white mb-4">
                        <h5 className="mb-0 text-white fw-bold">Add Sections</h5>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                sectionName: '',
                                courseId: '',
                            }}
                            // validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, errors, touched, setFieldValue, handleChange }) => (
                                <Form>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="sectionName" className="form-label">Section</label>
                                            <Field as="select" name="sectionName" className="form-control">
                                                <option value="">Select Section</option>
                                                <option value="Section A">Section A</option>
                                                <option value="Section B">Section B</option>
                                                <option value="Section C">Section C</option>
                                                <option value="Section D">Section D</option>
                                                <option value="Section E">Section E</option>
                                                <option value="Section F">Section F</option>
                                                <option value="Section G">Section G</option>
                                                <option value="Section H">Section H</option>
                                                <option value="Section I">Section I</option>
                                                <option value="Section J">Section J</option>
                                            </Field>
                                            {errors.sectionName && touched.sectionName && <div className="text-danger">{errors.sectionName}</div>}
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="courseId" className="form-label">Course</label>
                                            <Field as="select" name="courseId" className="form-control">
                                                <option value="">Select Course</option>
                                                {courses.map(course => (
                                                    <option key={course._id} value={course._id}>{course.courseName}</option>
                                                ))}
                                            </Field>
                                            {errors.courseId && touched.courseId && <div className="text-danger">{errors.courseId}</div>}
                                        </div>

                                    </div>
                                    <button type="submit" className="btn btn-primary mx-2">Submit</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="card m-4">
                    <div className="d-flex justify-content-between text-center">
                        <h5 className="card-header">Sections Information</h5>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {sections?.map((section) => (
                                    <tr key={section._id}>
                                        <td><Link>{section?._id}</Link></td>
                                        {/* <td>
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
                                            {student?.personalDetails?.dateOfBirth
                                                ? new Date(student.personalDetails.dateOfBirth).toISOString().split("T")[0]
                                                : ""
                                            }
                                        </td>
                                        <td>
                                            {
                                                student?.parentDetails.Father?.name
                                            }
                                        </td>
                                        <td>
                                            {
                                                student?.parentDetails?.Father?.contactNumber
                                            }
                                        </td>
                                        <td>
                                            {
                                                student?.personalDetails?.gender
                                            }
                                        </td>
                                        <td>
                                            {
                                                student?.contactInfo?.email
                                            }
                                        </td>
                                        <td className='text-center'>Active</td>
                                        <td>
                                            {
                                                <button
                                                    className="btn btn-success btn-icon rounded-pill me-1"
                                                >
                                                    <i className="bx bx-edit"></i>
                                                </button>
                                            }
                                            <Link
                                                className="btn btn-danger btn-icon rounded-pill"
                                            >
                                                <i className="bx bx-trash"></i>
                                            </Link>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSections
