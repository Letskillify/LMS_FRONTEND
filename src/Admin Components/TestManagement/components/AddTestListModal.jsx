import React from "react";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
import { Form, Formik } from "formik";

const AddTestListModal = ({
  setShowModal,
  editingTest,
  error,
  handleTest,
  validation,
  instituteId,
}) => {
  const fields = [
    { name: "campus", lableName: "Campus", type: "text" },
    { name: "testId", lableName: "Test Id", type: "text" },
    { name: "testName", lableName: "Test Name", type: "text" },
    { name: "forClass", lableName: "For Class", type: "text" },
    { name: "ofSubject", lableName: "Of Subject", type: "text" },
    { name: "description", lableName: "Description", type: "text" },
    { name: "testDate", lableName: "Test Date", type: "text" },
    {
      name: "addInFinal",
      lableName: "Add In Final",
      type: "select",
      options: [
        { value: "", label: "Select" },
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
    },
    {
      name: "type",
      lableName: "Type",
      type: "select",
      options: [
        { value: "", label: "Select" },
        { value: "Daily Test", label: "Daily Test" },
        { value: "Weekly Test", label: "Weekly Test" },
        { value: "Monthly Test", label: "Monthly Test" },
      ],
    },
  ];

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content border-0 rounded-4 shadow-lg"
          style={{ background: "#f7f7f7" }}
        >
          <div className="modal-header bg-gradient-to-r from-primary to-secondary text-white">
            <h3 className="modal-title fw-bold text-uppercase">
              {editingTest ? "Edit Test Lsit" : "Create Test List"}
            </h3>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{
                testId: "",
                testName: "",
                forClass: "",
                ofSubject: "",
                description: "",
                testDate: "",
                addInFinal: "",
                type: "",
                session: "",
                resultStatus: "",
                campus: "",
                instituteId: instituteId,
              }}
              validationSchema={validation}
              onSubmit={handleTest}
            >
              {() => (
                <Form>
                  <div className="row">
                    {fields?.map((field) => (
                      <InputFieldComponet
                        name={field.name}
                        lableName={field.lableName}
                        type={field.type}
                        options={field.options}
                      />
                    ))}
                    {/* <InputFieldComponet
                      lableName={"Add In Final"}
                      name={"addInFinal"}
                      type={"select"}
                      options={[
                        { value: "", label: "Select" },
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" },
                      ]}
                    />
                    <InputFieldComponet
                      name={"type"}
                      lableName={" Type"}
                      type={"select"}
                      options={[
                        { value: "", label: "Select" },
                        { value: "Daily Test", label: "Daily Test" },
                        { value: "Weekly Test", label: "Weekly Test" },
                        { value: "Monthly Test", label: "Monthly Test" },
                      ]}
                    /> */}
                    <InputFieldComponet
                      name={"session"}
                      lableName={" Session"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"resultStatus"}
                      lableName={"Result Status"}
                      type={"select"}
                      options={[
                        { value: "", label: "Select" },
                        { value: "Pending", label: "Pending" },
                        { value: "Published", label: "Published" },
                      ]}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary text-uppercase fw-bold"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success w-25 text-uppercase fw-bold"
                    >
                      Update Test
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTestListModal;
