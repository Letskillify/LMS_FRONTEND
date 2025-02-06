import React from "react";

const PrintSlip = () => {
  return (
    <div className="modal fade" id="modalCenter02" tabIndex="-1">
      <div
        className="modal-dialog modal-dialog-centered manage-xl"
        role="document"
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
                    src="/image/stu-img.png"
                    className="rounded-circle border"
                    width="100px"
                    alt="Student"
                  />
                </div>
                <div className="col-12 col-md-9">
                  <h2 className="pt-4 pb-2 ps-3 mb-0" style={{ color: "#fff" }}>
                    XYZ School Name
                  </h2>
                  <p>Education session: 2023-24</p>
                  <div className="row">
                    <span style={{ fontSize: "11px" }} className="col-6">
                      Address: xyz
                    </span>
                    <span style={{ fontSize: "11px" }} className="col-6">
                      Phone: +0987654321
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="mt-2 mx-auto px-3 mb-0">Payment Slip</h4>
              <hr />

              {/* Payment Details Section */}
              <div className="row">
                <div className="col-12 col-md-6 text-start">
                  <h5>Paid to:</h5>
                  <p>EMP Id:</p>
                  <p>EMP Name:</p>
                </div>
                <div className="col-12 col-md-6 text-end">
                  <h5>Payment Details:</h5>
                  <p>Slip No:</p>
                  <p>Issued By:</p>
                  <p>Date:</p>
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

              {/* Formula Section */}
              <div className="col-12 text-start">
                <h5 className="mt-4">Formula we used</h5>
                <p className="text-wrap">
                  Your Per Hour Salary x monthly worked hours - Loan installment
                  deduction = Generated Salary
                </p>
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
                onClick={() => window.print()}
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
