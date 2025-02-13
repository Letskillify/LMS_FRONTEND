import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useContext, useEffect, useState } from "react";
// import { MainContext } from "../../Controller/MainProvider";
import axios from "axios";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import Select from "react-select";
import { getApi, useFileUploader } from "../../Custom Hooks/CustomeHook";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import * as Yup from "yup";
import { motion } from "framer-motion"
import { Bell, X, Calendar, Clock, AlertCircle } from "lucide-react"

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  attachment: Yup.mixed().nullable(),
  status: Yup.string().required("Please select a status"),
  isNoticeForAll: Yup.boolean().required("Please select an option"),
  targetAudienceType: Yup.string().when("isNoticeForAll", {
    is: (val) => val === "false",
    then: Yup.string().required("Please select an audience type"),
  }),
  datePosted: Yup.date()
    .required("Date posted is required")
    .max(new Date(), "Date cannot be in the future"),
  validTill: Yup.date()
    .required("Valid till date is required")
    .min(Yup.ref("datePosted"), "Valid till date must be after date posted"),
  description: Yup.string().required("Description is required"),
});


const NotificationBoard = () => {
  const [notification, setNotification] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [audienceType, setAudienceType] = useState(false);
  // const { instituteId } = useContext(MainContext);
  const { uploadedFiles, isLoading, handleFileUpload } = useFileUploader();
  const { globalInstituteId: InstituteId, globalUserId: userId } = useSelector((state) => state.main);
  const { Class, CourseGroup, Course, Board,ExamType } = getCommonCredentials();

  console.log(ExamType,"ExamType");
  
  console.log(InstituteId, "InstituteId ----");

  const initialValues = {
    title: "",
    description: "",
    attachment: "",
    issuedBy: userId,
    // userType: "",
    audience: [InstituteId],
    isNoticeForAll: "true",
    targetAudienceType: "",
    visibility: true,
    status: "Draft",
    datePosted: "",
    validTill: "",
    instituteId: InstituteId,
  };

  const getNoticeBoard = () => {
    getApi("/api/notice-board/get").then((data) => console.log(data))
  }
  useEffect(() => {
    getNoticeBoard();
  }, [InstituteId])
  const handleSubmit = async (values, { setSubmitting }) => {
    if (!isLoading) {
      const data = {
        ...values,
        attachment: uploadedFiles?.attachment,
      }
      try {
        const response = await axios.post(
          `/api/notice-board/post`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success("Notification added successfully", {
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
          setSubmitting(false);
          setShowPopup(false);
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
        console.error("Error adding notification:", error);
        toast.error(error.response.data.message || "Error adding notification", {
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

    }
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Important Announcement",
      description: "All classes will be conducted online next week due to maintenance work.",
      datePosted: "2025-02-10",
      validTill: "2025-02-17",
      status: "Active",
      color: "bg-blue-100 border-blue-500",
    },
    {
      id: 2,
      title: "Exam Schedule Update",
      description: "The final exam schedule has been updated. Please check the portal for details.",
      datePosted: "2025-02-05",
      validTill: "2025-03-01",
      status: "Active",
      color: "bg-green-100 border-green-500",
    },
  ])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2 className="">Notice Board</h2>
        <button
          className="btn btn-primary round mb-2"
          onClick={() => setShowPopup(true)}
        >
          {/* <i className="fa fa-plus-circle" aria-hidden="true"></i> */}
          Add Notification
        </button>
      </div>
      <div id="notice-container">
        {/* {filteredAudience.map((notice, index) => (
          <div
            key={index}
            className="notice-card border-left-success bg-light p-3 mb-3 shadow-sm rounded"
          >
            <div className="d-flex justify-content-between">
              <div className="notice-title font-weight-bold text-dark h5">
                {notice.title}
              </div>
              <button className="btn border-danger text-dark">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div className="notice-meta text-muted small">
              Issued by: {notice.issuedBy} | Date: {notice.datePosted}
            </div>
            <div className="notice-description mt-2">{notice.description}</div>
            <div className="notice-meta text-muted small">
              Valid Till: {notice.validTill} | Status: {notice.status}
            </div>
          </div>
        ))} */}
      </div>
      {/* <div className="table-responsive text-nowrap mt-3">
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
      </div> */}

      <motion.div className="notification-grid">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`notification ${notification.color}`}
          >
            <div className="notification-content">
              <h2 className="notification-title">{notification.title}</h2>
              <p className="notification-description">{notification.description}</p>
              <div className="notification-meta">
                <div className="notification-meta-item">
                  <Calendar className="notification-meta-icon" />
                  <span className="notification-meta-text">Posted: {notification.datePosted}</span>
                </div>
                <div className="notification-meta-item">
                  <Clock className="notification-meta-icon" />
                  <span className="notification-meta-text">Valid till: {notification.validTill}</span>
                </div>
              </div>
              <div className="notification-status justify-content-between text-center">
                <div>
                  <AlertCircle className="notification-status-icon" />
                  <span className="notification-status-text">{notification.status}</span>
                </div>
                <div>
                  Attachment :
                  <span className="notification-status-text ms-2">Download</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showPopup && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Notice</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ values, setFieldValue }) => (
                    <Form>

                      {/* <div className="col-md-6 mb-3">
                          <label className="form-label">Issued By</label>
                          <Field
                            type="text"
                            name="issuedBy"
                            placeholder="Enter Name of Issuer"
                            className="form-control"
                          />
                        </div> */}
                      <div className="row">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Title</label>
                            <Field type="text" name="title" placeholder="Enter Notice Title" className="form-control" />
                            <ErrorMessage name="title" component="div" className="text-danger" />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Attachment</label>
                            <input
                              type="file"
                              name="attachment"
                              className="form-control"
                              accept=".csv,.pdf,.doc,.docx,.xlsx,.xls"
                              onChange={(e) => handleFileUpload(e, "attachment")}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>
                            <Field as="select" name="status" className="form-select">
                              <option value="">Select Status</option>
                              <option value="Draft">Draft</option>
                              <option value="Active">Active</option>
                              <option value="Expired">Expired</option>
                              <option value="Archived">Archived</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-danger" />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Is Notice For All</label>
                            <Field as="select" name="isNoticeForAll" className="form-select">
                              <option value={false}>No</option>
                              <option value={true}>Yes</option>
                            </Field>
                            <ErrorMessage name="isNoticeForAll" component="div" className="text-danger" />
                          </div>
                        </div>
                        {/* <div className="col-md-6 mb-3">
                          {!values.isNoticeForAll && (
                            <label className="form-label">
                              Target Audience Type
                            </label>
                          )}
                        </div> */}
                        {values.isNoticeForAll !== "true" && (
                          <>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Target Audience</label>
                              <Field
                                as="select"
                                name="targetAudienceType"
                                placeholder="Select Audience Type"
                                className="form-select"
                                onChange={(e) => {
                                  setAudienceType(e.target.value);
                                  setFieldValue(
                                    "audience",
                                    (["Courseboards", "Courses", "classes", "CourseGroup"].includes(audienceType)) ? [] : [InstituteId]
                                  );
                                  setFieldValue("targetAudienceType", e.target.value);
                                }}
                              >
                                <option >Select Type</option>
                                <option value="TeachingStaff">
                                  Teaching Staff
                                </option>
                                <option value="NonTeachingStaff">
                                  Non-Teaching Staff
                                </option>
                                <option value="classes">Classes</option>
                                <option value="Courses">Courses</option>
                                <option value="CourseGroup">Course Group</option>
                                <option value="StudentProfile">Student</option>
                                <option value="Courseboards">
                                  Course Boards
                                </option>
                              </Field>
                              <ErrorMessage name="targetAudienceType" component="div" className="text-danger" />
                              {/* <Field name="targetAudienceType">
                              {({ field }) => (
                                <Select
                                  isMulti
                                  options={[
                                    { value: "TeachingStaff", label: "Teaching Staff" },
                                    { value: "NonTeachingStaff", label: "Non-Teaching Staff" },
                                    { value: "classes", label: "Classes" },
                                    { value: "Courses", label: "Courses" },
                                    { value: "CourseGroup", label: "Course Group" },
                                    { value: "Courseboards", label: "Course Boards" }
                                  ]}
                                  name="targetAudienceType"
                                  value={values?.targetAudienceType.map(s => ({
                                    value: s,
                                    label: values?.targetAudienceType.find(t => t === s)
                                  }))}
                                  onChange={selected => setFieldValue("targetAudienceType", selected.map(s => s.value))}
                                  placeholder="Select Audience Type"
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
                            </Field> */}
                            </div>
                            {(["Courseboards"].includes(audienceType)) && <div className="col-md-6 mb-3">
                              <label className="form-label">{audienceType}</label>
                              <Field name="audience">
                                {({ field: { value }, form: { setFieldValue } }) => (
                                  <Select
                                    isMulti
                                    options={Board.map(sec => ({
                                      value: sec._id,
                                      label: sec.boardName
                                    }))}
                                    name="section"
                                    value={Array.isArray(value) ? value?.map(s => ({
                                      value: s,
                                      label: Board.find(sec => sec._id === s)?.boardName
                                    })) : []}
                                    onChange={selected => setFieldValue("audience", selected.map(s => s.value))}
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
                            }
                            {(["CourseGroup"].includes(audienceType)) && <div className="col-md-6 mb-3">
                              <label className="form-label">{audienceType}</label>
                              <Field name="audience">
                                {({ field: { value }, form: { setFieldValue } }) => (
                                  <Select
                                    isMulti
                                    options={CourseGroup.map(sec => ({
                                      value: sec._id,
                                      label: sec.courseGroupName
                                    }))}
                                    name="section"
                                    value={Array.isArray(value) ? value?.map(s => ({
                                      value: s,
                                      label: CourseGroup.find(sec => sec._id === s)?.courseGroupName
                                    })) : []}
                                    onChange={selected => setFieldValue("audience", selected.map(s => s.value))}
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
                            }
                            {(["Courses"].includes(audienceType)) && <div className="col-md-6 mb-3">
                              <label className="form-label">{audienceType}</label>
                              <Field name="audience">
                                {({ field: { value }, form: { setFieldValue } }) => (
                                  <Select
                                    isMulti
                                    options={Course.map(sec => ({
                                      value: sec._id,
                                      label: sec.courseName
                                    }))}
                                    name="section"
                                    value={Array.isArray(value) ? value?.map(s => ({
                                      value: s,
                                      label: Course.find(sec => sec._id === s)?.courseName
                                    })) : []}
                                    onChange={selected => setFieldValue("audience", selected.map(s => s.value))}
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
                            }
                            {(["classes"].includes(audienceType)) && <div className="col-md-6 mb-3">
                              <label className="form-label">{audienceType}</label>
                              <Field name="audience">
                                {({ field: { value }, form: { setFieldValue } }) => (
                                  <Select
                                    isMulti
                                    options={Class.map(sec => ({
                                      value: sec._id,
                                      label: sec.className
                                    }))}
                                    name="section"
                                    value={Array.isArray(value) ? value?.map(s => ({
                                      value: s,
                                      label: Class.find(sec => sec._id === s)?.className
                                    })) : []}
                                    onChange={selected => setFieldValue("audience", selected.map(s => s.value))}
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
                            }
                          </>
                        )}
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Date Posted</label>
                            <Field type="date" name="datePosted" className="form-control" />
                            <ErrorMessage name="datePosted" component="div" className="text-danger" />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Valid Till</label>
                            <Field type="date" name="validTill" className="form-control" />
                            <ErrorMessage name="validTill" component="div" className="text-danger" />
                          </div>
                        </div>

                        <div className="col-md-12 mb-3">
                          <label className="form-label">Description</label>
                          <Field as="textarea" name="description" className="form-control" placeholder="Enter description" />
                          <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success">
                        Submit Notice
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBoard;

