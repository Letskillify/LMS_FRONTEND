import React, { useState, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SalaryGeneration = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const [salaryData, setSalaryData] = useState({
    campus: "",
    month: currentMonth,
    year: currentYear,
    deduction: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 51 }, (_, i) => currentYear + i);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalaryData({ ...salaryData, [name]: value });
  };

  const handleGenerateSalary = async () => {
    const response = await fetch(`${BASE_URL}/api/salary/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(salaryData),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <>
      <div className="container-fluid container-p-y">
        <h4 className="fw-bold py-3">
          <span className="text-muted fw-light">Dashboard /</span> Salary Generation
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
          Salary Generation
        </div>
        <div className="bg-white pb-4 mx-2">
          <form>
            <div className="row mx-auto w-75 py-3">
              <div className="col-6 ps-4">
                <label className="mb-2 font-weight-bold" htmlFor="campus">
                  Campus
                </label>
                <select
                  className="w-75 form-select"
                  id="campus"
                  name="campus"
                  value={salaryData.campus}
                  onChange={handleInputChange}
                >
                  <option value="Main Campus">Main Campus</option>
                  <option value="Outer Campus">Outer Campus</option>
                </select>
              </div>
              <div className="col-6 ps-4">
                <label className="mb-2 font-weight-bold" htmlFor="month">
                  Month
                </label>
                <select
                  className="w-75 form-select"
                  id="month"
                  name="month"
                  value={salaryData.month}
                  onChange={handleInputChange}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mx-auto w-75 py-3">
              <div className="col-6 ps-4">
                <label className="mb-2 font-weight-bold" htmlFor="year">
                  Year
                </label>
                <select
                  className="w-75 form-select"
                  id="year"
                  name="year"
                  value={salaryData.year}
                  onChange={handleInputChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6 ps-4">
                <label className="mb-2 font-weight-bold" htmlFor="deduction">
                  Deduction Per Late Arrival
                </label>
                <input
                  type="tel"
                  className="w-75 form-control"
                  id="deduction"
                  name="deduction"
                  value={salaryData.deduction}
                  onChange={handleInputChange}
                />
              </div>
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
    </>
  );
};

export default SalaryGeneration;
