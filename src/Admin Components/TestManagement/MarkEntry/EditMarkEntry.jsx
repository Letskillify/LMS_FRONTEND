import { Form, Formik } from 'formik'
import React from 'react'
import InputFieldComponet from '../../../GlobalComponents/GlobalInputField'

const EditMarkEntry = ({setEdit , SelectEdit,selectedMarkData, editMarkEntry, error}) => {
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
                rollNumber: selectedMarkData?.rollNumber || "",
                studentName: selectedMarkData?.studentName || "",
                parentName: selectedMarkData?.parentName || "",
                marksObtained: selectedMarkData?.marksObtained || "",
                totalMarks: selectedMarkData?.totalMarks || "",
                passingMarks: selectedMarkData?.passingMarks || "",
              }}
              onSubmit={(values) => handleMarkEntryEdit(values, SelectEdit._id)}
            >
              {() => (
                <Form>
                  <div className="row">
                  <div className="col-md-6">
                      <InputFieldComponet name="rollNumber" lableName="Roll Number" type="text" />
                    </div>
                    <div className="col-md-6">
                      <InputFieldComponet name="studentName" lableName="Student Name" type="text" />
                    </div>
                    <div className="col-md-6">
                      <InputFieldComponet name="parentName" lableName="Parent Name" type="text" />
                    </div>
                    <div className="col-md-6">
                      <InputFieldComponet name="marksObtained" lableName="Marks Obtained" type="number" />
                    </div>
                    <div className="col-md-6">
                      <InputFieldComponet name="totalMarks" lableName="Total Marks" type="number" />
                    </div>
                    <div className="col-md-6">
                      <InputFieldComponet name="passingMarks" lableName="Passing Marks" type="number" />
                    </div>
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

export default EditMarkEntry