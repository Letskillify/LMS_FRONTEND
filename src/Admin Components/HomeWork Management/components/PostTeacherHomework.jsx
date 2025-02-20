import React, { useState } from "react";
import Select from "react-select";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import { Field, Form, Formik } from "formik";
function PostTeacherHomework({handleSubmitHomework,selectedFiles, handleFileChange, validationSchema }) {
  const [showModal, setShowModal] = useState(false);
  const { Class, TeacherData, Course, Subject, InstituteId } =getCommonCredentials();
  return (
    <div>
      <div
        className="modal fade pt-5"
        id="add_home_work"
        tabIndex="-1"
        aria-labelledby="addHomeworkModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addHomeworkModal">
                Add Homework
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  instituteId: InstituteId,
                  title: "",
                  assignedTaskdescription: "",
                  additionalInstructions: "",
                  assignedBy: "",
                  assignedTo: { className: [], course: [], subject: [] },
                  dueDate: "",
                  attachments: [],
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmitHomework}
              >
                {({ values, errors, touched, setFieldValue, handleChange }) => (
                  <Form>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <Field name="title" className="form-control" />
                        {errors.title && touched.title && (
                          <div className="text-danger">{errors.title}</div>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="dueDate" className="form-label">
                          Due Date
                        </label>
                        <Field
                          name="dueDate"
                          type="date"
                          className="form-control"
                        />
                        {errors.dueDate && touched.dueDate && (
                          <div className="text-danger">{errors.dueDate}</div>
                        )}
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label>Assigned By</label>
                          <Field
                            as="select"
                            name="assignedBy"
                            className="form-select"
                          >
                            <option value="">Select Teacher</option>
                            {TeacherData?.map((teacher) => (
                              <option key={teacher?._id} value={teacher?._id}>
                                {teacher.fullName.firstName +
                                  " " +
                                  teacher.fullName.lastName}
                              </option>
                            ))}
                          </Field>
                        </div>

                        {/* Assigned to Class */}
                        <div className="mb-3 col-md-6">
                          <label>Assigned To Class</label>
                          <Field name="assignedTo.className">
                            {({ field, form }) => (
                              <Select
                                isMulti
                                options={Class?.map((cls) => ({
                                  value: cls._id,
                                  label: cls.className,
                                }))}
                                value={
                                  field.value?.map((id) => ({
                                    value: id,
                                    label: Class.find((cls) => cls._id === id)
                                      ?.className,
                                  })) || []
                                }
                                onChange={(selected) => {
                                  form.setFieldValue(
                                    "assignedTo.className",
                                    selected.map((s) => s.value)
                                  );
                                  setShowModal(true);
                                }}
                                placeholder="Select Classes"
                                styles={{
                                  multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#e0f7fa",
                                    borderRadius: "5px",
                                    padding: "2px",
                                  }),
                                }}
                              />
                            )}
                          </Field>
                          {errors.assignedTo?.class &&
                            touched.assignedTo?.class && (
                              <div className="text-danger">
                                {errors.assignedTo.class}
                              </div>
                            )}
                        </div>

                        {showModal && (
                          <>
                            {/* Course Selection */}
                            <div className="mb-3 col-md-6">
                              <label>Course</label>
                              <Field name="assignedTo.course">
                                {({ field, form, value }) => (
                                  <Select
                                    isMulti
                                    options={Course?.map((c) => ({
                                      value: c._id,
                                      label: c.courseName,
                                    }))}
                                    value={
                                      field.value?.map((id) => ({
                                        value: id,
                                        label: Course.find((c) => c._id === id)
                                          ?.courseName,
                                      })) || []
                                    }
                                    onChange={(selected) =>
                                      form.setFieldValue(
                                        "assignedTo.course",
                                        selected.map((s) => s.value)
                                      )
                                    }
                                    placeholder="Select Courses"
                                    styles={{
                                      multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: "#e0f7fa",
                                        borderRadius: "5px",
                                        padding: "2px",
                                      }),
                                    }}
                                  />
                                )}
                              </Field>
                              {errors.assignedTo?.course &&
                                touched.assignedTo?.course && (
                                  <div className="text-danger">
                                    {errors.assignedTo.course}
                                  </div>
                                )}
                            </div>

                            {/* Subject Selection */}
                            <div className="mb-3 col-md-6">
                              <label>Subject</label>
                              <Field name="assignedTo.subject">
                                {({ field, form }) => (
                                  <Select
                                    isMulti
                                    options={Subject?.map((sub) => ({
                                      value: sub._id,
                                      label: sub.subjectName,
                                    }))}
                                    // name = "subject"
                                    value={
                                      field.value?.map((id) => ({
                                        value: id,
                                        label: Subject.find(
                                          (sub) => sub._id === id
                                        )?.subjectName,
                                      })) || []
                                    }
                                    onChange={(selected) =>
                                      form.setFieldValue(
                                        "assignedTo.subject",
                                        selected.map((s) => s.value)
                                      )
                                    }
                                    placeholder="Select Subjects"
                                    styles={{
                                      multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: "#e0f7fa",
                                        borderRadius: "5px",
                                        padding: "2px",
                                      }),
                                    }}
                                  />
                                )}
                              </Field>
                              {errors.assignedTo?.subject &&
                                touched.assignedTo?.subject && (
                                  <div className="text-danger">
                                    {errors.assignedTo.subject}
                                  </div>
                                )}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label
                            htmlFor="assignedTaskdescription"
                            className="form-label"
                          >
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="assignedTaskdescription"
                            className="form-control"
                          />
                          {errors.assignedTaskdescription &&
                            touched.assignedTaskdescription && (
                              <div className="text-danger">
                                {errors.assignedTaskdescription}
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label
                            htmlFor="additionalInstructions"
                            className="form-label"
                          >
                            Additional Instructions
                          </label>
                          <Field
                            as="textarea"
                            name="additionalInstructions"
                            className="form-control"
                          />
                          {errors.additionalInstructions &&
                            touched.additionalInstructions && (
                              <div className="text-danger">
                                {errors.additionalInstructions}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="mb-3 col-md-12">
                        <label htmlFor="attachments" className="form-label">
                          Attachments
                        </label>

                        {/* File Preview Section */}
                        <div className="selected-files mb-3">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="selected-file-item d-flex align-items-center mb-2 p-2 border rounded"
                            >
                              {file.type.startsWith("image/") && (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index}`}
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    objectFit: "cover",
                                  }}
                                  className="me-2"
                                />
                              )}
                              <span className="flex-grow-1">{file.name}</span>
                              <div className="d-flex align-items-center">
                                {isLoading && (
                                  <div
                                    className="spinner-border spinner-border-sm text-primary me-2"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleRemoveFile(
                                      index,
                                      setFieldValue,
                                      values
                                    )
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* File Input */}
                        <div className="file-upload-wrapper">
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, setFieldValue, values)
                            }
                            disabled={isLoading}
                          />
                          <small className="text-muted d-block mt-1">
                            You can select multiple images
                          </small>
                          {isLoading && (
                            <small className="text-primary d-block mt-1">
                              Uploading files... Please wait
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mx-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Close
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostTeacherHomework;
