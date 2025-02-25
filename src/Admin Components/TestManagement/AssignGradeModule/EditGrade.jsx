import React from "react";
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
import { Formik } from "formik";

const EditGrade = ({ setEdit, SelectEdit, editGrade, error }) => {
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
              {editGrade ? "Edit  Grade" : "Create Grade"}
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
                name: SelectEdit.name,
                formPercentage: SelectEdit.formPercentage,
                toPercentage: SelectEdit.toPercentage,
                forTest: SelectEdit.forTest,
                class: SelectEdit.class,
                section: SelectEdit.section,
                session: SelectEdit.session,
                action: SelectEdit.action,
              }}
              onSubmit={(values) => handleGradeEdit(values, SelectEdit._id)}
            >
              {() => (
                <Form>
                  <div className="row">
                    <InputFieldComponet
                      name={"name"}
                      lableName={"Name"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"formPercentage"}
                      lableName={"Form %"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"toPercentage"}
                      lableName={"To %"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"forTest"}
                      lableName={"For Test"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"class"}
                      lableName={"Class"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"section"}
                      lableName={"Section"}
                      type={"text"}
                    />
                    <InputFieldComponet
                      name={"session"}
                      lableName={"Session"}
                      type={"text"}
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

export default EditGrade;
