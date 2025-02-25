import React, { useState } from "react";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import * as Yup from "yup";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
import { Formik } from "formik";
import TestScheduleTable from "./TestScheduleTable";

export const TestSchedule = () => {
  const showToast = useGlobalToast();
  const { TestSchedule, InstituteId, Class, Section } = getCommonCredentials();
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    testtype: "",
    fromdate: "",
    todate: "",
    searchQuery: "",
  });
  

  const filtersFileds = [
    {
      name: "class",
      label: "Class",
      type: "select",
      Placeholder: "Class",
      option: Class?.map((item) => ({ value: item, label: item?.className })),
    },
    {
      name: "section",
      label: "Section",
      type: "select",
      Placeholder: "Section",
      option: Section?.map((item) => ({
        value: item,
        label: item?.sectionName,
      })),
    },
    {
      name: "testtype",
      label: "Test Type",
      type: "select",
      Placeholder: "Test Type",
      option: [
        { value: "weekly", label: "Weekly Test" },
        { value: "monthly", label: "Monthly Test" },
        { value: "yearly", label: "Yearly Test" },
      ],
    },
  ];
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="text-start fw-bold">Manage Test Schedule
          </h3>
          <div className="row g-3">
            <Formik>
              <div className="row d-flex flex-wrap mt-4 text-center">
                {filtersFileds?.map((filed, index) => (
                  <div className="col-md-3" key={index}>
                    <InputFieldComponet
                     type={filed.type}
                     className="form-control"
                     Placeholder={filed.Placeholder}
                     name={filed.name}
                     lableName={filed.label}
                     options={filed.option}
                     value={filters[filed.name]}
                     onChange={handleFilterChange}
                    />
                  </div>
                ))}
                <div className="col-md-3">
                  <button className="btn btn-success  fw-bold">
                    View Schedule
                  </button>
                </div>
              </div>
            </Formik>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Test Schedule          </h5>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search..."
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleFilterChange}
          />
        </div>

        <div className="card-body text-center">
         <TestScheduleTable TestSchedule={TestSchedule}/>
          <div className="card-footer d-flex justify-content-end mt-4">
            <button className="btn btn-danger text-uppercase fw-bold">
              Print Timetable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
