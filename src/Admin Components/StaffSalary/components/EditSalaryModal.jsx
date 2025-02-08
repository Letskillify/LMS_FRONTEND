import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
// import { UPDATE_SALARY } from "../../ApiConstants/Routes";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";

const EditSalaryModal = ({
  show,
  handleClose,
  salaryData,
  allowanceData,
  deductionData,
  setUpdatedSalary,
  formData,
  setFormData,
  handleUpdateSalary,
}) => {
  const [netSalary, setNetSalary] = useState(0);
  const showToast = useGlobalToast();

  useEffect(() => {
    if (salaryData) {
      setFormData({
        ...salaryData,
        allowances:
          salaryData.allowances?.map((allowance) => ({
            typeOfAllowance: allowance.typeOfAllowance._id,
            amount: allowance.amount,
            allowanceName: allowance.typeOfAllowance.allowanceName,
            type: allowance.amountType,
            value: allowance.value,
          })) || [],
        deductions:
          salaryData.deductions?.map((deduction) => ({
            typeOfDeduction: deduction.typeOfDeduction._id,
            amount: deduction.amount,
            deductionName: deduction.typeOfDeduction.deductionName,
            type: deduction.amountType,
            value: deduction.value,
          })) || [],
      });
    }
  }, [salaryData, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAllowancesChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      allowances: selected.map((s) => {
        const existing = prev.allowances.find(
          (a) => a.typeOfAllowance === s.value.typeOfAllowance
        );
        return {
          typeOfAllowance: s.value.typeOfAllowance,
          amount: existing ? existing.amount : s.value.amount,
          allowanceName: s.label,
          type: existing ? existing.type : "Fixed",
          value: existing ? existing.value : s.value.amount,
        };
      }),
    }));
  };

  const handleDeductionsChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      deductions: selected.map((s) => {
        const existing = prev.deductions.find(
          (d) => d.typeOfDeduction === s.value.typeOfDeduction
        );
        return {
          typeOfDeduction: s.value.typeOfDeduction,
          amount: existing ? existing.amount : s.value.amount,
          deductionName: s.label,
          type: existing ? existing.type : "Fixed",
          value: existing ? existing.value : s.value.amount,
        };
      }),
    }));
  };

  const handleAllowanceInputChange = (index, field, value) => {
    const updatedAllowances = [...formData.allowances];
    updatedAllowances[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      allowances: updatedAllowances,
    }));
  };

  const handleDeductionInputChange = (index, field, newValue) => {
    setFormData((prev) => {
      const updatedDeductions = [...prev.deductions];

      let maxAllowed =
        updatedDeductions[index].type === "Percentage"
          ? 100
          : Number(prev.basicSalary) || 0;

      let validatedValue = Math.min(Number(newValue), maxAllowed);

      updatedDeductions[index][field] = validatedValue;
      updatedDeductions[index].amount = validatedValue;

      return { ...prev, deductions: updatedDeductions };
    });
  };
  const allowanceOptions = allowanceData?.map((allowance) => ({
    value: {
      typeOfAllowance: allowance._id,
      amount: allowance.amount,
    },
    label: allowance.allowanceName,
    isDisabled: formData.allowances?.some(
      (a) => a.typeOfAllowance === allowance._id
    ),
  }));

  const defaultAllowanceOptions = formData.allowances?.map((allowance) => ({
    value: {
      typeOfAllowance: allowance.typeOfAllowance,
      amount: allowance.amount,
    },
    label: allowance.allowanceName,
  }));

  const deductionOptions = deductionData?.map((deduction) => ({
    value: {
      typeOfDeduction: deduction._id,
      amount: deduction.amount,
    },
    label: deduction.deductionName,
    isDisabled: formData.deductions?.some(
      (d) => d.typeOfDeduction === deduction._id
    ),
  }));

  const defaultDeductionOptions = formData.deductions?.map((deduction) => ({
    value: {
      typeOfDeduction: deduction.typeOfDeduction,
      amount: deduction.amount,
    },
    label: deduction.deductionName,
  }));

  useEffect(() => {
    if (!formData) return;

    const basicSalary = Number(formData.basicSalary) || 0;

    const totalAllowances =
      formData.allowances?.reduce(
        (acc, curr) => acc + Number(curr.amount || 0),
        0
      ) || 0;

    const totalDeductions =
      formData.deductions?.reduce(
        (acc, curr) => acc + Number(curr.amount || 0),
        0
      ) || 0;

    const calculatedNetSalary = basicSalary + totalAllowances - totalDeductions;
    setNetSalary(calculatedNetSalary);
  }, [formData.basicSalary, formData.allowances, formData.deductions]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Salary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Staff Type</Form.Label>
            <Form.Control
              type="text"
              readOnly
              name="staffType"
              value={formData.staffType || ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Staff</Form.Label>
            <Form.Control
              type="text"
              readOnly
              name="staff"
              value={`${formData.staff?.StaffID || ""} ${
                formData.staff?.fullName?.firstName || ""
              } ${formData.staff?.fullName?.lastName || ""}`}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control
              type="number"
              name="basicSalary"
              value={formData.basicSalary || ""}
              readOnly
            />
          </Form.Group>

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
              isDisabled={!formData.staff}
            />
          </Form.Group>

          {formData?.allowances?.length > 0 &&
            formData.allowances.map((allowance, index) => (
              <div key={index} className="mb-3 row align-items-center">
                <div className="col-md-2">
                  <Form.Label>{allowance.allowanceName}</Form.Label>
                </div>
                <div className="col-md-5">
                  <Form.Select
                    value={allowance.type}
                    onChange={(e) =>
                      handleAllowanceInputChange(index, "type", e.target.value)
                    }
                  >
                    <option
                      selected={allowance.amountType === "Fixed"}
                      value="Fixed"
                    >
                      Fixed
                    </option>
                    <option
                      selected={allowance.amountType === "Percentage"}
                      value="Percentage"
                    >
                      Percentage
                    </option>
                  </Form.Select>
                </div>
                <div className="col-md-5">
                  <Form.Control
                    type="number"
                    min={0}
                    max={
                      allowance.type !== "Fixed" ? 100 : formData.basicSalary
                    }
                    value={allowance.amount}
                    onChange={(e) =>
                      handleAllowanceInputChange(
                        index,
                        "amount",
                        e.target.value
                      )
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
              isDisabled={!formData.staff}
            />
          </Form.Group>

          {formData?.deductions?.length > 0 &&
            formData.deductions.map((deduction, index) => (
              <div key={index} className="mb-3 row align-items-center">
                <div className="col-md-2">
                  <Form.Label>{deduction.deductionName}</Form.Label>
                </div>
                <div className="col-md-5">
                  <Form.Select
                    value={deduction.type}
                    onChange={(e) =>
                      handleDeductionInputChange(index, "type", e.target.value)
                    }
                  >
                    <option selected={deduction.type === "Fixed"} value="Fixed">
                      Fixed
                    </option>
                    <option
                      selected={deduction.type === "Percentage"}
                      value="Percentage"
                    >
                      Percentage
                    </option>
                  </Form.Select>
                </div>
                <div className="col-md-5">
                  <Form.Control
                    type="number"
                    min={0}
                    max={
                      deduction.type !== "Fixed" ? 100 : formData.basicSalary
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
                  />
                </div>
              </div>
            ))}

          <Form.Group className="mb-3">
            <Form.Label>Net Salary</Form.Label>
            <Form.Control
              type="number"
              name="netSalary"
              value={netSalary}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary Month</Form.Label>
            <Form.Control
              type="text"
              name="salaryMonth"
              value={formData?.salaryMonth}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Present Days</Form.Label>
            <Form.Control
              type="number"
              name="present"
              value={formData?.present}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Absent Days</Form.Label>
            <Form.Control
              type="number"
              name="absent"
              value={formData?.absent}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Late Days</Form.Label>
            <Form.Control
              type="number"
              name="late"
              value={formData?.late}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Loan Repayment</Form.Label>
            <Form.Control
              type="number"
              name="loanRepayment"
              value={formData?.loanRepayment}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            onClick={() => {
              handleUpdateSalary(formData._id);
            }}
            variant="primary"
            type="button"
          >
            Update Salary
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSalaryModal;
