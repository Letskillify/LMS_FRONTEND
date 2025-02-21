import React, { useState } from "react";

function ShowHomework({
  SubmitData,
  viewSubmissionsModal,
  setViewSubmissionsModal,
  getFileType,
}) {
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  return (
    <div>
      {viewSubmissionsModal && SubmitData?.length > 0 && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">My Homework Submissions</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewSubmissionsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>File</th>
                        <th>Submission Date</th>
                        <th>Feedback</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SubmitData?.map((submission) => (
                        <tr key={submission._id}>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              <div
                                className="position-relative cursor-pointer"
                                onClick={() => {
                                  setSelectedSubmission(submission);
                                  setShowImagesModal(true);
                                }}
                              >
                                {submission.fileUrl &&
                                  (getFileType(submission.fileUrl) === "pdf" ? (
                                    <div className="d-flex align-items-center">
                                      <i className="fa fa-file-pdf-o fa-2x text-danger"></i>
                                      <span className="ms-2">View PDF</span>
                                    </div>
                                  ) : (
                                    <div className="d-flex align-items-center">
                                      <img
                                        src={submission.fileUrl || "-"}
                                        alt="submission preview"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "cover",
                                          borderRadius: "4px",
                                        }}
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </td>
                          <td>
                            {new Date(
                              submission.submissionDate
                            ).toLocaleDateString()}
                          </td>
                          <td>{submission.feedback || "No feedback"}</td>
                          <td>
                            <span className="badge bg-success">Submitted</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewSubmissionsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showImagesModal && selectedSubmission && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {getFileType(selectedSubmission.fileUrl) === "pdf"
                    ? "PDF Document"
                    : "Submitted Image"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowImagesModal(false);
                    setSelectedSubmission(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {getFileType(selectedSubmission.fileUrl) === "pdf" ? (
                  <div className="ratio ratio-16x9" style={{ height: "80vh" }}>
                    <iframe
                      src={selectedSubmission.fileUrl}
                      title="PDF Viewer"
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                    ></iframe>
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={selectedSubmission.fileUrl}
                      alt="submission"
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "70vh",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <a
                  href={selectedSubmission.fileUrl}
                  download
                  className="btn btn-primary"
                >
                  <i className="fa fa-download me-2"></i>
                  Download{" "}
                  {getFileType(selectedSubmission.fileUrl) === "pdf"
                    ? "PDF"
                    : "Image"}
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowImagesModal(false);
                    setSelectedSubmission(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowHomework;
