import axios from "axios";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { CREATE_SALARY } from "../../../ApiConstants/Routes";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";

const AddSalaryModal = ({
  staffData,
  show,
  handleClose,
  allowanceData,
  deductionData,
  staffType,
  setStaffType,
  formData,
  setFormData,
}) => {
  const showToast = useGlobalToast();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "staffType") {
      setStaffType(value);
      setFormData({
        staff: "",
        staffType: value,
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
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === "staff") {
      const selectedStaff = staffData.find(
        (s) => s._id === selectedOption.value
      );

      setFormData((prev) => ({
        ...prev,
        staff: selectedOption.value,
        basicSalary: selectedStaff.salaryDetails.baseSalary,
        netSalary: selectedStaff.salaryDetails.baseSalary,
        present: selectedStaff.attendenceDetails.totalPresent,
        absent: selectedStaff.attendenceDetails.totalAbsent,
        // late: selectedStaff.attendenceDetails.totalDays,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [actionMeta.name]: selectedOption ? selectedOption.value : "",
      }));
    }
  };

  const staffOptions = staffData?.map((staff) => ({
    value: staff._id,
    label: `${staff?.StaffID} ${staff?.fullName?.firstName} ${staff?.fullName?.lastName}`,
  }));

  const handleAllowancesChange = (selected) => {
    const updatedAllowances = selected.map((s) => ({
      typeOfAllowance: s.value.typeOfAllowance,
      amount: s.value.amount,
      type: "Fixed", // Default selection
      value: "", // Empty value initially
    }));

    setFormData((prev) => ({
      ...prev,
      allowances: updatedAllowances,
    }));
  };

  const handleDeductionsChange = (selected) => {
    const updatedDeductions = selected.map((s) => ({
      typeOfDeduction: s.value.typeOfDeduction,
      amount: s.value.amount,
      type: "Fixed", // Default selection
      value: "", // Empty value initially
    }));

    setFormData((prev) => ({
      ...prev,
      deductions: updatedDeductions,
    }));
  };

  const handleAllowanceInputChange = (index, field, newValue) => {
    setFormData((prev) => {
      const updatedAllowances = [...prev.allowances];
      updatedAllowances[index][field] = newValue;
      return { ...prev, allowances: updatedAllowances };
    });
  };

  const [deductionError, setDeductionError] = useState("");

  const handleDeductionInputChange = (index, field, newValue) => {
    setFormData((prev) => {
      const updatedDeductions = [...prev.deductions];
      let maxAllowed =
        updatedDeductions[index].type === "Percentage"
          ? 100
          : Number(prev.basicSalary) || 0;

      let validatedValue = Math.min(Number(newValue), maxAllowed);

      if (Number(newValue) > maxAllowed) {
        setDeductionError(
          `Deduction cannot be more than ${
            updatedDeductions[index].type === "Percentage"
              ? "100%"
              : `₹${maxAllowed}`
          }`
        );
      } else {
        setDeductionError("");
      }

      updatedDeductions[index][field] = validatedValue;
      return { ...prev, deductions: updatedDeductions };
    });
  };

  const allowanceOptions = allowanceData?.map((allowance) => ({
    value: { typeOfAllowance: allowance._id, amount: allowance.amount },
    label: allowance.allowanceName,
    isDisabled: formData.allowances.some(
      (selectedAllowance) => selectedAllowance.typeOfAllowance === allowance._id
    ),
  }));

  const deductionOptions = deductionData?.map((deduction) => ({
    value: { typeOfDeduction: deduction._id, amount: deduction.amount },
    label: deduction.deductionName,
    isDisabled: formData.deductions.some(
      (selectedDeduction) => selectedDeduction.typeOfDeduction === deduction._id
    ),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(CREATE_SALARY, formData);

      if (res.status === 201) {
        showToast("Salary added successfully", "success");
        handleClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast("Salary already exists for this staff", "error");
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    }
  };

  const allowanceName = (id) => {
    const allowance = allowanceData.find((allowance) => allowance._id === id);
    return allowance ? allowance.allowanceName : "";
  };

  const deductionName = (id) => {
    const deduction = deductionData.find((deduction) => deduction._id === id);
    return deduction ? deduction.deductionName : "";
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Salary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Staff Type</Form.Label>
            <Form.Select
              className="rounded-0"
              name="staffType"
              onChange={handleChange}
              required
            >
              <option disabled selected value="">
                Select Staff Type
              </option>
              <option value="TeachingStaff">Teaching Staff</option>
              <option value="NonTeachingStaff">Non-Teaching Staff</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Staff</Form.Label>
            <Select
              name="staff"
              value={
                staffOptions.find(
                  (option) => option.value === formData.staff
                ) || null
              }
              key={staffType}
              options={staffOptions}
              isSearchable
              isDisabled={!staffType}
              placeholder={
                !staffType ? "Select Staff Type" : "Search Staff / Select Staff"
              }
              onChange={handleSelectChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Allowances</Form.Label>
            <Select
              name="allowances"
              options={allowanceOptions}
              isDisabled={!formData.staff}
              isMulti
              isSearchable
              placeholder="Search Allowances / Select Allowances"
              onChange={handleAllowancesChange}
            />
          </Form.Group>

          {formData.allowances.length > 0 &&
            formData.allowances.map((allowance, index) => (
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
                        : Number(formData.basicSalary) || 0
                    }
                    value={allowance.value}
                    onChange={(e) =>
                      handleAllowanceInputChange(index, "value", e.target.value)
                    }
                    placeholder={`Enter ${allowance.type} value`}
                  />
                </div>
              </div>
            ))}

          {/* Deduction Section */}
          <Form.Group className="mb-3">
            <Form.Label>Deductions</Form.Label>
            <Select
              name="deductions"
              options={deductionOptions}
              isDisabled={!formData.staff}
              isMulti
              isSearchable
              placeholder="Search Deductions / Select Deductions"
              onChange={handleDeductionsChange}
            />
          </Form.Group>

          {formData.deductions.length > 0 &&
            formData.deductions.map((deduction, index) => (
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
                  <Form.Control
                    type="number"
                    min={0}
                    onScroll={(e) => e.target.blur()}
                    max={
                      deduction.type === "Percentage"
                        ? 100
                        : Number(formData.basicSalary) || 0
                    }
                    value={deduction.value}
                    onChange={(e) =>
                      handleDeductionInputChange(index, "value", e.target.value)
                    }
                    placeholder={`Enter ${deduction.type} value`}
                  />
                  {deductionError && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {deductionError}
                    </p>
                  )}
                </div>
              </div>
            ))}

          <Form.Group className="mb-3">
            <Form.Label>Net Salary</Form.Label>
            <Form.Control
              type="number"
              name="netSalary"
              value={
                Number(formData.basicSalary || 0) +
                formData.allowances.reduce(
                  (acc, curr) => acc + Number(curr.value || 0),
                  0
                ) -
                formData.deductions.reduce(
                  (acc, curr) => acc + Number(curr.value || 0),
                  0
                )
              }
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary Month</Form.Label>
            <Form.Control
              type="month"
              name="salaryMonth"
              value={formData.salaryMonth}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Present Days</Form.Label>
            <Form.Control
              type="number"
              name="present"
              value={formData.present}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Absent Days</Form.Label>
            <Form.Control
              type="number"
              name="absent"
              value={formData.absent}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Late Days</Form.Label>
            <Form.Control
              type="number"
              name="late"
              value={formData.late}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Loan Repayment</Form.Label>
            <Form.Control
              type="number"
              name="loanRepayment"
              onChange={handleChange}
              disabled={!formData.staff}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Salary
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSalaryModal;
