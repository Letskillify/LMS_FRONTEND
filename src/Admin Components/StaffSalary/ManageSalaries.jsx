import { useEffect, useState } from "react";
import { GET_ALL_SALARIES } from "../../ApiConstants/Routes";
import { Spinner } from "react-bootstrap";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import AddSalaryModal from "./AddSalaryModal";
import Json from "./manageSalaries.json";

const ManageSalaries = () => {
  const showToast = useGlobalToast();
  const [salaryData, setSalaryData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [allowanceData, setAllowanceData] = useState([]);
  const [deductionData, setDeductionData] = useState([]);
  const [currentSalaryStaff, setCurrentSalaryStaff] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAddSalaryModal, setShowAddSalaryModal] = useState(false);
  const [staffType, setStaffType] = useState("");
  const [modalFormData, setModalFormData] = useState({
    staff: "",
    staffType: "",
    basicSalary: "",
    allowances: [],
    deductions: [],
    netSalary: "",
    salaryMonth: new Date().toISOString().slice(0, 7),
    present: "",
    absent: "",
    late: "",
    loanRepayment: "",
  });

  const totalPages = Math.ceil(Json.length / itemsPerPage);
  const CurrentItem = Json.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const [form, setForm] = useState(false);
  const toggleAddSalaryModal = () => {
    setStaffData([]);
    setStaffType("");
    setShowAddSalaryModal(!showAddSalaryModal);
    setModalFormData({
      staff: "",
      staffType: "",
      basicSalary: "",
      allowances: [],
      deductions: [],
      netSalary: "",
      salaryMonth: new Date().toISOString().slice(0, 7),
      present: "",
      absent: "",
      late: "",
      loanRepayment: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${GET_ALL_SALARIES}`);
      const data = await response.json();
      if (
        response.status === 200 ||
        response.status === 304 ||
        response.success
      ) {
        setSalaryData(data);
        setIsLoading(false);
      } else {
        showToast("Something went wrong!", "error");
        setIsLoading(false);
      }
    };

    const fetchSalaryAllowance = async () => {
      const response = await fetch(`/api/salary/allowance/get`);
      const data = await response.json();
      if (response.ok) {
        setAllowanceData(data);
      } else {
        showToast("Something went wrong!", "error");
      }
    };

    const fetchSalaryDeduction = async () => {
      const response = await fetch(`/api/salary/deduction/get`);
      const data = await response.json();
      if (response.ok) {
        setDeductionData(data);
      } else {
        showToast("Something went wrong!", "error");
      }
    };

    fetchSalaryDeduction();
    fetchSalaryAllowance();
    fetchData();
  }, []);

  const fetchStaffData = async () => {
    const response = await fetch(`/api/${staffType === "TeachingStaff" ? "teacher" : "staff"}/get-all`);
    const data = await response.json();
    if (response.ok) {
      setStaffData(data);
    } else {
      showToast("Something went wrong!", "error");
    }
  };

  useEffect(() => {
    if (staffType === "") return;
    fetchStaffData();
  }, [staffType]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />{" "}
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid container-p-y">
        <h4 className="fw-bold py-3">
          <span className="text-muted fw-light">Dashboard /</span> Manage
          Salaries
        </h4>
        <div
          className="ps-2 py-2 border rounded"
          style={{
            color: "#fff",
            backgroundColor: "#013473",
            fontSize: "19px",
          }}
        >
          <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>
          Manage Salaries
        </div>
        <div className="bg-light  mx-2 pb-3  pt-3 ">
          <div
            className="d-flex justify-content-between mb-2 py-3 pb-4"
            style={{ backgroundColor: "#b0a9a95" }}
          >
            {/* Items Per Page Selector */}
            <div className="pt-1">
              <label>
                <select
                  className="form-select ms-3"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </label>
            </div>

            <div className="manage d-flex px-4 mt-1">
              <div className="me-3 mt-1">
                <button
                  style={{ fontSize: "14px" }}
                  className="me-4 btn btn-success border"
                  onClick={toggleAddSalaryModal}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i> Add Salary
                </button>
                <button
                  style={{ fontSize: "14px" }}
                  className="me-4 btn btn-info border"
                >
                  <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "}
                  Excel
                </button>
                <button
                  style={{ fontSize: "14px" }}
                  className="me-4 btn btn-warning"
                >
                  <i className="fa fa-file-word-o" aria-hidden="true"></i> CVS
                </button>
                <button
                  style={{ fontSize: "14px" }}
                  className="me-4 btn btn-danger"
                >
                  <i className="fa fa-file-pdf-o" aria-hidden="true"></i> PDF
                </button>
                <button
                  style={{ fontSize: "14px" }}
                  className="me-4 btn btn-primary"
                >
                  <i className="fa fa-print" aria-hidden="true"></i> Print
                </button>
              </div>
            </div>
            <div className="inner mt-2 me-2 mb-1 ">
              <label htmlFor="" style={{ fontSize: "15px" }}>
                Search :{" "}
              </label>
              <input
                className="rounded"
                type="search"
                placeholder="Search"
                name=""
                id=""
              />
            </div>
          </div>
          {/* dummy */}
          {/* Student List */}
          <div className="mx-2">
            <div className=" border table-responsives text-nowrap student-attend pb-3">
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
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((salary) => (
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
                          <i
                            className="fa fa-user-circle-o fa-2x"
                            aria-hidden="true"
                          ></i>
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
                        {salary.status.toLowerCase() === "issued" && (
                          <button
                            className="btn btn-danger px-1 py-1 w-100"
                            style={{ fontSize: "13px" }}
                          >
                            {salary.delete}
                          </button>
                        )}
                        {salary.status.toLowerCase() === "pending" && (
                          <button
                            className="btn btn-success px-1 py-1 w-100"
                            style={{ fontSize: "13px" }}
                          >
                            {salary.delete}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Make Payment */}
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
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>{" "}
                              Issued Salary{" "}
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
                                        value={
                                          currentSalaryStaff?.staff?.instituteId
                                            ?.name
                                        }
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
                                          currentSalaryStaff?.staff?.fullName
                                            ?.firstName +
                                          " " +
                                          currentSalaryStaff?.staff?.fullName
                                            ?.lastName
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
                                        value={
                                          currentSalaryStaff.salaryGenerated
                                        }
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
                                  <i
                                    className="fa fa-thumbs-up"
                                    aria-hidden="true"
                                  ></i>
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
                  {/* Print slip */}
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
                                <h2
                                  className="pt-4 pb-2 ps-3 mb-0"
                                  style={{ color: "#fff" }}
                                >
                                  XYZ School Name
                                </h2>
                                <p>Education session: 2023-24</p>
                                <div className="row">
                                  <span
                                    style={{ fontSize: "11px" }}
                                    className="col-6"
                                  >
                                    Address: xyz
                                  </span>
                                  <span
                                    style={{ fontSize: "11px" }}
                                    className="col-6"
                                  >
                                    Phone: +0987654321
                                  </span>
                                </div>
                              </div>
                            </div>
                            <h4 className="mt-2 mx-auto px-3 mb-0">
                              Payment Slip
                            </h4>
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
                                Your Per Hour Salary x monthly worked hours -
                                Loan installment deduction = Generated Salary
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
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div style={{ marginTop: "1rem" }}>
                <button
                  className="btn btn-secondary px-2 py-1 me-2 "
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="tf-icon bx bx-chevrons-left"></i>
                </button>
                <span>
                  <button className="btn btn-primary px-3 py-1 me-2">
                    {currentPage}{" "}
                  </button>
                  <button className="btn btn-primary px-3 py-1 me-2">
                    {" "}
                    {totalPages}
                  </button>
                </span>
                <button
                  className="btn btn-secondary px-2 py-1 me-2"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i className="tf-icon bx bx-chevrons-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddSalaryModal
        staffData={staffData}
        show={showAddSalaryModal}
        allowanceData={allowanceData}
        deductionData={deductionData}
        staffType={staffType}
        setStaffType={setStaffType}
        handleClose={toggleAddSalaryModal}
        formData={modalFormData}
        setFormData={setModalFormData}
      />
    </>
  );
};

export default ManageSalaries;
