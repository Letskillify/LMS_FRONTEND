import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../Controller/MainProvider";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Bootstrap Modal for popup

function Leaveinstitute() {
  const [leaves, setLeaves] = useState([]);
  const { instituteId } = useContext(MainContext);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `/api/leaves/get/institute/${instituteId}`
      );
      setLeaves(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.error(error.response?.data || error.message);
    }
  };
  console.log(instituteId);

  useEffect(() => {
    fetchLeaves();
  }, [instituteId]);

  const handleView = (leave) => {
    setSelectedLeave(leave);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setSelectedLeave(null);
  };

  const handleStatusUpdate = async (id, value) => {
    try {
      await axios.put(`/api/leaves/update/${id}`, { status: value });
      fetchLeaves(); // Refresh data after update
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="mt-5 bg-white shadow rounded p-4">
          <h3 className="p-3 text-center mb-4 border-bottom">
            Apply Leave Status
          </h3>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table">
                <tr>
                  <th className="text-center">Attachments</th>
                  <th>Leave Type</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Applied By</th>
                  <th>Duration</th>
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
                    <td>{leave.user || "-"}</td>
                    <td>{leave.endDate ? new Date(leave.endDate).toLocaleDateString() : "-"}</td>
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
                    <td className="text-center">
                      <button
                        className="btn btn-light btn-sm shadow-sm"
                        title="View"
                        onClick={() => handleView(leave)}
                      >
                        <i className="fa fa-eye text-primary"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal show={showPopup} onHide={handleClose} centered>
          {/* Modal Header */}
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>📝 Leave Application</Modal.Title>
          </Modal.Header>

          {/* Modal Body */}
          <Modal.Body>
            {selectedLeave && (
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="text-center text-primary fw-bold mb-3">
                    <i className="fas fa-user-circle me-2"></i>{" "}
                    {selectedLeave.user || "Unknown User"}
                  </h5>

                  {/* Leave Details */}
                  <div className="row">

                  <div className="col-6 mb-3">
                    <label className="form-label fw-bold">Leave Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedLeave.typeOfLeave || ""}
                      disabled
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label className="form-label fw-bold">Leave User</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedLeave.user || "--"}
                      disabled
                    />
                  </div>
                  </div>

                  {/* Conditional Rendering for Leave Type */}
                  <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label fw-bold">
                      Half-Day Leave
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedLeave.halfDay ? "Yes" : "No "}
                      disabled
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label fw-bold">
                      Multiple-Days Leave
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedLeave.multipleDays ? "Yes" : "No"}
                      disabled
                    />
                  </div>
                  </div>

                  {selectedLeave.multipleDays ? (
                    <>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label fw-bold">
                          Start Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={new Date(
                            selectedLeave.startDate
                          ).toLocaleDateString()}
                          disabled
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label fw-bold">
                          End Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={new Date(
                            selectedLeave.endDate
                          ).toLocaleDateString()}
                          disabled
                        />
                      </div>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label fw-bold">Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={new Date(
                          selectedLeave.date
                        ).toLocaleDateString()}
                        disabled
                      />
                    </div>
                  )}
                   <div className="mb-3">
                    <label className="form-label fw-bold">Leave Reason</label>
                    <textarea className="form-control" rows="2" disabled>
                      {selectedLeave.reason || "No reason provided"}
                    </textarea>
                  </div>

                  {/* Attachment Preview */}
                  {selectedLeave.attachments && (
                    <div className="text-center mt-3">
                      <label className="form-label fw-bold">
                        Attachment
                      </label>
                      <img
                        src={selectedLeave.attachments}
                        className="img-fluid rounded shadow-sm border p-2"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        alt="Attachment"
                        onClick={() => window.open(selectedLeave.attachments)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>

          {/* Modal Footer with Buttons */}
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="outline-danger"
              className="fw-bold px-4"
              onClick={() => handleStatusUpdate(selectedLeave._id, "Rejected")}
            >
             Reject
            </Button>
            <Button
              variant="outline-success"
              className="fw-bold px-4"
              onClick={() => handleStatusUpdate(selectedLeave._id, "Approved")}
            >
              Approve
            </Button>
            <Button
              variant="secondary"
              className="fw-bold px-4"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Leaveinstitute;
