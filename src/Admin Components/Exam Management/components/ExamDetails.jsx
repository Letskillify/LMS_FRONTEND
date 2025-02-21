import React from 'react';

const ExamDetails = ({ exam, onClose }) => {
  console.log("ExamDetails", exam);
  return (
    <div className="modal-content shadow-none">
      <div className="modal-header bg-themprimary text-white">
        <h5 className="modal-title d-flex align-items-center gap-2 text-white pb-2">
          <i className="bi bi-file-text"></i>
          Exam Details - {exam?.examName}
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
        ></button>
      </div>
      <div className="modal-body">
        <div className="container-fluid p-0">
          {/* Quick Stats Section */}
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-primary h-100">
                <div className="card-body">
                  <h6 className="card-subtitle text-muted mb-2">
                    <i className="bi bi-hash"></i> Exam Code
                  </h6>
                  <h5 className="card-title mb-0">{exam?.examCode}</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-info h-100">
                <div className="card-body">
                  <h6 className="card-subtitle text-muted mb-2">
                    <i className="bi bi-display"></i> Mode
                  </h6>
                  <h5 className="card-title mb-0">{exam?.examMode}</h5>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-success h-100">
                <div className="card-body">
                  <h6 className="card-subtitle text-muted mb-2">
                    <i className="bi bi-clock"></i> Status
                  </h6>
                  <span className={`badge ${
                    exam?.status === "Upcoming" ? "bg-primary" :
                    exam?.status === "Ongoing" ? "bg-success" : "bg-danger"
                  }`}>
                    {exam?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-warning h-100">
                <div className="card-body">
                  <h6 className="card-subtitle text-muted mb-2">
                    <i className="bi bi-person-badge"></i> ID
                  </h6>
                  <h5 className="card-title mb-0">{exam?.secondaryId}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-calendar-event"></i>
                Exam Timeline
              </h5>
              <div className="d-flex justify-content-around align-items-center flex-wrap">
                <div className="text-center p-3">
                  <div className="text-muted small">Starting Date</div>
                  <div className="fw-bold">
                    {new Date(exam?.startingDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="vr"></div>
                <div className="text-center p-3">
                  <div className="text-muted small">Ending Date</div>
                  <div className="fw-bold">
                    {new Date(exam?.endingDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-info-circle"></i>
                Instructions
              </h5>
              <p className="card-text">{exam?.examInstructions || "No instructions provided"}</p>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-book"></i>
                Subject Details
              </h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Marks</th>
                      <th>Status</th>
                      <th>Staff Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam?.subjects?.map((subject, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(subject.examDate).toLocaleDateString()}</td>
                        <td>{subject.startTime} - {subject.endTime}</td>
                        <td>
                          <div>Total: {subject.totalMarks}</div>
                          <small className="text-muted">Passing: {subject.passingMarks}</small>
                        </td>
                        <td>
                          <span className={`badge ${
                            subject.status === "Scheduled" ? "bg-info" :
                            subject.status === "Completed" ? "bg-success" : "bg-warning"
                          }`}>
                            {subject.status}
                          </span>
                        </td>
                        <td>{subject.typeOfStaff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails; 