import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import * as Yup from "yup";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateHomeworkMutation,
  useGetAllHomeworkQuery,
} from "../../Redux/Api/HomeworkSlice";
const ClassHomeWork = () => {
  const { Class, TeacherData, Course, Subject, InstituteId } =
    getCommonCredentials();
  console.log(InstituteId, "InstituteId");
  const [allData, setAllData] = useState({});
  console.log("allData", allData);
  const [editingHomework, setEditingHomework] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const { data: AssignedHomework } = useGetAllHomeworkQuery();
  const [createHomework] = useCreateHomeworkMutation();
  //   const [deleteHomework] = useDeleteHomeworkMutation();

  useEffect(() => {
    if (AssignedHomework) {
      setAllData(AssignedHomework);
    }
  }, [AssignedHomework]);

  const handleDeleteOne = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/homework/add-trash/${id}`
      );
      if (response.status === 200) {
        setAllData((prevClasses) =>
          prevClasses.filter((item) => item._id !== id)
        );
      } else {
        console.error("Failed to delete homework:", response.data);
      }
    } catch (error) {
      console.error(
        "Error deleting homework:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmitHomework = async (values, { resetForm }) => {
    console.log(values, "value");

    try {
      const response = await createHomework(values);
      resetForm();
      const addModal = document.getElementById("add_home_work");
      const modal = bootstrap.Modal.getInstance(addModal);
      modal.hide();
    } catch (error) {
      console.error(
        "Error adding homework:",
        error.response?.data || error.message
      );
    }
  };

  const handleEditClick = (homework) => {
    setEditingHomework({
      ...homework,
      dueDate: formatDateForInput(homework.dueDate),
    });

    const editModal = new bootstrap.Modal(
      document.getElementById("edit_homework_modal")
    );
    editModal.show();
  };

  const handleUpdateHomework = async (values, { resetForm }) => {
    try {
      const response = await axios.put(
        `http://localhost:5500/api/homework/update/${values._id}`,
        values
      );

      const updatedHomework = response.data;
      console.log("Updated Homework:", updatedHomework);

      const fetchHomework = async () => {
        try {
          const homeworkResponse = await axios.get(
            "http://localhost:5500/api/homework/get"
          );
          setAllData(homeworkResponse.data);
        } catch (error) {
          console.error(
            "Error fetching updated homework:",
            error.response?.data || error.message
          );
        }
      };

      fetchHomework();

      resetForm();
      setEditingHomework(null);
      const editModal = document.getElementById("edit_homework_modal");
      const modal = bootstrap.Modal.getInstance(editModal);
      modal.hide();
    } catch (error) {
      console.error(
        "Error updating homework:",
        error.response?.data || error.message
      );
    }
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    assignedTaskdescription: Yup.string(),
    additionalInstructions: Yup.string(),
    assignedBy: Yup.string().required("Assigned By is required"),
    assignedTo: Yup.object().shape({
      className: Yup.array()
        .of(Yup.string().required("Class is required"))
        .min(1, "Class is required"),
      course: Yup.array()
        .of(Yup.string().required("Course is required"))
        .min(1, "Course is required"),
      subject: Yup.array()
        .of(Yup.string().required("Subject is required"))
        .min(1, "Subject is required"),
    }),
    dueDate: Yup.date().required("Due Date is required"),
    attachments: Yup.array().of(
      Yup.object().shape({
        fileName: Yup.string().required("File Name is required"),
        fileUrl: Yup.string()
          .url("Invalid URL format")
          .required("File URL is required"),
      })
    ),
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
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add_home_work"
            >
              <i className="ti ti-square-rounded-plus-filled me-2" /> Add Home
              Work
            </button>
          </div>

          <div className="card-body">
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Attachments</th>
                    <th>Title</th>
                    <th>Assigned By</th>
                    <th>Class</th>
                    <th>Course</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Discripton</th>
                    <th>Additional Instructions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allData?.items?.map((item) => (
                    <tr key={item?._id}>
                       <td>
                        <a
                          href={item?.attachments?.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.attachments?.fileName || "N/A"}
                        </a>
                      </td>
                      <td>{item?.title || "N/A"}</td>
                      <td>{item?.assignedBy?.fullName?.firstName + " " + item?.assignedBy?.fullName?.lastName  || "N/A"}</td>
                      <td>{item?.assignedTo?.className?.map((c) => c.className).join(", ") || "N/A"}</td>
                      <td>{item?.assignedTo?.course?.map((c) => c.courseName).join(", ") || "N/A"}</td>
                      <td>{item?.assignedTo?.subject?.map((s) => s.subjectName).join(", ") || "N/A"}</td>
                      <td>{new Date(item?.dueDate).toLocaleDateString() || "N/A"}</td>
                      <td>{item?.assignedTaskdescription || "N/A"}</td>
                      <td>{item?.additionalInstructions || "N/A"}</td>
                     <td>
                        <span className="d-flex justify-content-center">

                        <button
                          className="btn btn-warning mx-2"
                          onClick={() => handleEditClick(item)}
                        >
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDeleteOne(item?._id)}
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
                  attachments:[ { fileName: "", fileUrl: "" }],
                }}
                enableReinitialize
                // validationSchema={validationSchema}
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
                        {values?.attachments?.map((_, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center mb-2"
                          >
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
                                const updatedAttachments = [
                                  ...values.attachments,
                                ];
                                updatedAttachments.splice(index, 1);
                                setFieldValue(
                                  "attachments",
                                  updatedAttachments
                                );
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
                              const newAttachment = {
                                fileName: file.name,
                                fileUrl: URL.createObjectURL(file),
                              };
                              setFieldValue("attachments", [
                                ...values.attachments,
                                newAttachment,
                              ]);
                            }
                          }}
                        />

                        {errors.attachments && (
                          <div className="text-danger">
                            {errors.attachments}
                          </div>
                        )}
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

      {/* <div
        className="modal fade mt-5 pt-5"
        id="edit_homework_modal"
        tabIndex="-1"
        aria-labelledby="editHomeworkModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editHomeworkModal">
                Edit Homework
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {editingHomework && (
                <Formik
                  enableReinitialize
                  initialValues={editingHomework}
                  // validationSchema={validationSchema}
                  onSubmit={handleUpdateHomework}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="class" className="form-label">
                            Class
                          </label>
                          <Field
                            name="assignedTo.class"
                            className="form-control"
                          />
                          {errors.assignedTo?.class &&
                            touched.assignedTo?.class && (
                              <div className="text-danger">
                                {errors.assignedTo.class}
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="section" className="form-label">
                            Section
                          </label>
                          <Field
                            name="assignedTo.section"
                            className="form-control"
                          />
                          {errors.assignedTo?.section &&
                            touched.assignedTo?.section && (
                              <div className="text-danger">
                                {errors.assignedTo.section}
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="subject" className="form-label">
                            Subject
                          </label>
                          <Field name="subject" className="form-control" />
                          {errors.subject && touched.subject && (
                            <div className="text-danger">{errors.subject}</div>
                          )}
                        </div>

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
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            className="form-control"
                          />
                          {errors.description && touched.description && (
                            <div className="text-danger">
                              {errors.description}
                            </div>
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
                      </div>
                      <button type="submit" className="btn btn-success mx-2">
                        Update
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
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ClassHomeWork;
