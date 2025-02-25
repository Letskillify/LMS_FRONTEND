import React, { useState } from "react";
import GlobalTable from "../../../GlobalComponents/GlobalTable";

function SubmittedData({ setTablepopup, Tablepopup, submitData, userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  // Helper function to truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return {
      short: text.slice(0, maxLength) + "...",
      full: text
    };
  };

  // Helper function to toggle expanded state
  const toggleExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getFileType = (url) => {
    if (!url) return null;
    const extension = url.split('.').pop().toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    return 'other';
  };

  const headerTable = ["Student Name", "Submission Date", "Feedback", "File"];
  const tableData = submitData?.map((homework) => {
    const feedbackText = truncateText(homework?.feedback);
    const studentName = `${homework?.studentId?.personalDetails?.firstName || ''} ${homework?.studentId?.personalDetails?.lastName || ''}`;
    const studentNameText = truncateText(studentName);

    return {
      homework: homework,
      "Student Name": typeof studentNameText === 'string' ? studentNameText : (
        <div>
          {expandedRows[`name_${homework._id}`] ? studentNameText.full : studentNameText.short}
          {typeof studentNameText === 'object' && (
            <button
              className="btn btn-link btn-sm p-0 ms-1"
              onClick={() => toggleExpand(`name_${homework._id}`)}
            >
              {expandedRows[`name_${homework._id}`] ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
      ),
      "Submission Date": homework?.submissionDate
        ? new Date(homework?.submissionDate).toLocaleDateString()
        : "",
      "Feedback": typeof feedbackText === 'string' ? feedbackText : (
        <div>
          {expandedRows[`feedback_${homework._id}`] ? feedbackText.full : feedbackText.short}
          {typeof feedbackText === 'object' && (
            <button
              className="btn btn-link btn-sm p-0 ms-1"
              onClick={() => toggleExpand(`feedback_${homework._id}`)}
            >
              {expandedRows[`feedback_${homework._id}`] ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
      ),
      "File": (
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="d-flex align-items-center pointer"
            role="button"
            onClick={() => setSelectedFile(homework)}
          >
            {getFileType(homework.fileUrl) === 'pdf' ? (
              <div className="d-flex align-items-center">
                <i className="fa fa-file-pdf-o fa-2x text-danger"></i>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <img
                  src={homework.fileUrl}
                  alt="preview"
                  className="rounded"
                  width="40"
                  height="40"
                />
              </div>
            )}
          </div>
          <a
            href={homework.fileUrl}
            download
            className="btn btn-sm btn-primary ms-2"
            title="Download"
          >
            <i className="fa fa-download"></i>
          </a>
        </div>
      ),
    };
  });

  return (
    <>
      {/* Submissions Table Modal */}
      {Tablepopup && (
        <div className="modal show d-block" tabIndex="-1" style={{background: "#100f0f8c"}}>
          <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-xl">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">Submitted Homework</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setTablepopup(false)}
                ></button>
              </div>
              <div className="modal-body p-3">
                <div className="table-responsive">
                  <GlobalTable
                    headers={headerTable}
                    data={tableData}
                    noDataMessage={"No submissions available"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="modal show d-block" tabIndex="-1" style={{background: "#100f0f8c"}}>
          <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-xl">
            <div className="modal-content">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">
                  {getFileType(selectedFile.fileUrl) === 'pdf' ? 'PDF Document' : 'Submitted Image'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedFile(null)}
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      {getFileType(selectedFile.fileUrl) === 'pdf' ? (
                        <div className="ratio ratio-1x1 ratio-md-16x9">
                          <iframe
                            src={selectedFile.fileUrl}
                            title="PDF Viewer"
                            className="w-100 h-100 border-0"
                            style={{ minHeight: '50vh' }}
                          ></iframe>
                        </div>
                      ) : (
                        <div className="text-center p-3">
                          <img
                            src={selectedFile.fileUrl}
                            alt="submission"
                            className="img-fluid rounded mw-100"
                            style={{ 
                              maxHeight: '50vh',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top bg-light">
                <div className="container-fluid px-0">
                  <div className="row g-2 align-items-center">
                    <div className="col-12 col-sm-6">
                      <a
                        href={selectedFile.fileUrl}
                        download
                        className="btn btn-primary w-100"
                      >
                        <i className="fa fa-download me-2"></i>
                        Download {getFileType(selectedFile.fileUrl) === 'pdf' ? 'PDF' : 'Image'}
                      </a>
                    </div>
                    <div className="col-12 col-sm-6 text-end">
                      <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={() => setSelectedFile(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubmittedData;
