import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
import GlobalToast from "../../GlobalComponents/GlobalToast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
];

const SalaryGeneration = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const showToast = GlobalToast();

  const [salaryData, setSalaryData] = useState({
    campus: "",
    month: currentMonth,
    year: currentYear,
    deduction: 0,
    lateArrivalTime: "",
    freeAbsents: "",
    deductSalaryOnLeave: true,
    workingDays: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalaryData({ ...salaryData, [name]: value });
  };

  const handleGenerateSalary = async () => {
    if (
      !salaryData.year ||
      !salaryData.month ||
      !salaryData.campus ||
      salaryData.workingDays < 1 ||
      salaryData.workingDays > 31 ||
      salaryData.deduction < 0 ||
      salaryData.freeAbsents < 0
    ) {
      return showToast(
        "Please fill all the required fields correctly",
        "error"
      );
    }
    try {
      const response = await fetch(`/api/salary/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salaryData),
      });
      const data = await response.json();

      if (response.ok) {
        showToast(data.message, "success");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast("Something went wrong!", "error");
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
            {fields.map(({ label, name, type, options }, index) => (
              <div className="col-md-6" key={index}>
                <label className="form-label fw-bold" htmlFor={name}>
                  {label} <span className="text-danger">*</span>
                </label>
                {type === "select" ? (
                  <select
                    className="form-select"
                    id={name}
                    name={name}
                    value={salaryData[name]}
                    onChange={handleInputChange}
                  >
                    {options.map((option, i) => (
                      <option key={i} value={option}>
                        {name === "deductSalaryOnLeave"
                          ? option === true
                            ? "Yes"
                            : option === false
                            ? "No"
                            : option
                          : option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="form-control"
                    id={name}
                    name={name}
                    type={type}
                    min={0}
                    required={true}
                    value={salaryData[name]}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateSalary}
            >
              Generate Salary <i className="fa fa-thumbs-up"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryGeneration;
