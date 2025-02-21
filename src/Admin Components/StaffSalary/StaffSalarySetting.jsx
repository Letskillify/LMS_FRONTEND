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
import axios from "axios";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateAllowanceMutation,
  useDeleteAllowanceMutation,
  useGetAllAllowancesQuery,
  useGetAllowancesByInstituteIdQuery,
} from "../../Redux/Api/SalaryAllowanceSlice";
import {
  useCreateDeductionMutation,
  useDeleteDeductionMutation,
  useGetDeductionsByInstituteIdQuery,
} from "../../Redux/Api/SalaryDeductionSlice";
import {
  useGenerateSalarySettingsMutation,
  useGetSalarySettingsByInstituteIdQuery,
  useUpdateSalarySettingsMutation,
} from "../../Redux/Api/salarySlice";

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
  const { InstituteId: instituteId } = getCommonCredentials();

  console.log("instituteId", instituteId);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [deductions, setDeductions] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [allowanceDeductions, setAllowanceDeductions] = useState([]);
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
    type: "allowance",
    name: "",
  });

  const { data: allowanceData } = useGetAllowancesByInstituteIdQuery(
    instituteId,
    { skip: !instituteId }
  );

  const { data: deductionData } = useGetDeductionsByInstituteIdQuery(
    instituteId,
    { skip: !instituteId }
  );

  const { data: salarySettings } = useGetSalarySettingsByInstituteIdQuery(
    {
      instituteId: instituteId,
      month: currentMonth,
      year: currentYear,
    },
    { skip: !instituteId }
  );

  const [generateSalarySettings] = useGenerateSalarySettingsMutation();
  const [updateSalarySettings] = useUpdateSalarySettingsMutation();
  const [addAllowance] = useCreateAllowanceMutation();
  const [addDeduction] = useCreateDeductionMutation();
  const [deleteAllowance] = useDeleteAllowanceMutation();
  const [deleteDeduction] = useDeleteDeductionMutation();

  useEffect(() => {
    if (allowanceData?.items) setAllowances(allowanceData.items);
    if (deductionData?.items) setDeductions(deductionData.items);
  }, [allowanceData, deductionData]);

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
  }, [deductions, allowances]);

  useEffect(() => {
    if (salarySettings?.status === 200 && salarySettings?.items) {
      setIsSalarySettingsAvailable(true);
      setFormData((prevData) => ({
        ...prevData,
        ...salarySettings?.items,
      }));
    }
  }, [salarySettings]);

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
  ];

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
      const response = isSalarySettingsAvailable
        ? await updateSalarySettings({
            instituteId: instituteId,
            salaryData: salaryData,
            month: currentMonth,
            year: currentYear,
          })
        : await generateSalarySettings(salaryData);
      showToast("Salary settings updated successfully!", "success");
    } catch (error) {
      console.error("Error updating salary settings:", error);
      showToast("Error updating salary settings.", "error");
    }
  };

  const handleAllowanceDeductionSubmit = async () => {
    if (!formData.name) {
      showToast("Please fill all required fields.", "error");
      return;
    }

    try {
      const URL = `/api/salary/${formData.type}/post`;
      const data = {
        [`${formData.type}Name`]: formData.name,
        instituteId: instituteId,
      };

      const addAllowanceDeduction =
        formData.type === "allowance"
          ? await addAllowance(data)
          : await addDeduction(data);
      console.log("addAllowanceDeduction", addAllowanceDeduction);
      if (addAllowanceDeduction?.data?.status == 201) {
        setFormData((prevData) => ({
          ...prevData,
          name: "",
          type: "allowance",
        }));
        showToast(
          `${
            formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
          } added successfully!`,
          "success"
        );
      }
    } catch (error) {
      console.error("Error adding allowance/deduction:", error);
      showToast("Error adding allowance/deduction.", "error");
    }
  };

  const handleDeleteAllowanceDeduction = async (id, type) => {
    try {
      const response =
        type == "allowance"
          ? await deleteAllowance(id)
          : await deleteDeduction(id);

      if (response?.data?.status === 200) {
        showToast(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } deleted successfully!`,
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting allowance/deduction:", error);
      showToast("Error deleting allowance/deduction.", "error");
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
          {allowanceDeductions.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Allowance/Deduction Type</th>
                  <th>Allowance/Deduction Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allowanceDeductions?.map((allowanceDeduction) => (
                  <tr key={allowanceDeduction._id}>
                    <td>{allowanceDeduction?.type}</td>
                    <td>
                      {allowanceDeduction.allowanceName ||
                        allowanceDeduction.deductionName}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteAllowanceDeduction(
                            allowanceDeduction._id,
                            allowanceDeduction.type
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No Allowance/Deduction added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryGeneration;
