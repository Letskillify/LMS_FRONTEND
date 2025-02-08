import React from "react";
import MakePayment from "./MakePayment";
import PrintSlip from "./PrintSlip";

const SalaryTable = ({
  data: salaryData,
  handleDelete,
  currentSalaryStaff,
  setEditMode,
  setStaffToEdit,
  toggleAddSalaryModal,
  setEditShowModal,
  dataForPrintScript,
  setDataForPrintScript,
}) => {
  return (
    <table className=" mx-auto table table-stripedd table-striped text-center px-3">
      <thead>
        <tr className="table-headd align-text-top ">
          <th>Slip ID</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Salary Month</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Late</th>
          <th>Basic</th>
          <th>Salary Generation</th>
          <th>Amount Paid</th>
          <th>Loan Repayment</th>
          <th>Actions</th>
          <th>Status</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {salaryData?.map((salary) => (
          <tr key={salary._id}>
            <td>{salary.salaryId}</td>
            <td>
              {salary?.photo ? (
                <img
                  width="30px"
                  className="rounded-circle"
                  src={salary?.photo || "/placeholder.svg"}
                  alt="User Profile"
                />
              ) : (
                <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
              )}
            </td>
            <td>
              {salary?.staff?.fullName?.firstName}{" "}
              {salary?.staff?.fullName?.lastName}
            </td>
            <td>{salary.salaryMonth}</td>
            <td>{salary.present}</td>
            <td>{salary.absent}</td>
            <td>{salary.late}</td>
            <td>{salary.basicSalary}</td>
            <td>{salary.salaryGenerated}</td>
            <td>{salary.netSalary}</td>
            <td>{salary.loanRepayment}</td>
            <td>
              {salary.status.toLowerCase() === "issued" && (
                <button
                  className="btn btn-primary px-1 py-1 w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#modalCenter02"
                  style={{ fontSize: "13px" }}
                  onClick={() => {
                    setDataForPrintScript(salary);
                  }}
                >
                  Print Slip
                </button>
              )}
              {salary.status.toLowerCase() === "pending" && (
                <button
                  className="btn btn-success px-1 py-1 w-100 "
                  data-bs-toggle="modal"
                  data-bs-target="#modalCenter01"
                  onClick={() => setCurrentSalaryStaff(salary)}
                  style={{ fontSize: "13px" }}
                >
                  Make Payment
                </button>
              )}
            </td>
            <td>
              {salary.status.toLowerCase() === "issued" && (
                <button
                  className="btn btn-warning px-1 py-1 w-100"
                  style={{ fontSize: "13px" }}
                >
                  {salary.status}
                </button>
              )}
              {salary.status.toLowerCase() === "pending" && (
                <button
                  className="btn btn-danger px-1 py-1 w-100"
                  style={{ fontSize: "13px" }}
                >
                  {salary.status}
                </button>
              )}
            </td>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger px-1 py-1 w-50"
                  style={{ fontSize: "13px" }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-success px-1 py-1 w-50"
                  style={{ fontSize: "13px" }}
                  onClick={() => {
                    setEditShowModal(true);
                    setStaffToEdit(salary);
                  }}
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {/* Make Payment */}
        <MakePayment currentSalaryStaff={currentSalaryStaff} />
        {/* Print slip */}
        {dataForPrintScript && <PrintSlip data={dataForPrintScript} />}
      </tbody>
    </table>
  );
};

export default SalaryTable;
