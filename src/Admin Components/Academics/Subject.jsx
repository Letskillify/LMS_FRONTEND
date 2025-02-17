import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Controller/MainProvider";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "../../Redux/Api/academicsApi/subjectSlice";

const validationSchema = Yup.object({
  subjectName: Yup.string().required("Subject name is required"),
  subjectType: Yup.string().required("Subject type is required"),
});

function Subject() {
  const showToast = useGlobalToast();
  const { userId, Subject } = getCommonCredentials();
  const [popup, setPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [createSubject] = useCreateSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const handleSubject = async (values, { resetForm }) => {
    console.log("Submitting values:", values); // Log the data being sent
    try {
        const response = await createSubject(values).unwrap(); // Use unwrap() to get the real response
        console.log("API Response:", response); // Log the response
        showToast("Subject Created Successfully", "success");
        resetForm();
    } catch (err) {
      console.error('Failed to send data:', err);
      showToast("Error submitting Subject", "error");
    }
};

  
  const handleSubjectEdit = async (id, values) => {
    try {
      const response = await updateSubject({ subjectId: id, subjectData: values });
      if (response.data.status === 200) {
        showToast("Subject Updated Successfully", "success"); 
        setPopup(false);
      } else {
        throw new Error("Failed to update subject");
      }
    } catch (err) {
      console.error("Error updating data:", err);
      showToast("Error updating Subject", "error");
    }
  };
  
  const handleSubjectDelete = async (id) => {
    try {
      const response = await deleteSubject(id);
      if ('data' in response && response.data?.status === 200) {
        showToast("Subject Deleted Successfully", "success");
      } else {
        throw new Error("Failed to delete subject");
      }
    } catch (err) {
      console.error("Failed to delete data:", err);
      showToast("Error deleting Subject", "error");
    }
  };

  const filteredSubjects = Subject?.filter(subject => {
    return (
      subject?.subjectName?.toLowerCase()?.includes(search?.toLowerCase()) ||
      subject?.subjectType?.toLowerCase()?.includes(search?.toLowerCase())
    );
  });

  return (
    <div className="px-4 my-5">
      <div class="row">
        <div className="col-md-5 col-12">
          <div className="card shadow-sm mb-4">
            <h4 className="mt-5 mb-4 ms-4">Subjects</h4>
            <div className="card-body">
              <Formik
                initialValues={{
                  subjectName: "",
                  subjectType: "",
                  instituteId: userId,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubject}
              >
                {() => (
                  <Form>
                    <div className="row ">
                      <div className="col-md-12 mb-3">
                        <label>Subject Name</label>
                        <Field
                          type="text"
                          name="subjectName"
                          className="form-control"
                          placeholder="Enter Subject Name"
                        />
                        <ErrorMessage
                          name="subjectName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Subject Type</label>
                        <Field
                          as="select"
                          name="subjectType"
                          className="form-select"
                          placeholder="Select Type"
                        >
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="Theory">Theory</option>
                          <option value="Practical">Practical</option>
                        </Field>
                        <ErrorMessage
                          name="subjectType"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button type="reset" className="btn btn-secondary ms-2">
                        Reset
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">List stream</h5>
                <div>
                  <a href="#" className="text-primary me-3">
                    All
                  </a>
                </div>
              </div>
              <div className="d-flex justify-content-end mb-3">
                <div>
                  <button className="btn btn-secondary btn-sm me-2">
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-secondary btn-sm me-2">
                    <i className="fa fa-list-alt" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </button>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control ms-4 form-control-sm"
                    placeholder="Search"
                    style={{ width: "200px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects?.length > 0 && Subject?.length > 0 ? (
                      filteredSubjects.map((subject, index) => (
                        <tr key={subject._id}>
                          <td>{index + 1}</td>
                          <td>{subject.subjectName}</td>
                          <td>{subject.subjectType}</td>
                          <td>
                            <button
                              className="btn btn-primary btn me-2"
                              onClick={() => {
                                setPopup(true);
                                setSelectedSubject(subject);
                              }}
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button
                              className="btn btn-danger btn"
                              onClick={() => handleSubjectDelete(subject._id)}
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center">No subjects available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {popup && selectedSubject && (
        <div
          className="modal show d-block pt-5"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Subject</h5>
                <button
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    subjectName: selectedSubject.subjectName,
                    subjectType: selectedSubject.subjectType,
                  }}
                  onSubmit={(values) =>
                    handleSubjectEdit(selectedSubject._id, values)
                  }
                >
                  {() => (
                    <Form>
                      <div className="mb-3">
                        <label>Subject Name</label>
                        <Field
                          type="text"
                          name="subjectName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="subjectName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label>Subject Type</label>
                        <Field
                          as="select"
                          name="subjectType"
                          className="form-select"
                        >
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="Theory">Theory</option>
                          <option value="Practical">Practical</option>
                        </Field>
                        <ErrorMessage
                          name="subjectType"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary ms-2"
                          onClick={() => setPopup(false)}
                        >
                          Cancel
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
    </div>
  );
}

export default Subject;
