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
import { useCreateNoticeBoardMutation, useDeleteNoticeBoardMutation, useGetNoticeBoardsByInstituteIdQuery } from "../../Redux/Api/noticeBoardSlice";

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


const NoticeBoard = () => {
  const [notification, setNotification] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [audienceType, setAudienceType] = useState(false);
  const [noticeBoard, setNoticeBoard] = useState([]);
  // const { instituteId } = useContext(MainContext);
  const { uploadedFiles, isLoading, handleFileUpload } = useFileUploader();
  const { globalInstituteId: InstituteId, globalUserId: userId } = useSelector((state) => state.main);
  const { Class, CourseGroup, Course, Board } = getCommonCredentials();
  const { data: noticeBoardData } = useGetNoticeBoardsByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
  })
  useEffect(() => {
    setNoticeBoard(noticeBoardData)
  }, [noticeBoardData])
  const [CreateNoticeBoard] = useCreateNoticeBoardMutation()
  const [DeleteNotice] = useDeleteNoticeBoardMutation()



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

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!isLoading) {
      const data = {
        ...values,
        attachment: uploadedFiles?.attachment,
      }
      try {
        const response = await CreateNoticeBoard(data)
        console.log(response);

        if (response.data) {
          toast.success("Notice added successfully", {
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
          toast.warn("Error adding notice", {
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
        console.error("Error adding notice:", error);
        toast.error(error.response.data.message || "Error adding notice", {
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
  const handleDelete = async (id) => {
    try {
      const response = await DeleteNotice(id)
      if (response?.data) {
        toast.success("Notice deleted successfully", {
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
        toast.warn("Error deleting notice", {
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
      console.error("Error deleting notice:", error);
      toast.error(error.response.data.message || "Error deleting notice", {
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

  const handleDownload = (fileUrl) => {
  if (!fileUrl) {
    console.error("No file URL provided");
    return;
  }

  // Create an anchor element
  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", "attachment"); // Set default file name
  link.target = "_blank"; // Open in a new tab if necessary

  // Append to body and trigger click
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
};

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2 className="">Notice Board</h2>
        <button
          className="btn btn-primary round mb-2"
          onClick={() => setShowPopup(true)}
        >
          Add Notification
        </button>
      </div>
      <hr className="m-0" />
      <motion.div className="notification-grid mt-3">
        {noticeBoard?.items?.map((noticedata) => (
          <motion.div
            key={noticedata.id}
            className={`notification text-${noticedata.targetAudienceType?.toLowerCase() === 'teachingstaff' ? 'primary' : noticedata.targetAudienceType?.toLowerCase() === 'nonteachingstaff' ? 'success' : noticedata.targetAudienceType?.toLowerCase() === 'studentprofile' ? 'info' : noticedata.targetAudienceType?.toLowerCase() === 'classes' ? 'warning' : noticedata.targetAudienceType?.toLowerCase() === 'courses' ? 'danger' : noticedata.targetAudienceType?.toLowerCase() === 'coursegroup' ? 'dark' : noticedata.targetAudienceType?.toLowerCase() === 'courseboards' ? 'secondary' : ''}`}
          >
            <div className="notification-content">
              <h2 className="notification-title">{noticedata.title || "No Title"}</h2>
              <p className="notification-description">{noticedata.description || "No Description"}</p>
              <div className="notification-meta">
                <div className="notification-meta-item">
                  <Calendar className="notification-meta-icon" />
                  <span className="notification-meta-text">Posted: {new Date(noticedata.datePosted || new Date()).toLocaleDateString()}</span>
                </div>
                <div className="notification-meta-item">
                  <Clock className="notification-meta-icon" />
                  <span className="notification-meta-text">Valid till: {new Date(noticedata.validTill).toLocaleDateString() || "N/A"}</span>
                </div>
              </div>
              <hr />
              <div className="notification-status justify-content-between text-center d-md-flex flex-wrap d-inline">
                <div className={`mt-1 text-dark ${noticedata.status === 'Active' ? 'text-success' : noticedata.status === 'Expired' ? 'text-danger' : noticedata.status === 'Draft' ? 'text-warning' : 'text-muted'}`}>
                  <AlertCircle className="notification-status-icon" />
                  <span className="notification-status-text">{noticedata.status || "N/A"}</span>
                </div>
                <div className="mt-1 text-dark">
                  Audience Type :
                  <span className="notification-status-text ms-2">{noticedata?.isNoticeForAll ? "All" : noticedata?.targetAudienceType || "N/A"}</span>
                </div>
                <div className="mt-1 text-dark">
                  Attachment :
                  <span className="notification-status-text cursor-pointer ms-2" onClick={() => noticedata?.attachment && handleDownload(noticedata?.attachment || "")}>Download</span>
                </div>
                <div className="mt-1 text-dark">
                  <button
                    type="button"
                    className="btn btn-danger btn-icon rounded-pill ms-2  d-none d-md-block"
                    onClick={() => handleDelete(noticedata?._id)}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger w-100 mt-2  d-initial d-md-none"
                    onClick={() => handleDelete(noticedata?._id)}
                  >
                    Delete Notice
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showPopup && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
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

export default NoticeBoard;

