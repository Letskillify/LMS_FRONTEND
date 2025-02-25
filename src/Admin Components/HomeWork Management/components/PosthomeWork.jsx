import React from "react";
import { Field, Formik, Form } from "formik";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
function PosthomeWork({
  popupData,
  setPopupData,
  selectedHomework,
  handleStudenthomework,
  handleFileUpload,
}) {
  const { InstituteId, userId } = getCommonCredentials();
  return (
    <div>
      {popupData && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submit Homework</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPopupData(false)}
                ></button>
              </div>
              <Formik
                initialValues={{
                  instituteId: InstituteId,
                  homeworkId: selectedHomework?._id,
                  studentId: userId,
                  fileUrl: "",
                  feedback: "",
                }}
                onSubmit={(value) => handleStudenthomework(value)}
              >
                {({}) => (
                  <Form className="modal-body">
                    <div className="mb-3">
                      <InputFieldComponet
                        lableName="File URL"
                        type="file"
                        name="fileUrl"
                        onChange={(e) => {
                          handleFileUpload(e, "fileUrl");
                        }}
                        placeholder ="Enter File URL"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Feedback</label>
                      <Field
                        component="textarea"
                        name="feedback"
                        className="form-control"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setPopupData(false)}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PosthomeWork;
