import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useAddNewExamMutation,
  useDeleteExamMutation,
  useGetExamByInstituteIdQuery,
  useUpdateExamByIdMutation,
} from "../../Redux/Api/examDataSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";

const ExamForm = () => {
  const { InstituteId, TeacherData, Subject, Class, ExamType } =
    getCommonCredentials();
  console.log(TeacherData, "TeacherData");

  const showToast = useGlobalToast();
  const [popup, setPopup] = useState(false);
  const [exams, setExams] = useState([]);
  const [EditData, setEditData] = useState(null);
  const [Editpopup, setEditpopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  // const [EditData, setEditData] = useState(null);
  // console.log(EditData, "EditData");

  const { data: Exam, isLoading } = useGetExamByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
  });
  const [addNewExam] = useAddNewExamMutation();
  const [updateExam] = useUpdateExamByIdMutation();
  const [deleteExam] = useDeleteExamMutation();
  useEffect(() => {
    setExams(Exam);
    console.log("examdata", Exam?.examByInstituteID);
  }, [Exam]);

  const handleSubmit = async (Exam) => {
    console.log(Exam, "Exam");
    try {
      const response = await addNewExam(Exam);
      alert("Exam Added Successfully");
      // setExams([...exams, response.data]);
      setPopup(false);
      // if (response.data.status === 201) {
      // }else{
      //   console.log(Exam,"Exam");
      // }
    } catch (error) {
      console.error("Error submitting exam:", error.message);
      alert("Error Submitting Data");
    }
  };
  const editExam = async (values) => {
    console.log("Submit Value", values);

    if (!EditData || !EditData._id) {
      alert("No exam selected for editing");
      return;
    }
    try {
      const response = await updateExam({
        id: EditData._id,
        examData: values,
      });

      setEditData(response.data); // Update state with new data
      setEditpopup(true);
      showToast("Exam updated successfully", "success");
    } catch (error) {
      console.error("Error updating exam:", error.message);
      showToast("Error Updating Data", "error");
    }
  };
  const handledeleteExam = async (exam) => {
    const response = await deleteExam(exam);
    if (response.data) {
      // setExams(exams.filter((item) => item._id !== exam._id));
      showToast("Exam Deleted Successfully", "success");
    } else {
      console.log("Error deleting exam");
      showToast("Error Deleting Data", "error");
    }
  };
  const initialValues = {
    examType: "",
    examName: "",
    examCode: "",
    startingDate: "",
    endingDate: "",
    instituteId: InstituteId,
    class: [],
    subjects: [
      {
        subjectName: "",
        examDate: "",
        startTime: "",
        endTime: "",
        totalMarks: "",
        passingMarks: "",
        incharge: "",
        status: "Scheduled",
      },
    ],
    assignedBy: [],
    status: "Upcoming",
    totalMarks: "",
    passingMarks: "",
    examMode: "Offline",
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
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <div className="text-center fw-bold fs-3">Exam Form</div>
        <button className="btn btn-primary" onClick={() => setPopup(true)}>
          Add new Exam
        </button>
      </div>
      <div className="table-responsive bg-white">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Exam Type</th>
              <th>Starting Date</th>
              <th>Ending Date</th>
              <th>Class</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {exams?.items?.length >= 0 ? (
              exams?.items?.map((exam, index) => (
                <tr key={exam._id}>
                  <td>{index + 1}</td>
                  <td>{exam.examType?.examTypeName || ""}</td>
                  <td>
                    {exam.startingDate
                      ? new Date(exam.startingDate).toLocaleDateString() || ""
                      : ""}
                  </td>
                  <td>
                    {exam.endingDate
                      ? new Date(exam.endingDate).toLocaleDateString() || ""
                      : ""}
                  </td>
                  <td>
                    {exam?.class
                      ?.map((cls) => cls.className || "")
                      .join(", ") || ""}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        exam.status === "Upcoming"
                          ? "bg-primary"
                          : exam.status === "Ongoing"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {exam.status || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setViewPopup(true);
                          setEditData(exam);
                          // setViewPopup(true), setEditData(exam);
                        }}
                      >
                        <i class="fa fa-eye" aria-hidden="true"></i>
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          // console.log("exam data setting in edit", exam)
                          setEditData(exam);
                          setEditpopup(true);
                        }}
                      >
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handledeleteExam(exam._id)}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr> </tr>
            )}
          </tbody>
        </table>
      </div>
      {popup && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Exam</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Exam Type</label>
                          <Field
                            as="select"
                            name="examType"
                            className="form-select"
                          >
                            <option value="">Select Exam Type</option>
                            {ExamType?.items?.length > 0 ? (
                              ExamType?.items?.map((type) => (
                                <option key={type._id} value={type._id}>
                                  {type?.examTypeName}
                                </option>
                              ))
                            ) : (
                              <option value="">No Exam Type Found</option>
                            )}
                          </Field>
                        </div>
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
                                name="class"
                                value={values.class.map((s) => ({
                                  value: s,
                                  label:
                                    Class?.find((cl) => cl._id === s)
                                      .className || "Unknown",
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Exam Name</label>
                          <Field
                            type="text"
                            name="examName"
                            className="form-control"
                            placeholder="Enter Exam Name"
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">Exam Code</label>
                          <Field
                            type="text"
                            name="examCode"
                            className="form-control"
                            placeholder="Enter Exam Code"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">starting Date</label>
                          <Field
                            type="date"
                            name="startingDate"
                            className="form-control"
                            placeholder="Enter Starting Date"
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">ending Date</label>
                          <Field
                            type="date"
                            name="endingDate"
                            className="form-control"
                            placeholder="Enter Ending Date"
                          />
                        </div>
                      </div>
                      <FieldArray name="subjects">
                        {({ push, remove }) => (
                          <div>
                            <h5>Subjects</h5>
                            {values.subjects?.map((_, index) => (
                              <div key={index} className="border p-3 mb-3">
                                <div className="row">
                                  <div className="col-12 mb-3">
                                    <label>Subject</label>
                                    <Field
                                      name={`subjects[${index}].subjectName`}
                                      className="form-select"
                                      as="select"
                                    >
                                      <option value="">
                                        Select Your Subject
                                      </option>
                                      {Subject &&
                                        Subject?.map((sub) => (
                                          <option key={sub._id} value={sub._id}>
                                            {sub.subjectName}
                                          </option>
                                        ))}
                                    </Field>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3">
                                    <label>Incharge</label>
                                    <Field
                                      name={`subjects[${index}].typeOfStaff`}
                                      as="select"
                                      className="form-select"
                                    >
                                      <option value="">Select Incharge</option>
                                      <option value="TeachingStaff">
                                        Teacher
                                      </option>
                                      <option value="NonTeachingStaff">
                                        Non-Teaching
                                      </option>
                                    </Field>
                                    <Field
                                      name={`subjects[${index}].incharge`}
                                      className="form-control"
                                      as="select"
                                    >
                                      <option value=""></option>
                                      {values.typeOfStaff === "TeachingStaff"
                                        ? TeacherData?.map((teacher) => (
                                            <option
                                              key={teacher._id}
                                              value={teacher._id}
                                            >
                                              {teacher.fullName.firstName +
                                                " " +
                                                teacher.fullName.lastName}
                                            </option>
                                          ))
                                        : staffs?.map((staff) => (
                                            <option
                                              key={staff._id}
                                              value={staff._id}
                                            >
                                              {staff.fullName.firstName +
                                                " " +
                                                staff.fullName.lastName}
                                            </option>
                                          ))
                                          }
                                    </Field>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-4 mb-3">
                                    <label>Exam Date</label>
                                    <Field
                                      type="date"
                                      name={`subjects[${index}].examDate`}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label>Start Time</label>
                                    <Field
                                      type="time"
                                      name={`subjects[${index}].startTime`}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label>End Time</label>
                                    <Field
                                      type="time"
                                      name={`subjects[${index}].endTime`}
                                      className="form-control"
                                    />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 mb-3">
                                    <label>Total Marks</label>
                                    <Field
                                      type="number"
                                      name={`subjects[${index}].totalMarks`}
                                      className="form-control"
                                      placeholder="Enter Total Marks"
                                    />
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Passing Marks</label>
                                    <Field
                                      type="number"
                                      name={`subjects[${index}].passingMarks`}
                                      className="form-control"
                                      placeholder="Enter Passing Marks"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                push({
                                  subjectName: [],
                                  examDate: "",
                                  startTime: "",
                                  endTime: "",
                                  totalMarks: "",
                                  passingMarks: "",
                                })
                              }
                            >
                              Add Subject
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Assigned By</label>
                          <Field name="assignedBy" className="form-select">
                            {({ field, form }) => (
                              <Select
                                isMulti
                                options={(TeacherData || []).map((t) => ({
                                  value: t._id,
                                  label:
                                    t.fullName.firstName +
                                    " " +
                                    t.fullName.lastName,
                                }))}
                                name="assignedBy"
                                value={(Array.isArray(field.value)
                                  ? field.value
                                  : []
                                ).map((id) => ({
                                  value: id,
                                  label:
                                    TeacherData.find((t) => t._id === id)
                                      ?.fullName?.firstName +
                                      " " +
                                      TeacherData.find((t) => t._id === id)
                                        ?.fullName?.lastName || "Unknown",
                                }))}
                                onChange={(selected) =>
                                  form.setFieldValue(
                                    "assignedBy",
                                    selected.map((s) => s.value)
                                  )
                                }
                                placeholder="Select Teacher"
                                styles={{
                                  multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#e0f7fa",
                                    borderRadius: "5px",
                                    padding: "1px",
                                  }),
                                }}
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">Status</label>
                          <Field
                            as="select"
                            name="status"
                            className="form-control"
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </Field>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">total Marks</label>
                          <Field
                            type="number"
                            name="totalMarks"
                            className="form-control"
                            placeholder="Enter Total Marks"
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">passing Marks</label>
                          <Field
                            type="number"
                            name="passingMarks"
                            className="form-control"
                            placeholder="Enter Passing Marks"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">examMode</label>
                          <Field
                            as="select"
                            name="examMode"
                            className="form-control"
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </Field>
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">
                            Exam Instructions
                          </label>
                          <Field
                            as="textarea"
                            rows="1"
                            name="examInstructions"
                            className="form-control"
                            placeholder="Enter Exam Instructions"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setPopup(false)}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-success">
                          Submit Exam
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
      {Editpopup && EditData && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Exam</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditpopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    examType: EditData?.examType?.items?._id || "-",
                    examName: EditData?.examName || "-",
                    examCode: EditData?.examCode || "-",
                    startingDate: EditData?.startingDate
                      ? new Date(EditData.startingDate).toLocaleDateString()
                      : "-",
                    endingDate: EditData?.endingDate
                      ? new Date(EditData.endingDate).toLocaleDateString()
                      : "-",
                    instituteId: InstituteId,
                    class: EditData?.class?.map((c) => c._id) || "-",
                    subjects:
                      EditData?.subjects?.map((subject) => ({
                        subjectName: subject?.subjectName?._id || "-",
                        examDate: subject?.examDate
                          ? new Date(subject?.examDate).toLocaleDateString()
                          : "-",
                        startTime: subject?.startTime || "-",
                        endTime: subject?.endTime || "-",
                        totalMarks: subject?.totalMarks,
                        passingMarks: subject?.passingMarks,
                        status: subject?.status,
                      })) || "-",
                    assignedBy: EditData?.assignedBy?._id,
                    status: EditData?.status || "Upcoming",
                    totalMarks: EditData?.totalMarks || "-",
                    passingMarks: EditData?.passingMarks || "-",
                    examMode: EditData?.examMode || "Offline",
                    examInstructions: EditData?.examInstructions || "-",
                  }}
                  onSubmit={editExam}
                >
                  {({ values }) => (
                    <Form>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Exam Type</label>
                          <Field
                            as="select"
                            name="examType"
                            className="form-control"
                          >
                            {ExamType?.items?.length > 0 ? (
                              ExamType?.items?.map((type) => (
                                <option key={type._id} value={type._id}>
                                  {type?.examTypeName}
                                </option>
                              ))
                            ) : (
                              <option value="">No Exam Type Found</option>
                            )}
                          </Field>
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">Classes</label>
                          <Field
                            id="class"
                            name="class"
                            className="form-control"
                          >
                            {({ field }) => (
                              <Select
                                isMulti
                                options={Class?.map((cls) => ({
                                  value: cls?._id,
                                  label: cls?.className,
                                }))}
                                name="class"
                                value={values.class.map((s) => ({
                                  value: s,
                                  label:
                                    Class?.find((cl) => cl._id === s)
                                      .className || "Unknown",
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Exam Name</label>
                          <Field
                            name="examName"
                            className="form-control"
                            placeholder="Enter Exam Name"
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">Exam Code</label>
                          <Field
                            type="text"
                            name="examCode"
                            className="form-control"
                            placeholder="Enter Exam Code"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Starting Date</label>
                          <Field name="startingDate" className="form-control" />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">Ending Date</label>
                          <Field name="endingDate" className="form-control" />
                        </div>
                      </div>
                      <FieldArray name="subjects">
                        {({ push, remove }) => (
                          <div>
                            <h5>Subjects</h5>
                            {values.subjects?.map((_, index) => (
                              <div key={index} className="border p-3 mb-3">
                                <div className="mb-3">
                                  <label>Subject</label>
                                  <Field
                                    name={`subjects[${index}].subjectName`}
                                    className="form-select"
                                    as="select"
                                  >
                                    <option value="">
                                      Select Your Subject
                                    </option>
                                    {Subject &&
                                      Subject?.map((sub) => (
                                        <option key={sub._id} value={sub._id}>
                                          {sub.subjectName}
                                        </option>
                                      ))}
                                  </Field>
                                </div>

                                <div className="row">
                                  <div className="col-md-4 mb-3">
                                    <label>Exam Date</label>
                                    <Field
                                      name={`subjects[${index}].examDate`}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label>Start Time</label>
                                    <Field
                                      name={`subjects[${index}].startTime`}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <label>End Time</label>
                                    <Field
                                      name={`subjects[${index}].endTime`}
                                      className="form-control"
                                    />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 mb-3">
                                    <label>Total Marks</label>
                                    <Field
                                      type="number"
                                      name={`subjects[${index}].totalMarks`}
                                      className="form-control"
                                      placeholder="Enter Total Marks"
                                    />
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Passing Marks</label>
                                    <Field
                                      type="number"
                                      name={`subjects[${index}].passingMarks`}
                                      className="form-control"
                                      placeholder="Enter Passing Marks"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                push({
                                  subjectName: "",
                                  examDate: "",
                                  startTime: "",
                                  endTime: "",
                                  totalMarks: "",
                                  passingMarks: "",
                                })
                              }
                            >
                              Add Subject
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">Assigned By</label>
                          <Field name="assignedBy" className="form-select">
                            {({ field, form }) => (
                              <Select
                                isMulti
                                options={(TeacherData || []).map((t) => ({
                                  value: t._id,
                                  label:
                                    t.fullName.firstName +
                                    " " +
                                    t.fullName.lastName,
                                }))}
                                name="assignedBy"
                                value={(Array.isArray(field.value)
                                  ? field.value
                                  : []
                                ).map((id) => ({
                                  value: id,
                                  label:
                                    TeacherData.find((t) => t._id === id)
                                      ?.fullName?.firstName +
                                      " " +
                                      TeacherData.find((t) => t._id === id)
                                        ?.fullName?.lastName || "Unknown",
                                }))}
                                onChange={(selected) =>
                                  form.setFieldValue(
                                    "assignedBy",
                                    selected.map((s) => s.value)
                                  )
                                }
                                placeholder="Select Teacher"
                                styles={{
                                  multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#e0f7fa",
                                    borderRadius: "5px",
                                    padding: "1px",
                                  }),
                                }}
                              />
                            )}
                          </Field>
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">Status</label>
                          <Field
                            as="select"
                            name="status"
                            className="form-control"
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </Field>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">total Marks</label>
                          <Field
                            type="number"
                            name="totalMarks"
                            className="form-control"
                            placeholder="Enter Total Marks"
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label">passing Marks</label>
                          <Field
                            type="number"
                            name="passingMarks"
                            className="form-control"
                            placeholder="Enter Passing Marks"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label">examMode</label>
                          <Field
                            as="select"
                            name="examMode"
                            className="form-control"
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">Exam Instructions</label>
                        <Field
                          as="textarea"
                          rows="3"
                          name="examInstructions"
                          className="form-control"
                          placeholder="Enter Exam Instructions"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setEditpopup(false)}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-success">
                          Submit Exam
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewPopup && EditData && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Exam Details</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setViewPopup(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  {/* Exam Type */}
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Exam Type</label>
                      <input
                        name="examType"
                        id="examType"
                        className="form-control"
                        placeholder="Enter Exam Type"
                        value={EditData?.examType?.examTypeName || ""}
                        readOnly
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Classes</label>
                      <input
                        name="classes"
                        id="classes"
                        className="form-control"
                        placeholder="Enter Classes"
                        value={
                          EditData?.class
                            ? EditData?.class
                                .map((item) => item.className)
                                .join(", ")
                            : "-"
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    {/* Exam Name */}
                    <div className="col-6 mb-3">
                      <label className="form-label">Exam Name</label>
                      <input
                        id="examName"
                        name="examName"
                        className="form-control"
                        placeholder="Enter Exam Name"
                        value={EditData?.examName || "-"}
                        readOnly
                      />
                    </div>

                    {/* Exam Code */}
                    <div className="col-6 mb-3">
                      <label className="form-label">Exam Code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Exam Code"
                        value={EditData?.examCode || "-"}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Starting Date</label>
                      <input
                        className="form-control"
                        value={
                          EditData?.startingDate
                            ? new Date(
                                EditData.startingDate
                              ).toLocaleDateString()
                            : "-"
                        }
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ending Date</label>
                      <input
                        className="form-control"
                        value={
                          EditData?.endingDate
                            ? new Date(EditData.endingDate).toLocaleDateString()
                            : "-"
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="">
                    <h4>Subject</h4>
                    {/* subject section */}
                    {EditData?.subjects?.map((subject, index) => (
                      <div className="border p-3 mt-2 mb-3" key={index}>
                        <div className="col-12 mb-3">
                          <label className="form-label">Subject</label>
                          <input
                            className="form-control"
                            value={subject.subjectName.subjectName || "-"}
                            readOnly
                          />
                        </div>
                        <div className="row">
                          <div className="col-4 mb-3">
                            <label className="form-label">Exam Date</label>
                            <input
                              className="form-control"
                              value={
                                new Date(
                                  subject.examDate
                                ).toLocaleDateString() || "-"
                              }
                              readOnly
                            />
                          </div>
                          <div className="col-4 mb-3">
                            <label className="form-label">Start Time</label>
                            <input
                              className="form-control"
                              value={subject.startTime || "-"}
                              readOnly
                            />
                          </div>
                          <div className="col-4 mb-3">
                            <label className="form-label">End Time</label>
                            <input
                              className="form-control"
                              value={subject.endTime || "-"}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 mb-3">
                            <label className="form-label">Total Marks</label>
                            <input
                              className="form-control"
                              value={subject.totalMarks || "-"}
                              readOnly
                            />
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">Passing Marks</label>
                            <input
                              className="form-control"
                              value={subject.passingMarks || "-"}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )) || "-"}
                  </div>
                  <div className="row">
                    {/* assigned by */}
                    <div className="col-6 mb-3">
                      <label className="form-label">Assigned By</label>
                      <input
                        className="form-control"
                        value={
                          EditData?.assignedBy?.fullName
                            ? `${EditData?.assignedBy?.fullName?.firstName} ${EditData?.assignedBy?.fullName?.lastName}`
                            : "-"
                        }
                        readOnly
                      />
                    </div>
                    {/* Satatus */}
                    <div className="col-6 mb-3">
                      <label className="form-label">Exam Status</label>
                      <input
                        className="form-control"
                        value={EditData?.status || "Upcoming"}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* total marks */}
                    <div className="col-6 mb-3">
                      <label className="form-label">Total Marks</label>
                      <input
                        className="form-control"
                        value={EditData?.totalMarks || "-"}
                        readOnly
                      />
                    </div>
                    {/* passing marks */}
                    <div className="col-6 mb-3">
                      <label className="form-label">passing Marks</label>
                      <input
                        className="form-control"
                        value={EditData?.passingMarks || "-"}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* exam mode */}
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">Exam Mode</label>
                      <input
                        className="form-control"
                        value={EditData?.examMode || "Offline"}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* Exam Instructions */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Exam Instructions</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter Exam Instructions"
                      value={EditData?.examInstructions || "-"}
                      readOnly
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewPopup(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
