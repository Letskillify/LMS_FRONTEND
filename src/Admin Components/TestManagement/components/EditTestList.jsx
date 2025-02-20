import React from "react";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";

export const EditTestList = ({setEdit, SelectEdit, editingTest, error}) => {
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
              {editingTest ? "Edit Test List" : "Create Test List"}
            </h3>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setEdit(false)}
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            {error && <div className="alert alert-danger">{error}</div>}
            <Formik
              initialValues={{
                testId: SelectEdit.testId,
                testName: SelectEdit.testName,
                forClass: SelectEdit.forClass,
                ofSubject: SelectEdit.ofSubject,
                description: SelectEdit.description,
                testDate: SelectEdit.testDate,
                addInFinal: SelectEdit.addInFinal,
                type: SelectEdit.type,
                session: SelectEdit.session,
                resultStatus: SelectEdit.resultStatus,
              }}
              onSubmit={(values) => handleTestEdit(values, SelectEdit._id)}
            >
              {() => (
                <Form>
                  <div className="row">
                    <InputFieldComponet
                      name={"campus"}
                      lableName={"Campus"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"testId"}
                      lableName={"Test ID"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"testName"}
                      lableName={"Test Name"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"forClass"}
                      lableName={" For Class"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"ofSubject"}
                      lableName={" Of Subject"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"description"}
                      lableName={" Description"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"testDate"}
                      lableName={"Test Date"}
                      type={"text"}
                    />
                    <InputFieldComponet
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
                        {
                          value: "Daily Test",
                          label: "Daily Test",
                        },
                        {
                          value: "Weekly Test",
                          label: "Weekly Test",
                        },
                        {
                          value: "Monthly Test",
                          label: "Monthly Test",
                        },
                      ]}
                    />
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
                        {
                          value: "Published",
                          label: "Published",
                        },
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

export default EditTestList;
