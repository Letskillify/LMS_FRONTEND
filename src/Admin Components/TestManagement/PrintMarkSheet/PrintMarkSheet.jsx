import React, { useState } from "react";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import { Formik } from "formik";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";

const PrintMarkSheet = () => {
  const showToast = useGlobalToast();
  const { PrintMarkSheet, InstituteId, Class, Section } =
    getCommonCredentials();
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    test: "",
    formdate: "",
    todate: "",
    searchQuery: "",
  });

  const filtersFileds = [
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
    { name: "test", label: "Test", type: "select", placeholder: "Test" },
    {
      name: "formDate",
      label: "Form Date",
      type: "date",
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="text-start fw-bold mb-4">Print Combined Result</h3>
            <div className="row g-3">
              <Formik>
                <div className="col-md-12">
                  <div className="row">
                    {filtersFileds?.map((field, index) => (
                      <div className="col-md-2" key={index}>
                        <InputFieldComponet
                          type={field.type}
                          className="form-control "
                          Placeholder={field.placeholder}
                          name={field.name}
                          lableName={field.label}
                          options={field.option}
                          value={filters[field.name]}
                          onChange={handleFilterChange}
                        />
                      </div>
                    ))}
                    <div className="col-md-2">
                      <button className="col-md-2 btn btn-danger fw-bold w-100">
                        Generate Result
                      </button>
                    </div>
                  </div>
                </div>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintMarkSheet;
