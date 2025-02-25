import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import GradeTable from "./GradeTable";
import AddGrade from "./AddGrade";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import EditGrade from "./EditGrade";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";

const AssignGrade = () => {
  const showToast = useGlobalToast();
  const { AssignGrade, InstituteId, Class, Subject, Section } =
    getCommonCredentials();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [editingAssignGrade, setEditingAssignGrade] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [SelectEdit, setSelectEdit] = useState(null);
  const [filters, setFilters] = useState({
    campus: "",
    classValue: "",
    section: "",
    subject: "",
    test: "",
  });
  const filterFields = [
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

  const validation = Yup.object({
    campus: Yup.string().required("Campus is required"),
    name: Yup.string().required("Name is required"),
    fromPercent: Yup.number()
      .min(0, "From% must be at least 0")
      .max(100, "From% must be at most 100")
      .required("From% is required"),
    toPercent: Yup.number()
      .min(0, "To% must be at least 0")
      .max(100, "To% must be at most 100")
      .required("To% is required"),
    forList: Yup.string().required("For List is required"),
    classValue: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    session: Yup.string().required("Session is required"),
  });

  const handleGrade = async (validateYupSchema, { resetForm }) => {
    console.log(values);
    try {
      const response = await createGrade(values);
      if (response.data.status === 201) {
        showToast("AssignGrade created successfully", "success");
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(error.response?.data?.message || "Error crearting AssignGrade");
    }
  };

  const handleGradeDelete = async (id) => {
    try {
      const response = await delelteGrade(id);
      if (response.data.status === 200) {
        showToast("Grade deleted succesfully");
      }
    } catch (error) {
      console.error("Error deleting Grade:", error);
      showToast(error.response?.data?.message || "Error deleting Grade");
    }
  };
  const handleGradeEdit = async (values, id) => {
    try {
      const response = await updateTest({ gradeId: id, gradeData: values });
      if (response.data.status === 200) {
        showToast("Grade updated successfully");
        setEdit(false);
      }
    } catch (error) {
      console.error("Error updating Grade:", error);
      showToast(error.response?.data?.message || "Error updating Grade");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <Formik>
              {() => (
                <Form>
                  <div className="row d-flex flex-wrap text-center">
                    {filterFields?.map((filed, index) => (
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
                      <button className="btn btn-primary w-100 text-uppercase fw-bold">
                        Filter Data
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0 text-uppercase fw-bold">Grade List</h3>
          <button
            className="btn btn-primary text-uppercase fw-bold"
            onClick={() => setShowModal(true)}
          >
            Add New Test
          </button>
        </div>

        <div className="card-body text-center">
          <GradeTable
            AssignGrade={AssignGrade}
            handleGrade={handleGrade}
            handleGradeDelete={handleGradeDelete}
            handleGradeEdit={handleGradeEdit}
          />
        </div>
      </div>
      {Edit && (
        <EditGrade
          setEdit={setEdit}
          SelectEdit={SelectEdit}
          editingAssignGrade={editingAssignGrade}
          error={error}
        />
      )}

      {showModal && (
        <AddGrade
          setShowModal={setShowModal}
          editingAssignGrade={editingAssignGrade}
          error={error}
          handleGrade={handleGrade}
          validation={validation}
          instituteId={InstituteId}
        />
      )}
    </div>
  );
};

export default AssignGrade;
