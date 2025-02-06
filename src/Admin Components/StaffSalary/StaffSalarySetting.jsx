import React, { useContext, useEffect, useState } from "react";
import GlobalToast from "../../GlobalComponents/GlobalToast";
import {
  CREATE_SALARY,
  CREATE_SALARY_ALLOWANCE,
  GENERATE_SALARY_SETTINGS,
  GET_ALL_ALLOWANCES,
  GET_ALL_DEDUCTIONS,
  GET_SALARY_SETTINGS,
  UPDATE_SALARY_SETTINGS_BY_ID,
} from "../../ApiConstants/Routes";
import { MainContext } from "../../Controller/MainProvider";
import axios from "axios";

const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SalaryGeneration = () => {
  const { instituteId } = useContext(MainContext);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [deductions, setDeductions] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [allowanceDeductions, setAllowanceDeductions] = useState([
    ...deductions,
    ...allowances,
  ]);
  const [isSalarySettingsAvailable, setIsSalarySettingsAvailable] =
    useState(false);
  const showToast = GlobalToast();
  const [formData, setFormData] = useState({
    campus: "",
    month: currentMonth,
    year: currentYear,
    deduction: 0,
    lateArrivalTime: "",
    freeAbsents: "",
    deductSalaryOnLeave: true,
    workingDays: 0,
    type: "allowances",
    name: "",
    amountType: "",
    value: "",
  });

  const fields = [
    {
      label: "Campus",
      name: "campus",
      type: "select",
      options: ["Main Campus", "Outer Campus"],
    },
    { label: "Month", name: "month", type: "select", options: months },
    { label: "Year", name: "year", type: "select", options: years },
    { label: "Deduction Per Late Arrival", name: "deduction", type: "number" },
    { label: "Late Arrival Time", name: "lateArrivalTime", type: "time" },
    { label: "Free Absents", name: "freeAbsents", type: "text" },
    {
      label: "Deduct Salary on Leave",
      name: "deductSalaryOnLeave",
      type: "select",
      options: [true, false],
    },
    { label: "Working Days", name: "workingDays", type: "number" },
    {
      label: "Type",
      name: "type",
      type: "radio",
      options: ["allowance", "deduction"],
    },
    { label: "Name", name: "name", type: "text", fullWidth: true },
    {
      label: "Amount Type",
      name: "amountType",
      type: "select",
      options: ["fixed", "percentage"],
    },
    {
      label: "Value",
      name: "value",
      type: "number",
      disabled: !formData.amountType,
    },
  ];

  useEffect(() => {
    if (!instituteId) return;

    const fetchSalarySettings = async () => {
      try {
        const response = await axios.get(
          `${GET_SALARY_SETTINGS}?instituteId=${instituteId}&month=${currentMonth}&year=${currentYear}`
        );
        if (response.data && response.status === 200) {
          setIsSalarySettingsAvailable(true);
          setFormData((prevData) => ({
            ...prevData,
            ...response.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching salary settings:", error);
      }
    };

    const fetchAllowances = async () => {
      try {
        const response = await axios.get(`${GET_ALL_ALLOWANCES}`);
        console.log(response);
        if (response.data && response.status === 200) {
          setAllowances(response.data);
        }
      } catch (error) {
        console.error("Error fetching allowances:", error);
      }
    };

    const fetchDeductions = async () => {
      try {
        const response = await axios.get(`${GET_ALL_DEDUCTIONS}`);
        console.log(response);
        if (response.data && response.status === 200) {
          setDeductions(response.data);
        }
      } catch (error) {
        console.error("Error fetching allowances:", error);
      }
    };

    fetchDeductions();
    fetchAllowances();
    fetchSalarySettings();
  }, [instituteId, currentMonth, currentYear]);

  useEffect(() => {
    const mappedDeductions = deductions.map((d) => ({
      type: "deduction",
      ...d,
    }));

    const mappedAllowances = allowances.map((a) => ({
      type: "allowance",
      ...a,
    }));

    setAllowanceDeductions([...mappedDeductions, ...mappedAllowances]);
  }, [allowances, deductions]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSalarySettingsSubmit = async () => {
    const salaryData = {
      instituteId: instituteId,
      month: formData.month,
      year: formData.year,
      campus: formData.campus,
      deductionPerLateArrival: formData.deduction,
      lateArrivalTime: formData.lateArrivalTime,
      freeAbsents: formData.freeAbsents,
      deductSalaryOnLeave: formData.deductSalaryOnLeave,
      workingDays: formData.workingDays,
    };

    const URL = isSalarySettingsAvailable
      ? `${UPDATE_SALARY_SETTINGS_BY_ID}?instituteId=${instituteId}&month=${currentMonth}&year=${currentYear}`
      : GENERATE_SALARY_SETTINGS;
    try {
      const response = await axios.post(URL, salaryData);
      console.log(response);
      showToast("Salary settings updated successfully!", "success");
    } catch (error) {
      console.error("Error updating salary settings:", error);
      showToast("Error updating salary settings.", "error");
    }
  };

  // Handle Allowance/Deduction Submission
  const handleAllowanceDeductionSubmit = async () => {
    if (formData.type === "" || !formData.name || !formData.value) {
      showToast("Please fill all required fields.", "error");
      return;
    }

    try {
      const URL = `/api/salary/${formData.type}/post`;
      const response = await axios.post(URL, {
        allowanceName: formData.name,
        instituteId: instituteId,
      });
      console.log(response);
      showToast(
        `${
          formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
        } added successfully!`,
        "success"
      );
    } catch (error) {
      console.error("Error adding allowance/deduction:", error);
      showToast("Error adding allowance/deduction.", "error");
    }
  };

  return (
    <div className="container-fluid container-p-y">
      <h4 className="fw-bold py-3">
        <span className="text-muted fw-light">Dashboard /</span> Salary Settings
      </h4>
      <div
        className="ps-2 py-2 border rounded"
        style={{ color: "#fff", backgroundColor: "#013473", fontSize: "19px" }}
      >
        <i className="fa fa-arrow-circle-o-right me-2" aria-hidden="true"></i>
        Settings
      </div>

      <div className="bg-white pb-4 mx-2">
        <form className="w-75 mx-auto py-3">
          <div className="row g-3">
            {fields.map(
              ({ label, name, type, options, fullWidth, disabled }, index) => (
                <div
                  className={fullWidth ? `col-md-12` : `col-md-6`}
                  key={index}
                >
                  <label className="form-label fw-bold" htmlFor={name}>
                    {label} <span className="text-danger">*</span>
                  </label>

                  {type === "select" ? (
                    <select
                      className="form-select"
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select {label}
                      </option>
                      {options.map((option, i) => (
                        <option key={i} value={option}>
                          {name === "deductSalaryOnLeave"
                            ? option
                              ? "Yes"
                              : "No"
                            : option}
                        </option>
                      ))}
                    </select>
                  ) : type === "radio" ? (
                    <div>
                      {options.map((option, i) => (
                        <div key={i} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id={`${name}-${option}`}
                            name={name}
                            value={option}
                            checked={formData[name] === option}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`${name}-${option}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <input
                      className="form-control"
                      id={name}
                      name={name}
                      type={type}
                      min={0}
                      required
                      value={formData[name]}
                      onChange={handleInputChange}
                      disabled={disabled}
                    />
                  )}
                </div>
              )
            )}
          </div>

          <div className="text-end mt-3">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={handleSalarySettingsSubmit}
            >
              Submit Settings
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAllowanceDeductionSubmit}
            >
              Add Allowance/Deduction
            </button>
          </div>
        </form>

        <div className="w-75 mx-auto py-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Allowance/Deduction Type</th>
                <th>Allowance/Deduction Name</th>
                <th>Allowance/Deduction Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allowanceDeductions.map((allowanceDeduction) => (
                <tr key={allowanceDeduction._id}>
                  <td>{allowanceDeduction?.type}</td>
                  <td>
                    {allowanceDeduction.allowanceName ||
                      allowanceDeduction.deductionName}
                  </td>
                  <td>
                    {allowanceDeduction.amount || allowanceDeduction.amount}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      // onClick={() =>
                      //   handleDeleteAllowanceDeduction(allowanceDeduction._id)
                      // }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryGeneration;
