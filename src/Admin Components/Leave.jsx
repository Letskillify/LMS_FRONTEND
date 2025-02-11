import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../Controller/MainProvider";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useImageUploader } from "../Custom Hooks/CustomeHook";

function Leave() {
  const { uploadedData, handleImageUpload } = useImageUploader();
  const { userId, instituteId, designation } = useContext(MainContext);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [EditPopup, setEditPopup] = useState(false);
  const [selectEditLeave, setSelectEditLeave] = useState(null);
  const [popup, setpopup] = useState(false);
  const [selectLeaveDay, setSelectLeaveDay] = useState(null);

  const initialValues = {
    userId: userId,
    instituteId: instituteId,
    user: "",
    typeOfLeave: "",
    reason: "",
    halfDay: "",
    multipleDays: "",
    startDate: "",
    endDate: "",
    date: "",
    attachments: "",
    userRole: designation,
  };

  const validationSchema = Yup.object().shape({
    user: Yup.string()
      .oneOf(
        ["StudentProfile", "TeachingStaff", "NonTeachingStaff"],
        "Invalid user type"
      )
      .required("User type is required"),
    typeOfLeave: Yup.string()
      .oneOf(
        ["Casual Leave", "Personal Leave", "Public Leave", "Medical Leave"],
        "Invalid leave type"
      )
      .required("Leave type is required"),
    reason: Yup.string().trim().required("Reason is required"),
    halfDay: Yup.boolean(),
    multipleDays: Yup.boolean(),
    startDate: Yup.date().when("multipleDays", {
      is: true,
      then: Yup.date().required(
        "Start Date is required for multiple days leave"
      ),
    }),
    endDate: Yup.date().when("multipleDays", {
      is: true,
      then: Yup.date()
        .required("End Date is required for multiple days leave")
        .min(Yup.ref("startDate"), "End Date must be after Start Date"),
    }),
    date: Yup.date().required("Date is required for a single-day leave"),
    attachments: Yup.mixed(),
    userRole: Yup.string().required("User Role is required"),
  });

  const fatchLeave = async () => {
    console.log(userId);
    try {
      const response = await axios.get(`/api/leaves/get/user/${userId}`);
      setLeaves(response.data);
      setpopup(true);
    } catch (error) {
      console.log("Error fetching leaves", error);
    }
  };

  const handleUpdateLeave = async (values) => {
    const data = { ...values, attachments: uploadedData?.attachments };
    try {
      const response = await axios.put(
        `/api/leaves/update/${selectEditLeave._id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Leave updated successfully");
        setEditPopup(false);
        fatchLeave();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating leave");
    }
  };

  const handleDeleteLeave = async (id) => {
    try {
      const response = await axios.delete(`/api/leaves/delete/${id}`);
      if (response.status === 200) {
        toast.success("Leave Delete successfully");
        fatchLeave();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Error Delete leave");
    }
  };

  useEffect(() => {
    if (userId) {
      fatchLeave();
    }
  }, [userId]);

  const handleFormSubmit = async (values) => {
    const data = {
      ...values,
      attachments: uploadedData?.attachments,
    };
    console.log(data, "values");
    try {
      const response = await axios.post("/api/leaves/post", data);
      if (response.status === 201) {
        toast.success("Leave applied successfully");
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error applying leave");
      }
    }
  };

  //   console.log(selectLeaveDay, "selectLeaveDay");

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header text-center text-white">
          <h3>Apply for Leave</h3>
        </div>
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">User Type</label>
                    <Field as="select" name="user" className="form-select">
                      <option value="">Select User Type</option>
                      <option value="StudentProfile">Student</option>
                      <option value="TeachingStaff">Teaching Staff</option>
                      <option value="NonTeachingStaff">
                        Non-Teaching Staff
                      </option>
                    </Field>
                    <ErrorMessage
                      name="user"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Leave Type</label>
                    <Field
                      as="select"
                      name="typeOfLeave"
                      className="form-select"
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Public Leave">Public Leave</option>
                      <option value="Medical Leave">Medical Leave</option>
                    </Field>
                    <ErrorMessage
                      name="typeOfLeave"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Reason</label>
                    <Field
                      as="textarea"
                      name="reason"
                      className="form-control"
                      rows="1"
                      placeholder="Enter Your Reason"
                    ></Field>
                    <ErrorMessage
                      name="reason"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date</label>
                    <Field type="date" name="date" className="form-control" />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Attachments</label>
                    <input
                      type="file"
                      name="attachments"
                      className="form-control"
                      onChange={(e) => {
                        handleImageUpload(e, "attachments"),
                          setFieldValue("attachments", e.target.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name="attachments"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Is MultipleDays</label>
                    <Field
                      as="select"
                      name="multipleDays"
                      id="multipleDays"
                      className="form-select"
                    >
                      <option value="">Is MultipleDays</option>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </Field>
                    <ErrorMessage
                      name="multipleDays"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                {values.multipleDays === "true" && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Date</label>
                      <Field
                        type="date"
                        name="startDate"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-6 mb-3" id="endDateField">
                      <label className="form-label">End Date</label>
                      <Field
                        type="date"
                        name="endDate"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="endDate"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Is Half Day</label>
                    <Field
                      as="select"
                      name="halfDay"
                      id="halfDay"
                      className="form-select"
                    >
                      <option value="">Is HalfDay</option>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </Field>
                    <ErrorMessage
                      name="halfDay"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Application
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="mt-5 bg-white shadow rounded p-4">
        <h3 className="p-3 text-center mb-4 border-bottom">
          Apply Leave Status
        </h3>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table">
              <tr>
                <th className="text-center">Attachments</th>
                <th>Leave Type</th>
                <th>Date</th>
                <th>Reason</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves?.map((leave, index) => (
                <tr key={index} className="align-middle">
                  <td className="text-center">
                    {leave.attachments ? (
                      <img
                        src={leave.attachments}
                        className="img-fluid rounded shadow-sm"
                        style={{
                          maxWidth: "80px",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        alt="Attachment"
                        onClick={() => window.open(leave.attachments)}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="fw-bold">{leave.typeOfLeave}</td>
                  <td>
                    {leave.date
                      ? new Date(leave.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{leave.reason}</td>
                  <td className="text-center">
                    <span
                      className={`badge px-3 py-2 ${
                        leave.status === "Approved"
                          ? "bg-success"
                          : leave.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="mt-2 d-flex align-items-center">
                    <button
                      className="btn btn-light btn-sm me-2 shadow-sm"
                      title="View"
                      onClick={() => {
                        setpopup(true);
                        setSelectLeaveDay(leave);
                      }}
                    >
                      <i className="fa fa-eye text-primary"></i>
                    </button>
                    <button
                      className="btn btn-light btn-sm me-2 shadow-sm"
                      title="Edit"
                      onClick={() => {
                        setEditPopup(true);
                        setSelectEditLeave(leave);
                      }}
                      disabled={
                        leave.status === "Approved" ||
                        leave.status === "Rejected"
                      }
                    >
                      <i className="fa fa-pencil-square-o text-info"></i>
                    </button>
                    <button
                      className="btn btn-light btn-sm shadow-sm"
                      title="Delete"
                      onClick={() => handleDeleteLeave(leave._id)}
                      disabled={
                        leave.status === "Approved" ||
                        leave.status === "Rejected"
                      }
                    >
                      <i className="fa fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {popup && selectLeaveDay && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leave Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setpopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Attachments */}
                <div className="col-md-12 mb-3 text-center">
                  {/* <label className="form-label">Attachments</label> */}
                  <div>
                    {selectLeaveDay?.attachments ? (
                      <img
                        src={selectLeaveDay.attachments}
                        className="img-fluid  border"
                        style={{
                          maxWidth: "149px",
                          maxHeight: "200px",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowImagePopup(true)}
                      />
                    ) : (
                      <div className="border p-2 rounded bg-light">
                        No Attachment
                      </div>
                    )}
                  </div>
                </div>

                {/* Show full-size image in popup */}
                {showImagePopup && (
                  <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Attachment</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowImagePopup(false)}
                          ></button>
                        </div>
                        <div className="modal-body text-center">
                          <img
                            src={selectLeaveDay.attachments}
                            className="img-fluid rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leave Details */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">User</label>
                    <div className="border p-2 rounded bg-light">
                      {selectLeaveDay?.user || "-"}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Type of Leave</label>
                    <div className="border p-2 rounded bg-light">
                      {selectLeaveDay?.typeOfLeave || "-"}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Reason</label>
                    <div className="border p-2 rounded bg-light">
                      {selectLeaveDay?.reason || "-"}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date</label>
                    <div className="border p-2 rounded bg-light">
                      {selectLeaveDay?.date
                        ? new Date(selectLeaveDay.date).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Half Day</label>
                    <div className="border p-2 rounded bg-light">
                      {selectLeaveDay?.halfDay ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Multiple Days</label>
                    <div className="border p-2 rounded bg-light">
                      {selectLeaveDay?.multipleDays ? "Yes" : "No"}
                    </div>
                  </div>
                </div>

                {selectLeaveDay?.multipleDays && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Date</label>
                      <div className="border p-2 rounded bg-light">
                        {selectLeaveDay?.startDate
                          ? new Date(
                              selectLeaveDay.startDate
                            ).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">End Date</label>
                      <div className="border p-2 rounded bg-light">
                        {selectLeaveDay?.endDate
                          ? new Date(
                              selectLeaveDay.endDate
                            ).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setpopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {EditPopup && selectEditLeave && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leave Edit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditPopup(false)}
                ></button>
              </div>
              <div className="container">
                <Formik
                  initialValues={{
                    user: selectEditLeave.user || "-",
                    typeOfLeave: selectEditLeave.typeOfLeave || "-",
                    reason: selectEditLeave.reason || "-",
                    halfDay: selectEditLeave.halfDay || false,
                    multipleDays: selectEditLeave.multipleDays || false,
                    startDate: selectEditLeave.startDate || "-",
                    endDate: selectEditLeave.endDate || "-",
                    date: selectEditLeave.date || "-",
                    attachments: selectEditLeave.attachments || "-",
                  }}
                  enableReinitialize
                  // validationSchema={validationSchema}
                  onSubmit={handleUpdateLeave}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">User Type</label>
                          <Field
                            name="user"
                            id="user"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="user"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Leave Type</label>
                          <Field
                            id="typeOfLeave"
                            name="typeOfLeave"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="typeOfLeave"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Reason</label>
                          <Field
                            id="reasone"
                            name="reason"
                            className="form-control"
                            rows="1"
                          />
                          <ErrorMessage
                            name="reason"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Date</label>
                          <Field
                            id="date"
                            name="date"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="date"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Attachments</label>
                          <input
                            type="file"
                            name="attachments"
                            className="form-control"
                            onChange={(e) => {
                              handleImageUpload(e, "attachments"),
                                setFieldValue("attachments", e.target.files[0]);
                            }}
                          />
                          <ErrorMessage
                            name="attachments"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Is Multiple Days</label>
                          <Field
                            name="multipleDays"
                            id="multipleDays"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="multipleDays"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      {selectEditLeave.multipleDays && (
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Start Date</label>
                            <Field
                              id="startDate"
                              name="startDate"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="startDate"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-6 mb-3" id="endDateField">
                            <label className="form-label">End Date</label>
                            <Field
                              id="endDate"
                              name="endDate"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="endDate"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      )}
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Is Half Day</label>
                          <Field
                            name="halfDay"
                            id="halfDay"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="halfDay"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 mb-4"
                      >
                        Submit Application
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
}
export default Leave;
