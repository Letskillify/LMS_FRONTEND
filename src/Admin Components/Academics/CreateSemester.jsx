import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Bounce, toast } from "react-toastify";
import { MainContext } from "../../Controller/MainProvider";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateSemesterMutation,
  useDeleteSemesterMutation,
  useUpdateSemesterMutation,
} from "../../Redux/Api/academicsApi/semesterSlice";

const CreateSemester = () => {
  // const { fetchSemester } = useContext(MainContext); -->> real time karna hai
  const { userId, Semester } = getCommonCredentials();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [editingSemester, setEditingSemester] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [SelectEdit, setSelectEdit] = useState(null);

  const [createSemester] = useCreateSemesterMutation();
  const [deleteSemester] = useDeleteSemesterMutation();
  const [updateSemester] = useUpdateSemesterMutation();

  const handleSemesters = async (values, { resetForm }) => {
    try {
      const response = await createSemester(values);
      if (response.data.status === 201) {
        toast.success("Semester created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pouseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        resetForm();
        // fetchSemester();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message || "Error creating semester", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pouseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  const handleSemestersDelete = async (id) => {
    try {
      const response = await deleteSemester(id);
      if (response.data.status === 200) {
        toast.success("Semester deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pouseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        // fetchSemester();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting semester:", error);
      toast.error(error.response.data.message || "Error deleting semester", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pouseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleSemestersEdit = async (semesterData, semesterId) => {
    try {
      const response = await updateSemester({ semesterId, semesterData });
      if (response.data.status === 200) {
        toast.success("Semester updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pouseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setEdit(false);
        setShowModal(false);
        // fetchSemester();
      }
    } catch (error) {
      console.error("Error updating semester:", error);
      toast.error(error.response.data.message || "Error updating semester", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pouseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="px-4 mt-5 mb-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0 text-uppercase fw-bold">Semesters</h3>
          <button
            className="btn btn-primary text-uppercase fw-bold"
            onClick={() => setShowModal(true)}
          >
            Create Semester
          </button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Semester Name</th>
                  <th>Start Month</th>
                  <th>End Month</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Semester?.length > 0 ? (
                  Semester.map((semester, index) => (
                    <tr key={semester._id}>
                      <td>{index + 1}</td>
                      <td>{semester.semesterName}</td>
                      <td>{semester.semesterStartMonth}</td>
                      <td>{semester.semesterEndMonth}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              setEdit(true);
                              setSelectEdit(semester);
                            }}
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleSemestersDelete(semester._id)}
                          >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <div className="alert alert-info" role="alert">
                        No semesters found.
                      </div>
                    </td>
                  </tr>
                )}

                {Edit && (
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
                            Edit Semester
                          </h3>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setEdit(false)}
                          ></button>
                        </div>

                        <div className="modal-body px-4 py-3">
                          {error && (
                            <div className="alert alert-danger">{error}</div>
                          )}
                          <Formik
                            initialValues={{
                              semesterName: SelectEdit.semesterName,
                              semesterStartMonth: SelectEdit.semesterStartMonth,
                              semesterEndMonth: SelectEdit.semesterEndMonth,
                            }}
                            onSubmit={(values) =>
                              handleSemestersEdit(values, SelectEdit._id)
                            }
                          >
                            {() => (
                              <Form>
                                <div className="row">
                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="semesterName"
                                      className="form-label"
                                    >
                                      Semester Name
                                    </label>
                                    <Field
                                      type="text"
                                      id="semesterName"
                                      name="semesterName"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="semesterName"
                                      component="div"
                                      className="invalid-feedback d-block"
                                    />
                                  </div>

                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="semesterStartMonth"
                                      className="form-label"
                                    >
                                      Semester Start Month
                                    </label>
                                    <Field
                                      type="month"
                                      id="semesterStartMonth"
                                      name="semesterStartMonth"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="semesterStartMonth"
                                      component="div"
                                      className="invalid-feedback d-block"
                                    />
                                  </div>

                                  <div className="col-12 col-md-6 mb-3">
                                    <label
                                      htmlFor="semesterEndMonth"
                                      className="form-label"
                                    >
                                      Semester End Month
                                    </label>
                                    <Field
                                      type="month"
                                      id="semesterEndMonth"
                                      name="semesterEndMonth"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="semesterEndMonth"
                                      component="div"
                                      className="invalid-feedback d-block"
                                    />
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
                                    className="btn btn-success w-50 text-uppercase fw-bold"
                                  >
                                    Update Semester
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
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
                  Create Semester
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
                    semesterName: "",
                    semesterStartMonth: "",
                    semesterEndMonth: "",
                    instituteId: userId,
                  }}
                  onSubmit={handleSemesters}
                >
                  {() => (
                    <Form>
                      <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                          <label htmlFor="semesterName" className="form-label">
                            Semester Name
                          </label>
                          <Field
                            type="text"
                            id="semesterName"
                            name="semesterName"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="semesterName"
                            component="div"
                            className="invalid-feedback d-block"
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                          <label
                            htmlFor="semesterStartMonth"
                            className="form-label"
                          >
                            Semester Start Month
                          </label>
                          <Field
                            type="month"
                            id="semesterStartMonth"
                            name="semesterStartMonth"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="semesterStartMonth"
                            component="div"
                            className="invalid-feedback d-block"
                          />
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                          <label
                            htmlFor="semesterEndMonth"
                            className="form-label"
                          >
                            Semester End Month
                          </label>
                          <Field
                            type="month"
                            id="semesterEndMonth"
                            name="semesterEndMonth"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="semesterEndMonth"
                            component="div"
                            className="invalid-feedback d-block"
                          />
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
                          className="btn btn-success w-50 text-uppercase fw-bold"
                        >
                          {editingSemester
                            ? "Update Semester"
                            : "Create Semester"}
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
};

export default CreateSemester;
