import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

// import { MainContext } from "../../Controller/MainProvider";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import InputFieldComponet from "../../GlobalComponents/GlobalInputField";
import EditTestList from "./components/EditTestList";
import AddTestListModal from "./components/AddTestListModal";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import TestListTable from "./components/TestListTable";
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

        <div className="card-body">
          {/* <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Test Id</th>
                  <th>Test Name</th>
                  <th>For Class</th>
                  <th>Of Subject</th>
                  <th>Description</th>
                  <th>Test Date</th>
                  <th>Add In Final</th>
                  <th>Type</th>
                  <th>Session</th>
                  <th>Result Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {TestList?.length > 0 ? (
                  TestList?.map((test, index) => (
                    <tr key={test._id}>
                      <td>{index + 1}</td>
                      <td>{test.testName}</td>
                      <td>{test.forClass}</td>
                      <td>{test.ofSubject}</td>
                      <td>{test.description}</td>
                      <td>{test.testDate}</td>
                      <td>{test.addInFinal}</td>
                      <td>{test.type}</td>
                      <td>{test.session}</td>
                      <td>{test.resultStatus}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              setEdit(true);
                              setSelectEdit(test);
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleTestDelete(test._id)}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center">
                      <div className="alert alert-info" role="alert">
                        No Test List found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
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
