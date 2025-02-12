import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { MainContext } from "../../Controller/MainProvider";

const ExamForm = () => {
  const { instituteId, Class, Subject, Teacher } = useContext(MainContext);
  const [examTypes, setExamTypes] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    axios.get("/api/exam-types").then((res) => setExamTypes(res.data));
  }, []);

  const initialValues = {
    examType: "",
    examName: "",
    examCode: "",
    startingDate: "",
    endingDate: "",
    instituteId: instituteId,
    class: [],
    subjects: [
      {
        subjectName: "",
        examDate: "",
        startTime: "",
        endTime: "",
        totalMarks: "",
        passingMarks: "",
        status: "Scheduled",
      },
    ],
    assignedBy: "",
    status: "Upcoming",
    totalMarks: "",
    passingMarks: "",
    examInstructions: "",
  };

  const validationSchema = Yup.object({
    examName: Yup.string().required("Exam name is required"),
    examCode: Yup.string().required("Exam code is required"),
    startingDate: Yup.date().required("Start date is required"),
    endingDate: Yup.date().required("End date is required"),
    class: Yup.array().min(1, "Select at least one class"),
    subjects: Yup.array().of(
      Yup.object({
        subjectName: Yup.string().required("Subject is required"),
        examDate: Yup.date().required("Exam date is required"),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("End time is required"),
        totalMarks: Yup.number().required("Total marks required"),
        passingMarks: Yup.number().required("Passing marks required"),
      })
    ),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post("/api/exam/post", values);
      alert("Exam Created Successfully!");
      setPopup(false);
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <div className="text-center fw-bold fs-3">Exam Form</div>
        <button className="btn btn-primary" onClick={() => setPopup(true)}>
          Add new Exam
        </button>
      </div>
      {popup && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Exam</h5>
                <button type="button" className="btn-close" onClick={() => setPopup(false)}></button>
              </div>
              <div className="modal-body">
                <Formik 
                initialValues={initialValues} 
                // validationSchema={validationSchema}
                 onSubmit={handleSubmit}
                 >
                  {({ values }) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Exam Name</label>
                        <Field type="text" name="examName" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Exam Code</label>
                        <Field type="text" name="examCode" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Exam Type</label>
                        <Field as="select" name="examType" className="form-select">
                          <option value="">Select Exam Type</option>
                          {examTypes && examTypes.map((type) => (
                            <option key={type._id} value={type._id}>{type.name}</option>
                          ))}
                        </Field>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Classes</label>
                        <Field as="select" multiple name="class" className="form-select">
                          {Class && Class.map((cls, idx) => (
                            <option key={cls._id} value={cls._id}>{cls.className}</option>
                          ))}
                        </Field>
                      </div>
                      <FieldArray name="subjects">
                        {({ push, remove }) => (
                          <div>
                            <h5>Subjects</h5>
                            {values.subjects.map((_, index) => (
                              <div key={index} className="border p-3 mb-3">
                                <div className="mb-3">
                                  <label>Subject</label>
                                  <Field as="select" name={`subjects[${index}].subjectName`} className="form-select">
                                    <option value="">Select Subject</option>
                                    {Subject && Subject.map((sub) => (
                                      <option key={sub._id} value={sub._id}>{sub.subjectName}</option>
                                    ))}
                                  </Field>
                                </div>
                                <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button type="button" className="btn btn-primary" onClick={() => push({
                              subjectName: "",
                              examDate: "",
                              startTime: "",
                              endTime: "",
                              totalMarks: "",
                              passingMarks: "",
                            })}>
                              Add Subject
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <div className="mb-3">
                        <label className="form-label">Assigned By</label>
                        <Field as="select" name="assignedBy" className="form-select">
                          <option value="">Select Teacher</option>
                          {Teacher && Teacher.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                          ))}
                        </Field>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setPopup(false)}>Close</button>
                        <button type="submit" className="btn btn-success">Submit Exam</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;