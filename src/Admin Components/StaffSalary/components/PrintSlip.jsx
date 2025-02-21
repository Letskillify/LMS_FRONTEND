import React, { useEffect, useState } from "react";

const PrintSlip = ({ data }) => {
  const [dataForPrintScript, setDataForPrintScript] = useState({});

  useEffect(() => {
    setDataForPrintScript(data);
    console.log("dataForPrintScript", data);
  }, [data]);

  const handlePrintSlip = () => {
    const printContent = document.getElementById("printableArea");
    if (!printContent) return;

    const newWin = window.open("", "_blank");

    // Copy all stylesheets dynamically
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("");
        } catch (e) {
          return "";
        }
      })
      .join("\n");

    newWin.document.write(`
      <html>
        <head>
          <title>Print Slip</title>
          <style>
            ${styles} /* Inject copied styles */
            body { font-family: Arial, sans-serif; padding: 20px; }
            .table-bordered { border-collapse: collapse; width: 100%; }
            .table-bordered th, .table-bordered td { border: 1px solid black; padding: 8px; }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    newWin.document.close();
    newWin.focus();
    setTimeout(() => {
      newWin.print();
      newWin.close();
    }, 500);
  };

  return (
    <div className="modal fade" id="modalCenter02" tabIndex="-1">
      <div
        className="modal-dialog modal-dialog-centered manage-xl"
        role="document"
        id="printableArea"
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body py-0">
            <div className="nav-align-top mb-4">
              {/* Header Section */}
              <div
                className="row py-3 box mb-4 rounded"
                style={{
                  color: "#fff",
                  fontSize: "15px",
                  backgroundColor: "#202278ec",
                }}
              >
                <div className="col-12 col-md-3 text-center">
                  <img
                    src={
                      dataForPrintScript?.staff?.instituteId?.logo ||
                      "/image/stu-img.png"
                    }
                    className="rounded-circle border"
                    width="100px"
                    alt="Student"
                  />
                </div>
                <div className="col-12 text-center col-md-9">
                  <h2 className="pt-2 pb-2 mb-0" style={{ color: "#fff" }}>
                    {dataForPrintScript?.staff?.instituteId?.name}
                  </h2>
                  <p className="mb-0">
                    Education session:{" "}
                    {dataForPrintScript?.session ||
                      `${new Date().getFullYear() - 1}-${new Date()
                        .getFullYear()
                        .toString()
                        .slice(-2)}`}
                  </p>
                  <div className="row">
                    <span style={{ fontSize: "11px" }} className="col-12">
                      Address:{" "}
                      {dataForPrintScript?.staff?.instituteId?.address?.line1}
                    </span>
                    <span style={{ fontSize: "11px" }} className="col-12">
                      Phone:{" "}
                      {
                        dataForPrintScript?.staff?.instituteId?.contactInfo
                          ?.landline
                      }
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="mt-2 mx-auto px-3 mb-0">Salary Slip</h4>
              <hr />

              {/* Payment Details Section */}
              <div className="row d-flex justify-content-between">
                <div className="col-md-6 text-start">
                  <h5>Paid to:</h5>
                  <p>
                    EMP Id:{" "}
                    <span className="fw-bold">
                      {dataForPrintScript?.staff?.StaffID}
                    </span>
                  </p>
                  <p>
                    EMP Name:{" "}
                    <span className="fw-bold">
                      {dataForPrintScript?.staff?.fullName?.firstName}{" "}
                      {dataForPrintScript?.staff?.fullName?.lastName}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 text-end">
                  <h5>Payment Details:</h5>
                  <p>
                    Slip No:{" "}
                    <span className="fw-bold">
                      {dataForPrintScript?.slipNo ||
                        `${dataForPrintScript?.staff?.fullName?.firstName}_${dataForPrintScript?.staff?.StaffID}`}
                    </span>
                  </p>
                  <p>
                    Issued By:{" "}
                    <span className="fw-bold">
                      {dataForPrintScript?.issuedBy || "Admin"}
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    {dataForPrintScript?.date ||
                      new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Responsive Table Section */}
              <div className="slip-css p-1 table-responsive">
                <table className=" table-bordered text-center">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Salary Month</th>
                      <th>Basic Salary</th>
                      <th>Present Days</th>
                      <th>Absent Days</th>
                      <th>Total Hours</th>
                      <th>Salary Generation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>July-2023</td>
                      <td>100 per lecture</td>
                      <td>3</td>
                      <td>0</td>
                      <td>2</td>
                      <td>Rs.300</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>August-2023</td>
                      <td>120 per lecture</td>
                      <td>4</td>
                      <td>1</td>
                      <td>3</td>
                      <td>Rs.480</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary Section */}
              <div className="row">
                <div className="col-12 col-md-6 text-start">
                  <p>
                    <b>Sub Total amount:</b>
                  </p>
                  <p>
                    <b>Deductions:</b>
                  </p>
                  <p>
                    <b>Bonus:</b>
                  </p>
                </div>
                <div className="col-12 col-md-6 text-start">
                  <p>
                    <b>Loan Installment:</b>
                  </p>
                  <p>
                    <b>Grand Total:</b>
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="text-center print-hide d-flex flex-wrap justify-content-center mb-3">
              <button
                className="btn btn-danger mt-2 mx-2 px-3"
                onClick={() => handlePrintSlip()}
              >
                Print Slip
              </button>
              <button
                className="btn btn-secondary mt-2 mx-2 px-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintSlip;
