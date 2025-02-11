import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';

const Classes = () => {
    const [showModal, setshowModal] = useState(false)
    const [Show, setShow] = useState(10)
    const [editShow, setEditShow] = useState(false)
    const [selectEdit, setSelectEdit] = useState({})
    const [search, setSearch] = useState('')
    const [addSubject, setAddSubject] = useState([{}]);
    // const {  Section, Medium, Stream, Semester, Shift, Board, Course, CourseGroup, Class, fetchClass } = useContext(MainContext)
    const { userId, Course, CourseGroup, Class } = getCommonCredentials()
    const initialValues = {
        courses: null,
        board: null,
        courseGroup: null,
        medium: null,
        section: null,
        semester: null,
        shift: null,
        stream: null,
        subject: [],
        instituteId: userId,
    };

    const handleAddForm = () => {
        setAddSubject([...addSubject, {}]);
    };
    const handleEditAddForm = () => {
        setSelectEdit([...selectEdit, subject]);
    };
    const handleRemoveForm = (index) => {
        const updatedForms = [...addSubject];
        updatedForms.splice(index, 1);
        setAddSubject(updatedForms);
    }
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("/api/class/post", values);
            if (response.status === 201) {
                toast.success("Class added successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setshowModal(false);
                // fetchClass();
            } else {
                toast.warn(response.statusText, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Error adding class:", error);
            toast.error(error.response.data.message || "Error adding class", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };
    const handleEdit = async (classes, id) => {
        console.log(classes);

        try {
            const response = await axios.put(`/api/class/update/${id}`, classes, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                toast.success("Class updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                setEditShow(false)
                // fetchClass();
            }
        } catch (error) {
            console.error('Error updating class:', error);
            toast.error(error.response?.data?.message || "Error updating class", {
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
    }

    const filteredClasses = Class?.filter(classes => {
        return (
            classes.className?.toLowerCase()?.includes(search?.toLowerCase()) ||
            classes?.medium?.mediumName?.toLowerCase()?.includes(search?.toLowerCase()) ||
            classes?.stream?.streamName?.toLowerCase()?.includes(search?.toLowerCase())
        );
    });

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/class/delete/${id}`);
            if (response.status === 200) {
                toast.success("Class deleted successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                // fetchClass();
            }
        } catch (error) {
            console.error('Error deleting class:', error);
            toast.error(error.response?.data?.message || "Error deleting class", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };


    return (
        <>
            <div>
                <div className="card m-4">
                    <div className="d-flex justify-content-between text-center align-items-center">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h5 className="card-header d-none d-sm-inline">Classes</h5>
                            <div className=" d-inline">
                                <select className="form-select" onChange={(e) => setShow(e.target.value)}>
                                    <option selected="" value={10}>10</option>
                                    <option value={20} >20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    <option value={500}>500</option>
                                    <option value={1000}>1000</option>
                                    <option value={filteredClasses?.length}>All</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="btn-group w-50 ">
                                <div className="input-group">
                                    <span className="input-group-text " id="basic-addon1"><i className="bx bx-search"></i></span>
                                    <input type="text" className="form-control w-50" placeholder="Search by Name,Medium,Stream" aria-label="Search" aria-describedby="basic-addon1" value={search} onChange={e => setSearch(e.target.value)} />
                                </div>
                            </div>
                            <p className="btn btn-success m-3" onClick={() => setshowModal(true)}>
                                <i className="tf-icons bx bx-pencil me-1" ></i>
                                <span className='d-none d-sm-inline'>Add Class</span>
                            </p>

                        </div>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Class Name</th>
                                    <th>Course</th>
                                    <th>Section</th>
                                    <th>Semester</th>
                                    <th>Medium</th>
                                    <th>Stream</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {(filteredClasses || Class)?.length > 0 ? (
                                    (filteredClasses || Class)?.slice(0, Show)?.map((classes) => (
                                        <tr key={classes._id} className="text-center" >
                                            <td>{classes?.className || '-'}</td>
                                            <td>{classes?.courses?.courseName || '-'}</td>
                                            <td>{classes?.section?.sectionName || '-'}</td>
                                            <td>{classes?.semester?.semesterName || '-'}</td>
                                            <td>{classes?.medium?.mediumName || '-'}</td>
                                            <td>{classes?.stream?.streamName || '-'}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-icon rounded-pill me-1"
                                                    onClick={() => { setEditShow(true); setSelectEdit(classes); }}
                                                >
                                                    <i className="bx bx-edit"></i>
                                                </button>
                                                <Link
                                                    className="btn btn-danger btn-icon rounded-pill"
                                                    onClick={() => handleDelete(classes?._id)}
                                                >
                                                    <i className="bx bx-trash"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No results found</td>
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
                                    Create Class
                                </h3>
                                <button
                                    type="button"
                                    className="btn-close btn-close-primary"
                                    onClick={() => setshowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body px-4 py-3">
                                {/* {error && <div className="alert alert-danger">{error}</div>} */}
                                <Formik
                                    initialValues={initialValues}
                                    // validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            <div className="row">
                                                <p className='text-center text-info mb-4'>Name is auto generated select course and all other details</p>
                                                {/* <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="className" className="form-label">
                                                        Class Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="className"
                                                        name="className"
                                                        className="form-control"
                                                        placeholder="Enter class name"
                                                    />
                                                    <ErrorMessage
                                                        name="className"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div> */}
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courses" className="form-label">
                                                        Courses
                                                    </label>
                                                    <Field as="select"
                                                        id="courses"
                                                        name="courses"
                                                        className="form-select"
                                                    >
                                                        <option value="">Select Courses</option>
                                                        {Course?.map((course) => (
                                                            <option key={course?._id} value={course?._id}>{course?.courseName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="courses"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="board" className="form-label">
                                                        Board
                                                    </label>
                                                    <Field as="select"
                                                        id="board"
                                                        name="board"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value="">Select Board</option>
                                                        {Course?.find(course => course._id === values.courses)?.board?.map((board) => (
                                                            <option key={board._id} value={board._id}>{board.boardName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="board"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseGroup" className="form-label">
                                                        Course Group
                                                    </label>
                                                    <Field as="select"
                                                        id="courseGroup"
                                                        name="courseGroup"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value={null} >Select Course Group</option>
                                                        {CourseGroup.length > 0 ? (
                                                            CourseGroup.map((group) => (
                                                                <option key={group?._id} value={group?._id ? group?._id : null}>{group?.courseGroupName}</option>
                                                            ))
                                                        ) : (
                                                            <option value="">Not Available</option>
                                                        )}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="courseGroup"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="medium" className="form-label">
                                                        Medium
                                                    </label>
                                                    <Field as="select"
                                                        id="medium"
                                                        name="medium"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value="">Select Medium</option>
                                                        {Course?.find(course => course._id === values.courses)?.medium?.map((medium) => (
                                                            <option key={medium._id} value={medium._id}>{medium.mediumName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="medium"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="section" className="form-label">
                                                        Section
                                                    </label>
                                                    <Field as="select"
                                                        id="section"
                                                        name="section"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value="">Select Section</option>
                                                        {Course?.find(course => course._id === values.courses)?.section?.map((section) => (
                                                            <option key={section._id} value={section._id}>{section.sectionName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="section"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="semester" className="form-label">
                                                        Semester
                                                    </label>
                                                    <Field as="select"
                                                        id="semester"
                                                        name="semester"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value="">Select Semester</option>
                                                        {Course?.find(course => course._id === values.courses)?.semester?.map((semester) => (
                                                            <option key={semester._id} value={semester._id}>{semester.semesterName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="semester"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shift" className="form-label">
                                                        Shift
                                                    </label>
                                                    <Field as="select"
                                                        id="shift"
                                                        name="shift"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value="">Select Shift</option>
                                                        {Course?.find(course => course._id === values.courses)?.shift?.map((shift) => (
                                                            <option key={shift._id} value={shift._id}>{shift.shiftName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="shift"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="stream" className="form-label">
                                                        Stream
                                                    </label>
                                                    <Field as="select"
                                                        id="stream"
                                                        name="stream"
                                                        className="form-select"
                                                        disabled={!values.courses}
                                                    >
                                                        <option value="">Select Stream</option>
                                                        {Course?.find(course => course._id === values.courses)?.stream?.map((stream) => (
                                                            <option key={stream._id} value={stream._id}>{stream.streamName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="stream"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                                <div class="row">
                                                    {addSubject.map((subject, index) => (
                                                        <>
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <label htmlFor="stream" className="form-label">
                                                                    Subject Name
                                                                </label>
                                                                <Field as="select"
                                                                    id="stream"
                                                                    name={`subject.${index}.name`}
                                                                    className="form-select"
                                                                    disabled={!values.courses}
                                                                >
                                                                    <option value="">Select Subject</option>
                                                                    {Course?.find(course => course._id === values.courses)?.subjects?.map((subject) => (
                                                                        <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
                                                                    ))}
                                                                </Field>
                                                                <ErrorMessage
                                                                    name="stream"
                                                                    component="div"
                                                                    className="invalid-feedback d-block"
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <label htmlFor="subject" className="form-label">
                                                                    Subject Code
                                                                </label>
                                                                <div className='d-flex'>
                                                                    <Field
                                                                        type="text"
                                                                        id="subject"
                                                                        name={`subject.${index}.code`}
                                                                        className="form-control"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm text-uppercase ms-2 px-3"
                                                                        onClick={handleAddForm}
                                                                    >
                                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger btn-sm text-uppercase ms-2 px-3"
                                                                        onClick={() => handleRemoveForm(index)}
                                                                    >
                                                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                                <ErrorMessage
                                                                    name="subject"
                                                                    component="div"
                                                                    className="invalid-feedback d-block"
                                                                />
                                                            </div>
                                                        </>
                                                    ))}
                                                    <div className='col-5 mb-4'>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary text-uppercase"
                                                    onClick={() => setshowModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success w-50 text-uppercase"
                                                >
                                                    Submit
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
            {editShow && (
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
                                    Edit Semester
                                </h3>
                                <button
                                    type="button"
                                    className="btn-close btn-close-primary"
                                    onClick={() => setEditShow(false)}
                                ></button>
                            </div>

                            <div className="modal-body px-4 py-3">
                                {/* {error && <div className="alert alert-danger">{error}</div>} */}
                                <Formik
                                    initialValues={{
                                        courses: selectEdit?.courses?._id,
                                        board: selectEdit?.board?._id,
                                        courseGroup: selectEdit?.courseGroup?._id,
                                        medium: selectEdit?.medium?._id,
                                        section: selectEdit?.section?._id,
                                        semester: selectEdit?.semester?._id,
                                        shift: selectEdit?.shift?._id,
                                        stream: selectEdit?.stream?._id,
                                        subject: selectEdit?.subject,
                                        instituteId: userId,
                                    }}
                                    // validationSchema={validationSchema}
                                    onSubmit={(value) => handleEdit(value, selectEdit._id)}
                                >
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            <div className="row">
                                                {/* <div className="col-12 col-md-6 mb-3">
                                                 <label htmlFor="className" className="form-label">
                                                     Class Name
                                                 </label>
                                                 <Field
                                                     type="text"
                                                     id="className"
                                                     name="className"
                                                     className="form-control"
                                                     placeholder="Enter class name"
                                                 />
                                                 <ErrorMessage
                                                     name="className"
                                                     component="div"
                                                     className="invalid-feedback d-block"
                                                 />
                                             </div> */}
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courses" className="form-label">
                                                        Courses
                                                    </label>
                                                    <Field as="select"
                                                        id="courses"
                                                        name="courses"
                                                        className="form-select"
                                                    >
                                                        <option value="">Select Courses</option>
                                                        {Course?.map((course) => (
                                                            <option key={course?._id} value={course?._id}>{course?.courseName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="courses"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="board" className="form-label">
                                                        Board
                                                    </label>
                                                    <Field as="select"
                                                        id="board"
                                                        name="board"
                                                        className="form-select"

                                                    >
                                                        <option value="">Select Board</option>
                                                        {Course?.find(course => course._id === values.courses)?.board?.map((board) => (
                                                            <option key={board._id} value={board._id}>{board.boardName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="board"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseGroup" className="form-label">
                                                        Course Group
                                                    </label>
                                                    <Field as="select"
                                                        id="courseGroup"
                                                        name="courseGroup"
                                                        className="form-select"

                                                    >
                                                        <option value={null} >Select Course Group</option>
                                                        {CourseGroup.length > 0 ? (
                                                            CourseGroup.map((group) => (
                                                                <option key={group?._id} value={group?._id ? group?._id : null}>{group?.courseGroupName}</option>
                                                            ))
                                                        ) : (
                                                            <option value="">Not Available</option>
                                                        )}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="courseGroup"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="medium" className="form-label">
                                                        Medium
                                                    </label>
                                                    <Field as="select"
                                                        id="medium"
                                                        name="medium"
                                                        className="form-select"

                                                    >
                                                        <option value="">Select Medium</option>
                                                        {Course?.find(course => course._id === values.courses)?.medium?.map((medium) => (
                                                            <option key={medium._id} value={medium._id}>{medium.mediumName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="medium"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="section" className="form-label">
                                                        Section
                                                    </label>
                                                    <Field as="select"
                                                        id="section"
                                                        name="section"
                                                        className="form-select"

                                                    >
                                                        <option value="">Select Section</option>
                                                        {Course?.find(course => course._id === values.courses)?.section?.map((section) => (
                                                            <option key={section._id} value={section._id}>{section.sectionName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="section"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="semester" className="form-label">
                                                        Semester
                                                    </label>
                                                    <Field as="select"
                                                        id="semester"
                                                        name="semester"
                                                        className="form-select"

                                                    >
                                                        <option value="">Select Semester</option>
                                                        {Course?.find(course => course._id === values.courses)?.semester?.map((semester) => (
                                                            <option key={semester._id} value={semester._id}>{semester.semesterName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="semester"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shift" className="form-label">
                                                        Shift
                                                    </label>
                                                    <Field as="select"
                                                        id="shift"
                                                        name="shift"
                                                        className="form-select"

                                                    >
                                                        <option value="">Select Shift</option>
                                                        {Course?.find(course => course._id === values.courses)?.shift?.map((shift) => (
                                                            <option key={shift._id} value={shift._id}>{shift.shiftName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="shift"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="stream" className="form-label">
                                                        Stream
                                                    </label>
                                                    <Field as="select"
                                                        id="stream"
                                                        name="stream"
                                                        className="form-select"

                                                    >
                                                        <option value="">Select Stream</option>
                                                        {Course?.find(course => course._id === values.courses)?.stream?.map((stream) => (
                                                            <option key={stream._id} value={stream._id}>{stream.streamName}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="stream"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                                {selectEdit.subject.map((subject, index) => (
                                                    <>
                                                        <div className="col-12 col-md-6 mb-3">
                                                            <label htmlFor="stream" className="form-label">
                                                                Subject Name
                                                            </label>
                                                            <Field as="select"
                                                                id="stream"
                                                                name={`subject.${index}.name`}
                                                                className="form-select"
                                                                value={values.subject[index]?.name?._id}
                                                                onChange={(e) => setFieldValue(`subject.${index}.name`, e.target.value)}
                                                            >
                                                                <option value="">Select Subject</option>
                                                                {Course?.find(course => course._id === values.courses)?.subjects?.map((subject) => (
                                                                    <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="stream"
                                                                component="div"
                                                                className="invalid-feedback d-block"
                                                            />
                                                        </div>
                                                        <div className="col-12 col-md-6 mb-3">
                                                            <label htmlFor="subject" className="form-label">
                                                                Subject Code
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                id="subject"
                                                                name={`subject.${index}.code`}
                                                                className="form-control"
                                                            />

                                                            <ErrorMessage
                                                                name="subject"
                                                                component="div"
                                                                className="invalid-feedback d-block"
                                                            />
                                                        </div>
                                                    </>
                                                ))}
                                                <div className='col-5 mb-4'>

                                                </div>

                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary text-uppercase"
                                                    onClick={() => setEditShow(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success w-50 text-uppercase"
                                                >
                                                    Submit
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
        </>
    )
}

export default Classes
