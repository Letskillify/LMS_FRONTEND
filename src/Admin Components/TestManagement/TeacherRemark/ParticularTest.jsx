import React, { useState } from "react";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import * as Yup from "yup";
import { Formik } from "formik";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
import ParticularTestTable from "./ForParticularTest/ParticularTestTable";

const ParticularTest = () => {
  const showToast = useGlobalToast();
  const { ParticularTest, InstituteId, Class, Subject, Section } =
    getCommonCredentials();
  const [filters, setFilters] = useState({
    campus: "",
    classValue: "",
    section: "",
    subject: "",
    test: "",
    searchQuery: "",
  });

  const validation = Yup.object({
    rollNumber: Yup.string().required("Roll Number is required"),
    studentName: Yup.string().required("Student Name is required"),
    parentName: Yup.string().required("Parent Name is required"),
    marksObtained: Yup.number()
      .min(0, "Marks Obtained must be at least 0")
      .required("Marks Obtained is required"),
    totalMarks: Yup.number()
      .min(1, "Total Marks must be at least 1")
      .required("Total Marks is required"),
    passingMarks: Yup.number()
      .min(0, "Passing Marks must be at least 0")
      .required("Passing Marks is required"),
  });

  const filtersFields = [
    {
      name: "campus",
      label: "Main Campus",
      type: "select",
      placeholder: "Campus",
    },
    {
      name: "classValue",
      label: "Class",
      type: "select",
      placeholder: "Class",
      option: Class?.map((item) => ({ value: item, label: item?.className })),
    },
    {
      name: "section",
      label: "Section",
      type: "select",
      placeholder: "Section",
      option: Section?.map((item) => ({
        value: item,
        label: item?.sectionName,
      })),
    },
    {
      name: "subject",
      label: "Subject",
      type: "select",
      placeholder: "Subject",
      option: Subject?.map((item) => ({
        value: item,
        label: item?.subjectName,
      })),
    },
    { name: "test", label: "Test", type: "select", placeholder: "Test" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="text-start fw-bold">Manage Teacher Remarks</h3>
          <div className="row g-3">
            <Formik>
              <div className="row d-flex flex-wrap mt-4 text-center">
                {filtersFields?.map((filed, index) => (
                  <div className="col-md-2" key={index}>
                    <InputFieldComponet
                      type={filed.type}
                      className="form-control"
                      placeholder={filed.placeholder}
                      name={filed.name}
                      lableName={filed.label}
                      options={filed.option}
                      value={filters[filed.name]}
                      onChange={handleFilterChange}
                    />
                  </div>
                ))}
                <div className="col-md-2">
                  <button className="btn btn-success w-100 text-uppercase fw-bold">
                    Manage Marks
                  </button>
                </div>
              </div>
            </Formik>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Test Details</h5>
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
          <ParticularTestTable ParticularTest={ParticularTest} />
          <div className="card-footer d-flex justify-content-center align-items-center">
            <button className="btn btn-success text-uppercase fw-bold">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularTest;
