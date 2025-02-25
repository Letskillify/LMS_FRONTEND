import React, { useRef } from "react";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { useReactToPrint } from "react-to-print";

const ExamReport = () => {
  const { Institute } = getCommonCredentials();
  const showToast = useGlobalToast();
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Exam_Report",
    onBeforePrint: () => showToast("Preparing to print...", "info"),
    onAfterPrint: () => showToast("Printed successfully!", "success"),
  });

  return (
    <div className="container mt-4" ref={printRef}>
      <div className="row mb-4 ">
        {[
          { title: "Total Exams", count: 1, bg: "bg-danger" },
          { title: "Declared Results", count: 0, bg: "bg-warning" },
          { title: "Total Tests", count: 3, bg: "bg-primary" },
          { title: "Declared Results", count: 0, bg: "bg-secondary" },
        ].map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className={`card ${item.bg} text-white shadow-sm`}>
              <div className="card-body text-center">
                <h4 className="mb-1 text-white">{item.count}</h4>
                <p className="mb-0">{item.title}</p>
              </div>
              <button
                className={`btn w-100 text-white`}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} 
              >
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0 text-white">Printable Exam Reports</h5>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3">
              <h6 className="mt-3">Blank Tabulation Sheet</h6>
              <p>Print a blank tabulation sheet for organizing marks data.</p>
              <button className="btn btn-dark btn-sm" onClick={handlePrint}>
                <i className="fa fa-print me-1"></i> Print
              </button>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="mt-3">Blank Attendance Sheet</h6>
              <p>Print a blank attendance sheet to track students in exams.</p>
              <button className="btn btn-dark btn-sm" onClick={handlePrint}>
                <i className="fa fa-print me-1"></i> Print
              </button>
            </div>
          </div>
          <hr />
          <small className="text-muted">
            Note: Please ensure all reports are printed in A4 size for optimal viewing.
          </small>
        </div>
      </div>
    </div>
  );
};

export default ExamReport;
