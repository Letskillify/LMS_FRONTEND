import React from "react";

const MakePayment = ({ handlePayment, loading, currentSalaryStaff }) => {
  return (
    <div className="modal fade " id="modalCenter01" tabIndex="-1">
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
          <div className="modal-body">
            <div className="nav-align-top mb-4">
              <h2
                className="py-4 ps-3 mb-0"
                style={{
                  color: "#fff",
                  fontSize: "15px",
                  backgroundColor: "#8e8d8dec",
                }}
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Issued
                Salary{" "}
              </h2>{" "}
              <div className="table-responsive text-nowrap">
                <table className="table-reports table table-striped ">
                  <tbody className="table-border-bottom-0 ">
                    <tr>
                      <td>Campus</td>
                      <td className="text-end">
                        <input
                          type="text"
                          name=""
                          readOnly
                          value={currentSalaryStaff?.staff?.instituteId?.name}
                          className="inpt ps-2"
                          placeholder="Enter your name "
                          id=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Employee</td>
                      <td className="text-end">
                        <input
                          type="employee"
                          className="ps-2 inpt"
                          readOnly
                          value={
                            currentSalaryStaff?.staff?.fullName?.firstName +
                            " " +
                            currentSalaryStaff?.staff?.fullName?.lastName
                          }
                          placeholder="Enter your employee"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Month</td>
                      <td className="text-end">
                        <input
                          type="salaryMonth"
                          className="ps-2 inpt"
                          value={currentSalaryStaff.salaryMonth}
                          readOnly
                          placeholder="Enter your month"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Genrated Salary</td>
                      <td className="text-end">
                        <input
                          type="generatedSalary"
                          className="ps-2 inpt"
                          readOnly
                          value={currentSalaryStaff.salaryGenerated}
                          name=""
                          id=""
                          placeholder="Enter your generatedSalary"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Amount Paid</td>
                      <td className="text-end">
                        <input
                          type="amountpaid"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your amountpaid"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Loan Repayment</td>
                      <td className="text-end">
                        <input
                          type="loan"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your loan"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Bonus Title</td>
                      <td className="text-end">
                        <input
                          type="Bonus"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your Bonus"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Deduction Amount</td>
                      <td className="text-end">
                        <input
                          type="Deduction"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your Deduction"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Payment</td>
                      <td className="text-end">
                        <input
                          type="Payment"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your Payment"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Method</td>
                      <td className="text-end">
                        <input
                          type="Method"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your Method"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Full Paid</td>
                      <td className="text-end">
                        <input
                          type="fullPaid"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your fullPaid"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Payment Date</td>
                      <td className="text-end">
                        <input
                          type="paymentDate"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your paymentDate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Notify Employee</td>
                      <td className="text-end">
                        <input
                          type="notifyEmployee"
                          className="ps-2 inpt"
                          name=""
                          id=""
                          placeholder="Enter your notifyEmployee"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center mb-3">
                  <button className="btn btn-success">
                    Save Change{" "}
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-secondary "
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

export default MakePayment;
