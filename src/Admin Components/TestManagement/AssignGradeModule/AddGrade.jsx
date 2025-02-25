import React from 'react'
import InputFieldComponet from "../../../GlobalComponents/GlobalInputField";
import { Form, Formik } from "formik";
const AddGrade = ({
    setShowModal,
    editingGrade,
    error,
    handleGrade,
    validation,
    instituteId,
}) => {
    const fields = [
        { name: "name", lableName: "Name", type: "text" },
        { name: "formPercentage", lableName: "Form %", type: "text" },
        { name: "toPercentage", lableName: "To %", type: "text" },
        { name: "forTest", lableName: "For Test", type: "text" },
        { name: "class", lableName: "Class", type: "text" },
        { name: "section", lableName: "Section", type: "text" },
        { name: "session", lableName: "Session", type: "text" },
    ]

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
              {editingGrade ? "Edit Garde" : "Create Grade"}
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
                name: "",
                formPercentage: "",
                toPercentage: "",
                forTest: "",
                class: "",
                section: "",
                session: "",
                action: "",
                instituteId: instituteId,
              }}
              validationSchema={validation}
              onSubmit={handleGrade}
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
  )
}

export default AddGrade