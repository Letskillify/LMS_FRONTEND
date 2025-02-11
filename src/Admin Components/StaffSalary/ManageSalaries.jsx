import { useEffect, useState } from "react";
import {
  GET_ALL_ALLOWANCES,
  GET_ALL_DEDUCTIONS,
  GET_ALL_SALARIES,
  UPDATE_SALARY_BY_ID,
} from "../../ApiConstants/Routes";
import { Spinner } from "react-bootstrap";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import AddSalaryModal from "./components/AddSalaryModal";
import Json from "./manageSalaries.json";
import PrintSlip from "./components/PrintSlip";
import MakePayment from "./components/MakePayment";
import SalaryTable from "./components/SalaryTable";
import EditSalaryModal from "./components/EditSalaryModal";
import axios from "axios";

const ManageSalaries = () => {
  const showToast = useGlobalToast();
  const [salaryData, setSalaryData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState({});
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
  const [editModalFormData, setEditModalFormData] = useState({});
  const [editShowModal, setEditShowModal] = useState(false);
  const [dataForPrintScript, setDataForPrintScript] = useState({});

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
    setShowAddSalaryModal(true);
  };

  const handleClose = () => {
    setForm(false);
    setShowAddSalaryModal(false);
    setEditModalFormData({});
    setStaffToEdit({});
    setEditShowModal(false);
    setStaffData([]);
    setStaffType("");
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
    const response = await fetch(GET_ALL_ALLOWANCES);
    const data = await response.json();
    if (response.ok) {
      setAllowanceData(data);
    } else {
      showToast("Something went wrong!", "error");
    }
  };

  const fetchSalaryDeduction = async () => {
    const response = await fetch(GET_ALL_DEDUCTIONS);
    const data = await response.json();
    if (response.ok) {
      setDeductionData(data);
    } else {
      showToast("Something went wrong!", "error");
    }
  };

  useEffect(() => {
    fetchSalaryDeduction();
    fetchSalaryAllowance();
    fetchData();
  }, []);

  const fetchStaffData = async () => {
    const response = await fetch(
      `/api/${staffType === "TeachingStaff" ? "teacher" : "staff"}/get-all`
    );
    const data = await response.json();
    if (response.status === 200) {
      setStaffData(data);
    } else {
      showToast("Something went wrong!", "error");
    }
  };

  useEffect(() => {
    if (staffType === "") return;
    fetchStaffData();
  }, [staffType]);

  const handleUpdateSalary = (id) => {
    const UpdateData = {
      ...editModalFormData,
      allowances: editModalFormData.allowances?.map(
        ({ typeOfAllowance, amount }) => ({
          typeOfAllowance,
          amount,
        })
      ),
      deductions: editModalFormData.deductions?.map(
        ({ typeOfDeduction, amount }) => ({
          typeOfDeduction,
          amount,
        })
      ),
    };

    const res = axios
      .put(`${UPDATE_SALARY_BY_ID}/${id}`, UpdateData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200 || res.status == 201 || res.status == "Ok") {
          showToast("Salary updated successfully", "success");
          fetchData();
        } else {
          showToast("Something went wrong. Please try again later.", "error");
        }
      });
    handleClose();
    fetchData();
  };

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
                    setCurrentPage(1);
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
              <SalaryTable
                data={salaryData}
                setEditMode={setEditMode}
                setStaffToEdit={setStaffToEdit}
                currentSalaryStaff={currentSalaryStaff}
                setEditShowModal={setEditShowModal}
                dataForPrintScript={dataForPrintScript}
                setDataForPrintScript={setDataForPrintScript}
              />
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
        handleClose={handleClose}
        formData={modalFormData}
        setFormData={setModalFormData}
      />
      <EditSalaryModal
        formData={editModalFormData}
        setFormData={setEditModalFormData}
        show={editShowModal}
        handleClose={handleClose}
        salaryData={staffToEdit}
        staffData={staffData}
        allowanceData={allowanceData}
        deductionData={deductionData}
        handleUpdateSalary={handleUpdateSalary}
      />
    </>
  );
};

export default ManageSalaries;
