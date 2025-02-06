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
          })) || [],
        deductions:
          salaryData.deductions?.map((deduction) => ({
            typeOfDeduction: deduction.typeOfDeduction._id,
            amount: deduction.amount,
            deductionName: deduction.typeOfDeduction.deductionName,
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
      allowances: selected.map((s) => ({
        typeOfAllowance: s.value.typeOfAllowance,
        amount: s.value.amount,
        allowanceName: s.label,
      })),
    }));
  };

  const handleDeductionsChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      deductions: selected.map((s) => ({
        typeOfDeduction: s.value.typeOfDeduction,
        amount: s.value.amount,
        deductionName: s.label,
      })),
    }));
  };

  const allowanceOptions = allowanceData?.map((allowance) => ({
    value: { typeOfAllowance: allowance._id, amount: allowance.amount },
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
    value: { typeOfDeduction: deduction._id, amount: deduction.amount },
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
            />
          </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Label>Net Salary</Form.Label>
            <Form.Control
              type="number"
              name="netSalary"
              value={formData.netSalary}
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
