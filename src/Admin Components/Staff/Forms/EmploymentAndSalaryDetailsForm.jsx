import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const EmploymentAndSalaryDetailsForm = ({
  formData,
  setFormData,
  handleChange,
  roles,
  allowances,
  deductions,
}) => {
  const formatNumber = (num) => {
    if (num >= 10000000)
      return (num / 10000000).toFixed(1).replace(/\.0$/, "") + " Cr";
    if (num >= 100000)
      return (num / 100000).toFixed(1).replace(/\.0$/, "") + " L";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + " K";
    return num.toString() + " Rs";
  };

  useEffect(() => {
    setFormData((prev) => {
      const calculatedNetSalary =
        Number(formData.salaryDetails.baseSalary || 0) +
        formData.salaryDetails.allowances.reduce(
          (acc, curr) => acc + Number(curr.value || 0),
          0
        ) -
        formData.salaryDetails.deductions.reduce(
          (acc, curr) => acc + Number(curr.value || 0),
          0
        );

      return {
        ...prev,
        salaryDetails: {
          ...prev.salaryDetails,
          netSalary: calculatedNetSalary,
        },
      };
    });
    setFormData((prev) => {
      const baseSalary = Number(prev.salaryDetails.netSalary) || 0;
      const calculatedSalaryPackage = baseSalary * 12;
      return {
        ...prev,
        salaryDetails: {
          ...prev.salaryDetails,
          salaryPackage: formatNumber(calculatedSalaryPackage),
        },
      };
    });
  }, [
    formData.salaryDetails.baseSalary,
    formData.salaryDetails.netSalary,
    formData.salaryDetails.allowances,
    formData.salaryDetails.deductions,
  ]);

  const [deductionError, setDeductionError] = useState("");
  const renderTooltip = (props) => (
    <Tooltip id="deduction-tooltip" {...props}>
      {deductionError}
    </Tooltip>
  );
  const handleAllowancesChange = (selected) => {
    console.log("selected", selected);
    const updatedAllowances = selected.map((s) => ({
      typeOfAllowance: s.value.typeOfAllowance,
      amount: s.value.amount,
      type: "Fixed",
      allowanceName: s.label,
    }));

    setFormData((prev) => ({
      ...prev,
      salaryDetails: {
        ...prev.salaryDetails,
        allowances: updatedAllowances,
      },
    }));
  };

  const handleDeductionsChange = (selected) => {
    const updatedDeductions = selected.map((s) => ({
      typeOfDeduction: s.value.typeOfDeduction,
      amount: s.value.amount,
      type: "Fixed",
      deductionName: s.label,
    }));

    setFormData((prev) => ({
      ...prev,
      salaryDetails: {
        ...prev.salaryDetails,
        deductions: updatedDeductions,
      },
    }));
  };

  const defaultAllowanceOptions = formData.salaryDetails.allowances?.map(
    (allowance) => ({
      value: {
        typeOfAllowance: allowance.typeOfAllowance,
        amount: allowance.amount,
      },
      label: allowance.allowanceName,
    })
  );

  console.log("defaultAllowanceOptions", defaultAllowanceOptions);

  const defaultDeductionOptions = formData.salaryDetails.deductions?.map(
    (deduction) => ({
      value: {
        typeOfDeduction: deduction.typeOfDeduction,
        amount: deduction.amount,
      },
      label: deduction.deductionName,
    })
  );

  const allowanceOptions = allowances?.map((allowance) => ({
    value: { typeOfAllowance: allowance._id, amount: allowance.amount },
    label: allowance.allowanceName,
    isDisabled: formData.salaryDetails.allowances.some(
      (selectedAllowance) => selectedAllowance.typeOfAllowance === allowance._id
    ),
  }));

  const deductionOptions = deductions?.map((deduction) => ({
    value: { typeOfDeduction: deduction._id, amount: deduction.amount },
    label: deduction.deductionName,
    isDisabled: formData.salaryDetails.deductions.some(
      (selectedDeduction) => selectedDeduction.typeOfDeduction === deduction._id
    ),
  }));

  const allowanceName = (id) => {
    const allowance = allowances.find((allowance) => allowance._id === id);
    return allowance ? allowance.allowanceName : "";
  };

  const deductionName = (id) => {
    const deduction = deductions.find((deduction) => deduction._id === id);
    return deduction ? deduction.deductionName : "";
  };

  const handleAllowanceInputChange = (index, field, newValue) => {
    setFormData((prev) => {
      const updatedAllowances = [...prev.salaryDetails.allowances];
      updatedAllowances[index] = {
        ...updatedAllowances[index],
        [field]: newValue,
      };

      console.log("updatedAllowances", updatedAllowances);
      return {
        ...prev,
        salaryDetails: {
          ...prev.salaryDetails,
          allowances: updatedAllowances,
        },
      };
    });
  };

  const handleDeductionInputChange = (index, field, newValue) => {
    setFormData((prev) => {
      const updatedDeductions = [...prev.salaryDetails.deductions]; // Clone the deductions array
      const currentDeduction = { ...updatedDeductions[index] }; // Clone the specific deduction object

      let maxAllowed =
        currentDeduction.type === "Percentage"
          ? 100
          : Number(prev.salaryDetails.baseSalary) || 0;

      let validatedValue = Math.min(Number(newValue), maxAllowed);
      let errorMessage = "";

      if (Number(newValue) > maxAllowed) {
        errorMessage = `Deduction cannot be more than ${
          currentDeduction.type === "Percentage" ? "100%" : `₹${maxAllowed}`
        }`;
        setDeductionError(errorMessage);
      } else {
        setDeductionError("");
      }

      currentDeduction[field] = validatedValue;
      updatedDeductions[index] = currentDeduction;

      console.log("updatedDeductions", updatedDeductions);
      return {
        ...prev,
        salaryDetails: {
          ...prev.salaryDetails,
          deductions: updatedDeductions,
        },
      };
    });
  };

  return (
    <div className="container">
      <h2>Employment Details</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Role:</label>
          <select
            type="text"
            className="form-control form-select"
            name="employeementDetails.role"
            value={formData.employeementDetails.role}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select Role
            </option>
            {roles?.map((role) => (
              <option key={role._id} value={role._id}>
                {role.RoleName}
              </option>
            ))}
          </select>
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
        <div className="col-md-12">
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
        <Form.Group className="mb-3">
          <Form.Label>Allowances</Form.Label>
          <Select
            name="allowances"
            options={allowanceOptions}
            value={defaultAllowanceOptions}
            isMulti
            isSearchable
            placeholder="Search Allowances / Select Allowances"
            onChange={handleAllowancesChange}
          />
        </Form.Group>

        {formData.salaryDetails.allowances.length > 0 &&
          formData.salaryDetails.allowances.map((allowance, index) => (
            <div key={index} className="mb-3 row align-items-center">
              <div className="col-md-2">
                <Form.Label>
                  {allowanceName(allowance.typeOfAllowance)}
                </Form.Label>
              </div>
              <div className="col-md-5">
                <Form.Select
                  value={allowance.type}
                  className="rounded-0"
                  onChange={(e) =>
                    handleAllowanceInputChange(index, "type", e.target.value)
                  }
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Percentage">Percentage</option>
                </Form.Select>
              </div>
              <div className="col-md-5">
                <Form.Control
                  type="number"
                  min={0}
                  onScroll={(e) => e.target.blur()}
                  max={
                    allowance.type === "Percentage"
                      ? 100
                      : Number(formData.salaryDetails.baseSalary) || 0
                  }
                  value={allowance.amount}
                  onChange={(e) =>
                    handleAllowanceInputChange(index, "amount", e.target.value)
                  }
                  placeholder={`Enter ${allowance.type} value`}
                />
              </div>
            </div>
          ))}
        <Form.Group className="mb-3">
          <Form.Label>Deductions</Form.Label>
          <Select
            name="deductions"
            options={deductionOptions}
            value={defaultDeductionOptions}
            isMulti
            isSearchable
            placeholder="Search Deductions / Select Deductions"
            onChange={handleDeductionsChange}
          />
        </Form.Group>

        {formData.salaryDetails.deductions.length > 0 &&
          formData.salaryDetails.deductions.map((deduction, index) => (
            <div key={index} className="mb-3 row align-items-center">
              <div className="col-md-2">
                <Form.Label>
                  {deductionName(deduction.typeOfDeduction)}
                </Form.Label>
              </div>
              <div className="col-md-5">
                <Form.Select
                  className="rounded-0"
                  value={deduction.type}
                  onChange={(e) =>
                    handleDeductionInputChange(index, "type", e.target.value)
                  }
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Percentage">Percentage</option>
                </Form.Select>
              </div>
              <div className="col-md-5">
                <OverlayTrigger
                  placement="top"
                  overlay={deductionError ? renderTooltip : <></>}
                >
                  <Form.Control
                    type="number"
                    min={0}
                    onScroll={(e) => e.target.blur()}
                    max={
                      deduction.type === "Percentage"
                        ? 100
                        : Number(formData.salaryDetails.baseSalary) || 0
                    }
                    value={deduction.amount}
                    onChange={(e) =>
                      handleDeductionInputChange(
                        index,
                        "amount",
                        e.target.value
                      )
                    }
                    placeholder={`Enter ${deduction.type} value`}
                    style={{ borderColor: deductionError ? "red" : "" }}
                  />
                </OverlayTrigger>
              </div>
            </div>
          ))}
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Net Salary:</label>
          <input
            type="text"
            className="form-control"
            name="salaryDetails.netSalary"
            value={formData.salaryDetails.netSalary}
            readOnly
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
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default EmploymentAndSalaryDetailsForm;
