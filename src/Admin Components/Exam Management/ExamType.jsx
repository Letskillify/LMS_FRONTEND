import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateExamTypeMutation,
  useDeleteExamTypeMutation,
  useGetExamTypeByInstituteIdQuery,
  useUpdateExamTypeMutation,
} from "../../Redux/Api/examTypeSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";

function ExamType() {
  const showToast = useGlobalToast();
  const [ExamType, setExamType] = useState([]);
  const { userId } = getCommonCredentials();
  const [popup, setPopup] = useState(false);
  const [selectedExamType, setSelectedExamType] = useState(null);
  const { InstituteId } = getCommonCredentials();

  console.log("InstituteId", InstituteId);

  const { data: examTypeData, isLoading } = useGetExamTypeByInstituteIdQuery(InstituteId, {
    skip: !InstituteId,
  });
  const [createExamType] = useCreateExamTypeMutation();
  const [updateExamType] = useUpdateExamTypeMutation();
  const [deleteExamType] = useDeleteExamTypeMutation();

  useEffect(() => {
    setExamType(examTypeData);
  }, [examTypeData]);

  // const fetchExamType = async () => {
  //   try {
  //     const response = await axios.get('/api/exam-type/get');
  //     setExamType(response.data);
  //   } catch (error) {
  //     console.error('Error fetching ExamType:', error)
  //   }
  // }

  const handleExamType = async (examTypeData) => {
      try {
      const response = await createExamType(examTypeData);
      if (response.data.status === 201) {
        setExamType([...ExamType, response.data]);
        showToast("Data Sent Successfully", "success");
      } else {
        console.log(examTypeData);
      }
    } catch (error) {
      console.error("Error submitting ExamType:", error);
      showToast("Error submitting ExamType", "error");
    }
  };

  const handleExamTypeDelete = async (id) => {
    try {
      const response = await deleteExamType(id);
      if (response.data.status === 200) {
        setExamType(ExamType.filter((item) => item._id !== id));
        showToast("Data Deleted Successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting ExamType:", error);
      showToast("Error deleting ExamType", "error");
    }
  };

  const handleExamTypeEdit = async (values) => {
    try {
      const response = await updateExamType({
        id: selectedExamType._id,
        examTypeData:   values,
      });
      if (response.data.status === 200) {
        setExamType(
          ExamType?.map((item) =>
            item._id === selectedExamType._id ? { ...item, ...values } : item
          )
        );
        setPopup(false);
        showToast("ExamType updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating ExamType:", error);
      showToast("Error updating ExamType", "error");
    }
  };

  return (
    <>
      <div className="px-4 py-5">
        <div className="row">
          {/* Create ExamType Section */}
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Create ExamType</h5>
                <Formik
                  initialValues={{
                    examTypeName: "",
                    instituteId: InstituteId,
                  }}
                  enableReinitialize
                  onSubmit={handleExamType}
                >
                  {({}) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="examTypeName"
                          id="examTypeName"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          {/* List ExamType Section */}
          <div className="col-md-8 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title">List ExamType</h5>
                  <div>
                    <a href="#" className="text-primary me-3">
                      All
                    </a>
                    <a href="#" className="text-primary">
                      Trashed
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
                    />
                  </div>
                </div>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col-4">No.</th>
                      <th scope="col-4">Name</th>
                      <th scope="col-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ExamType?.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td className="text-capitalize">{item.examTypeName}</td>
                        <td>
                          <button
                            className="btn btn-edit btn-primary me-2"
                            onClick={() => {
                              setPopup(true);
                              setSelectedExamType(item);
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-delete btn-danger"
                            onClick={() => handleExamTypeDelete(item._id)}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {popup && selectedExamType && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit ExamType</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setPopup(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <Formik
                    initialValues={{
                      examTypeName: selectedExamType.examTypeName || "",
                    }}
                    onSubmit={handleExamTypeEdit}
                  >
                    {() => (
                      <Form>
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <Field
                            type="text"
                            name="examTypeName"
                            className="form-control"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          Update
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ExamType;
