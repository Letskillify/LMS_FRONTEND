import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../Controller/MainProvider';
import Select from "react-select";
import { PostApi } from '../../Custom Hooks/CustomeHook';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const Course = () => {
    const [showModal, setshowModal] = useState(false)
    const [Show, setShow] = useState(10)
    const [search, setSearch] = useState('')
    const { userId, Section, Medium, Stream, Semester, Shift, Board, Course } = useContext(MainContext)
    const initialValues = {
        courseName: "",
        section: [],
        medium: [],
        stream: [],
        semester: [],
        shift: [],
        board: [],
        instituteId: userId,
        courseDescription: "",
        courseType: "",
        courseDuration: "",
        courseCompleted: false,
        includeSemester: false
    };

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("/api/courses/post", values);
            if (response.status === 201) {
                toast.success("Course added successfully", {
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
            console.error("Error adding course:", error);
            toast.error(error.response.data.message || "Error adding course", {
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

    const filteredCourses = Course?.filter(course => {
        return (
            course.Name?.toLowerCase()?.includes(search?.toLowerCase()) ||
            course?.Description?.toLowerCase()?.includes(search?.toLowerCase())
        );
    });

    console.log(Course);
    

    return (
        <>
            <div>
                <div className="card m-4">
                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="col-1">
                                <select className="form-select" onChange={(e) => setShow(e.target.value)}>
                                    <option selected="" value={10}>10</option>
                                    <option value={20} >20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    <option value={500}>500</option>
                                    <option value={1000}>1000</option>
                                    <option value={filteredCourses?.length}>All</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="card m-4">
                    <div className="d-flex justify-content-between text-center align-items-center">
                        <h5 className="card-header d-none d-sm-inline">Students Information</h5>
                        <div>
                            <div className="btn-group w-50 ">
                                <div className="input-group">
                                    <span className="input-group-text " id="basic-addon1"><i className="bx bx-search"></i></span>
                                    <input type="text" className="form-control w-50" placeholder="Search by Name,Description" aria-label="Search" aria-describedby="basic-addon1" value={search} onChange={e => setSearch(e.target.value)} />
                                </div>
                            </div>
                            <p className="btn btn-success m-3" onClick={() => setshowModal(true)}>
                                <i className="tf-icons bx bx-pencil me-1" ></i>
                                <span className='d-none d-sm-inline'>Add Course</span>
                            </p>

                        </div>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table table-striped">
                            <thead>
                                <tr className='text-center'>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Duration</th>
                                    <th>Completed</th>
                                    <th>Semester</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {Course?.slice(0, Show)?.map((course) => (
                                    <tr key={course._id}>
                                        <td>{course?.courseName}</td>
                                        <td>{course?.Description}</td>
                                        <td>{course?.Type}</td>
                                        <td>{course?.Duration}</td>
                                        <td>{course?.completed ? "Yes" : "No"}</td>
                                        <td>{course?.Semester}</td>
                                        <td>
                                            {/* {
                                            <button
                                                className="btn btn-success btn-icon rounded-pill me-1"
                                                onClick={() => handleEdit(course._id, course)}
                                            >
                                                <i className="bx bx-edit"></i>
                                            </button>
                                        }
                                        <Link
                                            className="btn btn-danger btn-icon rounded-pill"
                                            onClick={() => handleDeleteone(course?._id)}
                                        >
                                            <i className="bx bx-trash"></i>
                                        </Link> */}
                                        </td>
                                    </tr>
                                ))}
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
                                    {/* {editingSemester ? "Edit Semester" : "Create Semester"} */}
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
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseName" className="form-label">
                                                        Course Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="courseName"
                                                        name="courseName"
                                                        className="form-control"
                                                        placeholder="Enter course name"
                                                    />
                                                    <ErrorMessage
                                                        name="courseName"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="section" className="form-label">
                                                        Section
                                                    </label>
                                                    {/* <Field
                                                        type="text"
                                                        id="section"
                                                        name="section"
                                                        className="form-control"
                                                        placeholder="Enter section name"
                                                    />
                                                    <ErrorMessage
                                                        name="section"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    /> */}
                                                    <Field name="section">
                                                        {({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={Section.map(sec => ({
                                                                    value: sec._id,
                                                                    label: sec.sectionName
                                                                }))}
                                                                name="section"
                                                                value={values.section.map(s => ({
                                                                    value: s,
                                                                    label: Section.find(sec => sec._id === s).sectionName
                                                                }))}
                                                                onChange={selected => setFieldValue("section", selected.map(s => s.value))}
                                                                placeholder="Select Sections"
                                                                styles={{
                                                                    multiValue: base => ({
                                                                        ...base,
                                                                        backgroundColor: "#e0f7fa",
                                                                        borderRadius: "5px",
                                                                        padding: "1px"
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="medium" className="form-label">
                                                        Medium
                                                    </label>
                                                    <Field name="medium">
                                                        {({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={Medium.map(med => ({
                                                                    value: med._id,
                                                                    label: med.mediumName
                                                                }))}
                                                                name="medium"
                                                                value={values.medium.map(m => ({
                                                                    value: m,
                                                                    label: Medium.find(med => med._id === m).mediumName
                                                                }))}
                                                                onChange={selected => setFieldValue("medium", selected.map(m => m.value))}
                                                                placeholder="Select Medium"
                                                                styles={{
                                                                    multiValue: base => ({
                                                                        ...base,
                                                                        backgroundColor: "#e0f7fa",
                                                                        borderRadius: "5px",
                                                                        padding: "1px"
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="medium"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="stream" className="form-label">
                                                        Stream
                                                    </label>
                                                    <Field name="stream">
                                                        {({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={Stream.map(str => ({
                                                                    value: str._id,
                                                                    label: str.streamName
                                                                }))}
                                                                name="stream"
                                                                value={values.stream.map(s => ({
                                                                    value: s,
                                                                    label: Stream.find(str => str._id === s).streamName
                                                                }))}
                                                                onChange={selected => setFieldValue("stream", selected.map(s => s.value))}
                                                                placeholder="Select Streams"
                                                                styles={{
                                                                    multiValue: base => ({
                                                                        ...base,
                                                                        backgroundColor: "#e0f7fa",
                                                                        borderRadius: "5px",
                                                                        padding: "1px"
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="includeSemester" className="form-label">
                                                        Include Semester
                                                    </label>
                                                    <select
                                                        id="includeSemester"
                                                        name="includeSemester"
                                                        className="form-select"
                                                        placeholder="Select include semester status"
                                                        onChange={e => setFieldValue("includeSemester", e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    <ErrorMessage
                                                        name="includeSemester"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                                {values.includeSemester === "true" && (
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <label htmlFor="semester" className="form-label">
                                                            Semester
                                                        </label>
                                                        <Field name="semester">
                                                            {({ field }) => (
                                                                <Select
                                                                    isMulti
                                                                    options={Semester.map(sem => ({
                                                                        value: sem._id,
                                                                        label: sem.semesterName
                                                                    }))}
                                                                    name="semester"
                                                                    value={values.semester.map(s => ({
                                                                        value: s,
                                                                        label: Semester.find(sem => sem._id === s).semesterName
                                                                    }))}
                                                                    onChange={selected => setFieldValue("semester", selected.map(s => s.value))}
                                                                    placeholder="Select Semesters"
                                                                    styles={{
                                                                        multiValue: base => ({
                                                                            ...base,
                                                                            backgroundColor: "#e0f7fa",
                                                                            borderRadius: "5px",
                                                                            padding: "1px"
                                                                        })
                                                                    }}
                                                                />
                                                            )}
                                                        </Field>
                                                    </div>
                                                )}

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="shift" className="form-label">
                                                        Shift
                                                    </label>
                                                    <Field name="shift">
                                                        {({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={Shift.map(sh => ({
                                                                    value: sh._id,
                                                                    label: sh.shiftName
                                                                }))}
                                                                name="shift"
                                                                value={values.shift.map(s => ({
                                                                    value: s,
                                                                    label: Shift.find(sh => sh._id === s).shiftName
                                                                }))}
                                                                onChange={selected => setFieldValue("shift", selected.map(s => s.value))}
                                                                placeholder="Select Shifts"
                                                                styles={{
                                                                    multiValue: base => ({
                                                                        ...base,
                                                                        backgroundColor: "#e0f7fa",
                                                                        borderRadius: "5px",
                                                                        padding: "1px"
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="board" className="form-label">
                                                        Board
                                                    </label>
                                                    <Field name="board">
                                                        {({ field }) => (
                                                            <Select
                                                                isMulti
                                                                options={Board.map(bd => ({
                                                                    value: bd._id,
                                                                    label: bd.boardName
                                                                }))}
                                                                name="board"
                                                                value={values.board.map(b => ({
                                                                    value: b,
                                                                    label: Board.find(bd => bd._id === b).boardName
                                                                }))}
                                                                onChange={selected => setFieldValue("board", selected.map(b => b.value))}
                                                                placeholder="Select Boards"
                                                                styles={{
                                                                    multiValue: base => ({
                                                                        ...base,
                                                                        backgroundColor: "#e0f7fa",
                                                                        borderRadius: "5px",
                                                                        padding: "1px"
                                                                    })
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseDescription" className="form-label">
                                                        Course Description
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="courseDescription"
                                                        name="courseDescription"
                                                        className="form-control"
                                                        placeholder="Enter course description"
                                                    />
                                                    <ErrorMessage
                                                        name="courseDescription"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseType" className="form-label">
                                                        Course Type
                                                    </label>
                                                    <Field as="select"
                                                        id="courseType"
                                                        name="courseType"
                                                        className="form-select"
                                                        placeholder="Select course type"
                                                    >
                                                        <option value="">Select Course Type</option>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Degree">Degree</option>
                                                        <option value="Class">Class</option>
                                                        <option value="Certification">Certification</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="courseType"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseDuration" className="form-label">
                                                        Course Duration
                                                    </label>
                                                    <div className="input-group">
                                                        <Field
                                                            type="number"
                                                            id="courseDuration"
                                                            name="courseDuration"
                                                            className="form-control"
                                                            placeholder="Enter course duration in months"
                                                        />
                                                        <span className="input-group-text">months</span>
                                                    </div>
                                                    <ErrorMessage
                                                        name="courseDuration"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6 mb-3">
                                                    <label htmlFor="courseCompleted" className="form-label">
                                                        Course Completed
                                                    </label>
                                                    <select
                                                        id="courseCompleted"
                                                        name="courseCompleted"
                                                        className="form-select"
                                                        placeholder="Select course completed status"
                                                    >
                                                        <option value="">Select Course Completed Status</option>
                                                        <option value="true">Completed</option>
                                                        <option value="false">Not Completed</option>
                                                    </select>
                                                    <ErrorMessage
                                                        name="courseCompleted"
                                                        component="div"
                                                        className="invalid-feedback d-block"
                                                    />
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
        </>
    )
}

export default Course
