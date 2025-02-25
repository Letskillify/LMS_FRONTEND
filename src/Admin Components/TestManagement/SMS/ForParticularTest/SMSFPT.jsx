import React, { useState } from "react";
import useGlobalToast from "../../../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../../../GlobalHelper/CommonCredentials";
import { Formik } from "formik";
import InputFieldComponet from "../../../../GlobalComponents/GlobalInputField";
import SMSFPTTable from "./SMSFPTTable";

const SMSFPT = () => {
  const showToast = useGlobalToast();
  const { SMSFPT, InstituteId, Class, Section, Subject } =
    getCommonCredentials();
  const [filters, setFilters] = useState({
    campus: "",
    class: "",
    section: "",
    subject: "",
    test: "",
    notification: "",
    searchQuery: "",
  });

  const filtersFileds = [
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
    {
      name: "notification",
      label: "Notification",
      type: "select",
      placeholder: "Enter notification message",
      option: [
        { value: "WhatsApp SMS", label: "WhatsApp SMS" },
        { value: "WhatsApp Only", label: "WhatsApp Only" },
        { value: "SMS Only", label: "SMS Only" },
      ]
    },
    {
      name: "session",
      label: "Session",
      type: "select",
      placeholder: "Select Session",
      option: [
        { value: "2023-24", label: "2023-24" },
        { value: "2024-25", label: "2024-25" },
        { value: "2025-26", label: "2025-26" },
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
          <h3 className="text-start fw-bold mb-4">Manage Send Test Marks Via SMS</h3>
          <div className="row g-3">
            <Formik>
              <div className="row">
                <div className="col-md-5">
                  <div className="row">
                    {filtersFileds?.map((field, index) => (
                      <div className="col-md-6" key={index}>
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
                  </div>
                  <button className="btn btn-success fw-bold w-50 ">
                    Send SMS
                  </button>
                </div>
                <div className="col-md-7">
                  <SMSFPTTable SMSFPT={SMSFPT} />
                  <div className="card-footer d-flex justify-content-end mt-4">
                    <button className="btn btn-success text-uppercase fw-bold me-2">
                      Select All
                    </button>
                    <button className="btn btn-danger text-uppercase fw-bold">
                      Select None
                    </button>
                  </div>
                </div>
              </div>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSFPT;
