import React from 'react';
import { Formik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import InputFieldComponet from '../../../GlobalComponents/GlobalInputField';

const ExamForm = ({ 
  initialValues, 
  onSubmit, 
  ExamType, 
  Class, 
  Subject, 
  TeacherData, 
  NonTeachingStaffData,
  onClose 
}) => {
  const validationSchema = Yup.object({
    examType: Yup.string().required("Exam type is required"),
    examName: Yup.string().required("Exam name is required"),
    examCode: Yup.string().required("Exam code is required"),
    startingDate: Yup.date().required("Start date is required"),
    endingDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startingDate"), "End date must be after start date"),
    class: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one class"),
    subjects: Yup.array().of(
      Yup.object().shape({
        subjectName: Yup.string().required("Subject is required"),
        examDate: Yup.date()
          .required("Exam date is required"),
        startTime: Yup.string().required("Start time is required"),
        endTime: Yup.string().required("End time is required"),
        totalMarks: Yup.number()
          .required("Total marks required")
          .positive("Total marks must be positive"),
        passingMarks: Yup.number()
          .required("Passing marks required")
          .positive("Passing marks must be positive")
          .max(Yup.ref("totalMarks"), "Passing marks cannot exceed total marks"),
        typeOfStaff: Yup.string().required("Type of staff is required"),
        incharge: Yup.string().required("Incharge is required"),
        status: Yup.string(),
        duration: Yup.string()
      })
    ),
    examMode: Yup.string().required("Exam mode is required"),
    examInstructions: Yup.string().nullable(),
    assignedBy: Yup.string().required("Assigned by is required"),
  });

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Create Exam</h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
        ></button>
      </div>
      <div className="modal-body">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="row">
                <InputFieldComponet
                  lableName="Exam Type"
                  type="select"
                  name="examType"
                  options={ExamType?.items?.map((type) => ({
                    value: type._id,
                    label: type?.examTypeName
                  }))}
                />

                <div className="col-6 mb-3">
                  <label className="form-label">Classes</label>
                  <Field name="class">
                    {({ field }) => (
                      <Select
                        isMulti
                        options={Class?.map((cls) => ({
                          value: cls?._id,
                          label: cls?.className,
                        }))}
                        value={values.class.map((s) => ({
                          value: s,
                          label: Class?.find((cl) => cl._id === s)?.className || "Unknown",
                        }))}
                        onChange={(selected) =>
                          setFieldValue(
                            "class",
                            selected.map((s) => s.value)
                          )
                        }
                      />
                    )}
                  </Field>
                  {errors.class && touched.class && (
                    <div className="text-danger">{errors.class}</div>
                  )}
                </div>
              </div>

              <div className="row">
                <InputFieldComponet
                  lableName="Exam Name"
                  type="text"
                  name="examName"
                  placeholder="Enter exam name"
                />
                
                <InputFieldComponet
                  lableName="Exam Code"
                  type="text"
                  name="examCode"
                  placeholder="Enter exam code"
                />
              </div>

              <div className="row">
                <InputFieldComponet
                  lableName="Starting Date"
                  type="date"
                  name="startingDate"
                  placeholder="Select start date"
                />
                
                <InputFieldComponet
                  lableName="Ending Date"
                  type="date"
                  name="endingDate"
                  placeholder="Select end date"
                />
              </div>

              <div className="row">
                <InputFieldComponet
                  lableName="Exam Mode"
                  type="select"
                  name="examMode"
                  placeholder="Select exam mode"
                  options={[
                    { value: "Online", label: "Online" },
                    { value: "Offline", label: "Offline" }
                  ]}
                />
                
                <InputFieldComponet
                  lableName="Exam Instructions"
                  type="textarea"
                  name="examInstructions"
                  placeholder="Enter exam instructions"
                />
              </div>

              <div className="row">
                <InputFieldComponet
                  lableName="Assigned By"
                  type="select"
                  name="assignedBy"
                  options={TeacherData?.map((teacher) => ({
                    value: teacher._id,
                    label: `${teacher.fullName.firstName} ${teacher.fullName.lastName}`
                  }))}
                />
              </div>

              <FieldArray name="subjects">
                {({ push, remove }) => (
                  <div>
                    <h5>Subjects</h5>
                    {values.subjects?.map((_, index) => (
                      <div key={index} className="border p-3 mb-3">
                        <div className="row">
                          <InputFieldComponet
                            lableName="Subject"
                            type="select"
                            name={`subjects.${index}.subjectName`}
                            options={Subject?.map((sub) => ({
                              value: sub._id,
                              label: sub.subjectName
                            }))}
                          />
                        </div>

                        <div className="row">
                          <InputFieldComponet
                            lableName="Type Of Staff"
                            type="select"
                            name={`subjects.${index}.typeOfStaff`}
                            options={[
                              { value: "TeachingStaff", label: "Teaching Staff" },
                              { value: "NonTeachingStaff", label: "Non-Teaching Staff" }
                            ]}
                          />

                          <InputFieldComponet
                            lableName="Incharge"
                            type="select"
                            name={`subjects.${index}.incharge`}
                            options={values.subjects[index]?.typeOfStaff === "TeachingStaff" 
                              ? TeacherData?.map((teacher) => ({
                                  value: teacher._id,
                                  label: `${teacher.fullName.firstName} ${teacher.fullName.lastName}`
                                }))
                              : NonTeachingStaffData?.map((staff) => ({
                                  value: staff._id,
                                  label: `${staff.fullName.firstName} ${staff.fullName.lastName}`
                                }))
                            }
                          />
                        </div>

                        <div className="row">
                          <InputFieldComponet
                            lableName="Exam Date"
                            type="date"
                            name={`subjects.${index}.examDate`}
                            placeholder="Select exam date"
                          />
                          
                          <InputFieldComponet
                            lableName="Start Time"
                            type="time"
                            name={`subjects.${index}.startTime`}
                            placeholder="Select start time"
                          />
                          
                          <InputFieldComponet
                            lableName="End Time"
                            type="time"
                            name={`subjects.${index}.endTime`}
                            placeholder="Select end time"
                          />
                        </div>

                        <div className="row">
                          <InputFieldComponet
                            lableName="Total Marks"
                            type="number"
                            name={`subjects.${index}.totalMarks`}
                            placeholder="Enter total marks"
                          />
                          
                          <InputFieldComponet
                            lableName="Passing Marks"
                            type="number"
                            name={`subjects.${index}.passingMarks`}
                            placeholder="Enter passing marks"
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => remove(index)}
                        >
                          Remove Subject
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary mb-3"
                      onClick={() =>
                        push({
                          subjectName: "",
                          examDate: "",
                          startTime: "",
                          endTime: "",
                          duration: "",
                          status: "Scheduled",
                          totalMarks: "",
                          passingMarks: "",
                          typeOfStaff: "",
                          incharge: "",
                        })
                      }
                    >
                      Add Subject
                    </button>
                  </div>
                )}
              </FieldArray>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Exam
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ExamForm; 