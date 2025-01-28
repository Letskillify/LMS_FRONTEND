import React from "react";

const EmploymentAndSalaryDetailsForm = ({ formData, handleChange }) => {
  return (
    <div className="container">
      <h2>Employment Details</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Role:</label>
          <input
            type="text"
            className="form-control"
            name="employeementDetails.role"
            value={formData.employeementDetails.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Joining Date:</label>
          <input
            type="date"
            className="form-control"
            name="employeementDetails.joiningDate"
            value={formData.employeementDetails.joiningDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Designation:</label>
          <input
            type="text"
            className="form-control"
            name="employeementDetails.designation"
            value={formData.employeementDetails.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Department:</label>
          <input
            type="text"
            className="form-control"
            name="employeementDetails.department"
            value={formData.employeementDetails.department}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Employment Type:</label>
          <input
            type="text"
            className="form-control"
            name="employeementDetails.employmentType"
            value={formData.employeementDetails.employmentType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Employee Status:</label>
          <input
            type="text"
            className="form-control"
            name="employeementDetails.employeeStatus"
            value={formData.employeementDetails.employeeStatus}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h2>Salary Details</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Base Salary:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.baseSalary"
            value={formData.salaryDetails.baseSalary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Allowances:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.allowances"
            value={formData.salaryDetails.allowances}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">PF Deduction:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.deductions.PF"
            value={formData.salaryDetails.deductions.PF}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">TDS Deduction:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.deductions.TDS"
            value={formData.salaryDetails.deductions.TDS}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Net Salary:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.netSalary"
            value={formData.salaryDetails.netSalary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Salary Package:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.salaryPackage"
            value={formData.salaryDetails.salaryPackage}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Payment Method:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.paymentMethod"
            value={formData.salaryDetails.paymentMethod}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EmploymentAndSalaryDetailsForm;
