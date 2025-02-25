import { Form, Formik } from 'formik'
import React from 'react'
import InputFieldComponet from '../../../GlobalComponents/GlobalInputField'

const AddMarkEntry = ({setShowModal,selectedMarkData,error,handleMarkEntry,validation,indtituteId}) => {
    const fields = [
        {name:"rollNo",lableName:"Roll No",type:"text"},
        {name:"studentName",lableName:"Student Name",type:"text"},
        { name: "parentName", lableName: "Parent Name", type: "text" },
        { name: "marksObtained", lableName: "Marks Obtained", type: "number" },
        { name: "totalMarks", lableName: "Total Marks", type: "number" },
        { name: "passingMarks", lableName: "Passing Marks", type: "number" },
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
      <div className="modal-content border-0 rounded-4 shadow-lg" style={{ background: "#f7f7f7" }}>
        <div className="modal-header bg-gradient-to-r from-primary to-secondary text-white">
          <h3 className="modal-title fw-bold text-uppercase">Add Mark Entry</h3>
          <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
        </div>

        <div className="modal-body px-4 py-3">
          {error && <div className="alert alert-danger">{error}</div>}

          <Formik
            initialValues={{
             rollNo:"",
             studentName:"",
             parentName:"",
             marksObtained:0,
             totalMarks:0,
             passingMarks:0,
             action:"",
             instituteId:indtituteId,
            }}
           validationSchema={validation}
            onSubmit = {handleMarkEntry}
          >
            {() => (
              <Form>
                <div className="row g-3">
                  {fields.map((field, index) => (
                    <div className="col-md-6" key={index}>
                      <InputFieldComponet name={field.name} lableName={field.lableName} type={field.type} />
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Add Marks
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

export default AddMarkEntry