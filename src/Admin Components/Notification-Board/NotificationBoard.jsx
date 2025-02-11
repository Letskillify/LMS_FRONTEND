import { Field, Formik, Form } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Controller/MainProvider";
import axios from "axios";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";

const NotificationBoard = () => {
  const [notification, setNotification] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const { instituteId } = useContext(MainContext);
  const [data, setData] = useState();
  const {
    Class,
    Course,
    Teacher,
    CourseGroup,
    Board,
    Shift,
    Semester,
    Section,
    Medium,
    Stream,
    Subject,
  } = getCommonCredentials();

  useEffect(() => {
    setData({
      Class,
      Course,
      Teacher,
      CourseGroup,
      Board,
      Shift,
      Semester,
      Section,
      Medium,
      Stream,
      Subject,
    });
  }, [
    Class,
    Course,
    Teacher,
    CourseGroup,
    Board,
    Shift,
    Semester,
    Section,
    Medium,
    Stream,
    Subject,
  ]);

  const initialValues = {
    title: "",
    description: "",
    attachment: "",
    issuedBy: "",
    userType: "",
    audience: "",
    isNoticeForAll: false,
    targetAudienceType: "",
    visibility: true,
    status: "Draft",
    datePosted: "",
    validTill: "",
    instituteId: instituteId,
  };

  const [filteredAudience, setFilteredAudience] = useState([]);
  const [audienceData, setAudienceData] = useState([]);
  useEffect(() => {
    const getAudience = async () => {
      try {
        const res = await axios.get(
          `/api/notice-board/get/institute/${instituteId}`
        );
        setAudienceData(res.data);
        console.log("Fetched audience data:", res.data); // Debugging
      } catch (error) {
        console.error("Error fetching audience data:", error);
      }
    };
    if (instituteId) {
      getAudience();
    }
  }, [instituteId]);

  const handleNotice = async (value) => {
    console.log("Submitting values:", value); // Debugging
    try {
      const response = await axios.post(
        "/api/notice-board/post",
        JSON.stringify(value),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        alert("Notice successfully submitted!");
      }
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
  };
  useEffect(() => {
    if (initialValues.targetAudienceType) {
      let filtered = data;

      switch (initialValues.targetAudienceType) {
        case "Courses":
          filtered = filtered.filter((item) => Course.includes(item.id));
          break;
        case "CourseGroup":
          filtered = filtered.filter((item) => CourseGroup.includes(item.id));
          break;
        case "classes":
          filtered = filtered.filter((item) => Class.includes(item.id));
          break;
        case "Courseboards":
          filtered = filtered.filter((item) => Board.includes(item.id));
          break;
        case "TeachingStaff":
          filtered = filtered.filter((item) => Teacher.includes(item.id));
          break;
        case "NonTeachingStaff":
          filtered = filtered.filter(
            (item) => Shift.type === initialValues.targetAudienceType
          );
          break;
        default:
          filtered = [];
      }

      setFilteredAudience(filtered);
    } else {
      setFilteredAudience([]); // Reset if no type is selected
    }
  }, [
    initialValues.targetAudienceType,
    audienceData,
    Course,
    CourseGroup,
    Class,
    Board,
    Teacher,
    Shift,
  ]);
  console.log(data, "CourseGroup");

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2 className="">Notification Board</h2>
        <button
          className="btn btn-primary round mb-2"
          onClick={() => setShowPopup(true)}
        >
          <i className="fa fa-plus" aria-hidden="true">
            {" "}
            add Notification
          </i>
        </button>
      </div>
      <div id="notice-container">
        {filteredAudience.map((notice, index) => (
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
        ))}
      </div>

      {showPopup && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
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
                <Formik initialValues={initialValues} onSubmit={handleNotice}>
                  {({ values }) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <Field
                          type="text"
                          name="title"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <Field
                          as="textarea"
                          name="description"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Attachment (URL)</label>
                        <Field
                          type="file"
                          name="attachment"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Issued By</label>
                        <Field
                          type="text"
                          name="issuedBy"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <Field
                          as="select"
                          name="status"
                          className="form-select"
                        >
                          <option value="Draft">Draft</option>
                          <option value="Active">Active</option>
                          <option value="Expired">Expired</option>
                          <option value="Archived">Archived</option>
                        </Field>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">User Type</label>
                        <Field
                          as="select"
                          name="userType"
                          className="form-select"
                        >
                          <option value="TeachingStaff">Teaching Staff</option>
                          <option value="NonTeachingStaff">
                            Non-Teaching Staff
                          </option>
                          <option value="InstituteProfile">
                            Institute Profile
                          </option>
                        </Field>
                      </div>
                      <div className="form-check">
                        <Field
                          type="checkbox"
                          className="form-check-input"
                          name="isNoticeForAll"
                        />
                        <label className="form-check-label ms-2">
                          Is Notice For All
                        </label>
                      </div>

                      {!values.isNoticeForAll && (
                        <div className="row">
                          <div className="col-6 mb-3">
                            <label className="form-label">
                              Target Audience Type
                            </label>
                            <Field
                              as="select"
                              name="targetAudienceType"
                              className="form-select"
                            >
                              <option value="">Select Type</option>
                              <option value="TeachingStaff">
                                Teaching Staff
                              </option>
                              <option value="NonTeachingStaff">
                                Non-Teaching Staff
                              </option>
                              <option value="classes">Classes</option>
                              <option value="Courses">Courses</option>
                              <option value="CourseGroup">Course Group</option>
                              <option value="Courseboards">
                                Course Boards
                              </option>
                            </Field>
                          </div>

                          {values.targetAudienceType && (
                            <div className="col-6 mb-3">
                              <label className="form-label">Audience</label>
                              <Field
                                as="select"
                                name="audience"
                                className="form-select"
                              >
                                <option value="">Select Audience</option>
                                {filteredAudience.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label">Date Posted</label>
                        <Field
                          type="date"
                          name="datePosted"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Valid Till</label>
                        <Field
                          type="date"
                          name="validTill"
                          className="form-control"
                        />
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

