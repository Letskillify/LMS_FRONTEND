import { Field, Formik, Form, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Controller/MainProvider';
import { getApi } from '../../Custom Hooks/CustomeHook';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';

const AssignTeacher = () => {
    const [selectClass, setSelectClass] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const { Class } = useContext(MainContext);

    // Fetch Teachers from API
    const fetchTeachers = async () => {
        getApi("/api/teacher/get-all").then((data) => setTeachers(data));
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    // Select Class and Set Default Values
    const selectField = (classId, setFieldValue) => {
        const selected = Class.find((item) => item._id === classId);
        setSelectClass(selected);

        if (selected) {
            setFieldValue("classTeacher", selected.classTeacher || ""); // Default Class Teacher
            setFieldValue(
                "subject",
                selected.subject?.map((sub) => ({
                    subjectId: sub._id,
                    teacher: sub.teacher || "", // Default assigned teacher
                })) || []
            );
        }
    };

    // Form Submission
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.put(`/api/class/update/${selectClass._id}`, values, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                toast.success("Teacher assigned successfully", { position: "top-right", autoClose: 5000, theme: "colored", transition: Bounce });
                resetForm();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error Assigning Teacher", { position: "top-right", autoClose: 5000, theme: "colored", transition: Bounce });
        }
    };


    return (
        <Formik
            enableReinitialize
            initialValues={{
                classTeacher: selectClass?.classTeacher._id || '',
                subject: selectClass?.subject?.map((sub) => ({
                    name: sub.name._id || '',
                    teacher: sub.teacher._id || '',
                    code: sub.code || '',
                })) || [],
            }}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, resetForm }) => (
                <Form>
                    <div className="m-4">
                        <h5 className="card-header pb-1">Assign Teachers</h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-5">
                                    <div className="p-4 card">
                                        <label className="form-label">Class</label>
                                        <Field
                                            as="select"
                                            className="form-select"
                                            name="class"
                                            onChange={(e) => selectField(e.target.value, setFieldValue)}
                                        >
                                            <option value="">Select Class</option>
                                            {Class?.map((item) => (
                                                <option key={item._id} value={item._id}>{item.className}</option>
                                            ))}
                                        </Field>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="p-4 card">
                                        {selectClass ? (
                                            <>
                                                {/* Class Teacher Selection */}
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Class Teacher</label>
                                                    <Field as="select" className="form-select" name="classTeacher">
                                                        <option value="">Select Teacher</option>
                                                        {teachers?.map((teacher) => (
                                                            <option key={teacher._id} value={teacher._id}>
                                                                {teacher.fullName.firstName} {teacher.fullName.lastName}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <hr />

                                                {/* Subjects & Teacher Assignment */}
                                                {values.subject.map((sub, index) => (
                                                    <div className="row" key={index}>
                                                        <div className="col-6 mb-2">
                                                            <label className="form-label">Subject Name</label>
                                                            <input
                                                                className="form-control"
                                                                value={selectClass?.subject?.find((s) => s?.name?._id === sub?.name)?.name?.subjectName || "Not Found"}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label">Teacher</label>
                                                            <Field as="select" className="form-select" name={`subject.${index}.teacher`}>
                                                                <option value="">Select Teacher</option>
                                                                {teachers?.map((teacher) => (
                                                                    <option key={teacher._id} value={teacher._id}>
                                                                        {teacher.fullName.firstName} {teacher.fullName.lastName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name={`subject.${index}.teacher`} component="div" className="invalid-feedback d-block" />
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                                            </>
                                        ) : (
                                            <p className="text-center text-warning pb-5 mb-3">Select the class to assign teachers <h6>..........</h6></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AssignTeacher;
