import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

// import { MainContext } from "../../Controller/MainProvider";
import useGlobalToast from "../../../GlobalComponents/GlobalToast";
import EditTestList from "./EditTestList"
import TestListTable from "./TestListTable";
import { getCommonCredentials } from "../../../GlobalHelper/CommonCredentials";
import AddTestListModal from "./AddTestListModal";
const TestList = () => {
  const showToast = useGlobalToast();
  const {TestList, InstituteId } = getCommonCredentials();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [SelectEdit, setSelectEdit] = useState(null);

  const validation = Yup.object({
    testName: Yup.string().required("Test Name is required"),
    testStatus: Yup.string()
      .oneOf(["Active", "Inactive"], "Invalid test status")
      .required("Test Status is required"),
    testStartTime: Yup.string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
      .required("Test Start Time is required"),
    testEndTime: Yup.string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
      .required("Test End Time is required"),
    instituteId: Yup.string().required("Institute ID is required"),
  });

  const handleTest = async (values, { resetForm }) => {
    console.log(values);
    try {
      const response = await createTest(values);
      if (response.data.status === 201) {
        showToast("Test created successfully", "success");
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(error.response?.data?.message || "Error creating test");
    }
  };

  const handleTestDelete = async (id) => {
    try {
      const response = await deleteTest(id);
      if (response.data.status === 200) {
        showToast("Test deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting Test:", error);
      showToast(error.response?.data?.message || "Error deleting test");
    }
  };

  const handleTestEdit = async (values, id) => {
    try {
      const response = await updateTest({ testId: id, testData: values });
      if (response.data.status === 200) {
        showToast("Test updated successfully");
        setEdit(false);
      }
    } catch (error) {
      console.error("Error updating test:", error);
      showToast(error.response?.data?.message || "Error updating test");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0 text-uppercase fw-bold">Test List</h3>
          <button
            className="btn btn-primary text-uppercase fw-bold"
            onClick={() => setShowModal(true)}
          >
            Add New Test
          </button>
        </div>

        <div className="card-body text-center">
          <TestListTable
          TestList={TestList}
          handleTest={handleTest}
          handleTestDelete={handleTestDelete}
          handleTestEdit={handleTestEdit}


          />
        </div>
      </div>
      {Edit && (
        <EditTestList
          setEdit={setEdit}
          SelectEdit={SelectEdit}
          editingTest={editingTest}
          error={error}
        />
      )}

      {showModal && (
        <AddTestListModal
          setShowModal={setShowModal}
          editingTest={editingTest}
          error={error}
          handleTest={handleTest}
          validation={validation}
          instituteId={InstituteId}
        />
      )}
    </div>
  );
};

export default TestList;
