import React, { useState } from "react";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
import MarkEntryTable from "./MarkEntryTable";
import EditMarkEntry from "./EditMarkEntry";
import AddMarkEntry from "./AddMarkEntry";

const MarkEntry = () => {
  const showToast = useGlobalToast();
  const { MarkEntry, InstituteId, Class, Subject, Section } =
    getCommonCredentials();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [editingMarkEntry, setEditingMarkEntry] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [SelectEdit, setSelectEdit] = useState(null);
  const [filters, setFilters] = useState({
    campus: "",
    classValue: "",
    section: "",
    subject: "",
    test: "",
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

  const handleMark = async (values, { resetForm }) => {
    try {
      const response = await createMark(values);
      if (response.data.status === 201) {
        showToast("Mark entry created successfully", "success");
        setAddMark(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(error.response?.data?.message || "Error creating Mark Entry");
    }
  };

  const handleMarkDelete = async (id) => {
    try {
      const response = await deleteMark(id);
      if (response.data.status === 200) {
        showToast("Mark entry deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting Mark Entry:", error);
      showToast(error.response?.data?.message || "Error deleting Mark Entry");
    }
  };

  const handleMarkEntryEdit = async (values, id) => {
    try {
      const response = await updateMark({ markId: id, markData: values });
      if (response.data.status === 200) {
        showToast("Mark entry updated successfully", "success");
        setAddMark(false);
      }
    } catch (error) {
      console.error("Error updating Mark Entry:", error);
      showToast(error.response?.data?.message || "Error updating Mark Entry");
    }
  };
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
                      <button className="btn btn-success w-100 text-uppercase fw-bold">
                        Manage Marks
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
          <h3 className="card-title mb-0 text-uppercase fw-bold">Mark Entry</h3>
          <button
            className="btn btn-primary text-uppercase fw-bold"
            onClick={() => setShowModal(true)}
          >
            Add Marks
          </button>
        </div>

        <div className="card-body text-center">
          <MarkEntryTable
            MarkEntry={MarkEntry}
            handledelete={handleMarkDelete}
            handleMark={handleMark}
            handleMarkEntryEdit={handleMarkEntryEdit}
          />
          <div className="card-header d-flex justify-content-center align-items-center">
            <button
              className="btn btn-success text-uppercase fw-bold"
              onSubmit={handleMark}
              >
              Save
            </button>
          </div>
        </div>
      </div>
      {Edit && (
        <EditMarkEntry
          setEdit={setEdit}
          SelectEdit={SelectEdit}
          editingMarkEntry={editingMarkEntry}
          error={error}
        />
      )}

      {showModal && (
        <AddMarkEntry
          setShowModal={setShowModal}
          editingMarkEntry={editingMarkEntry}
          error={error}
          handleMark={handleMark}
          validation={validation}
          instituteId={InstituteId}
        />
      )}
    </div>
  );
};

export default MarkEntry;
