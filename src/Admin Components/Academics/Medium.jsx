import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Controller/MainProvider";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import {
  useCreateMediumMutation,
  useDeleteMediumMutation,
  useUpdateMediumMutation,
} from "../../Redux/Api/academicsApi/mediumSlice";
import useGlobalToast from "../../GlobalComponents/GlobalToast";

function Medium() {
  const showToast = useGlobalToast();
  const { userId, Medium, InstituteId } = getCommonCredentials();
  console.log("userId", InstituteId);
  
  const [medium, setMedium] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedMedium, setSelectedMedium] = useState(null);

  const [createMedium] = useCreateMediumMutation();
  const [updateMedium] = useUpdateMediumMutation();
  const [deleteMedium] = useDeleteMediumMutation();

  useEffect(() => {
    if (Medium) {
      setMedium(Medium);
    }
  }, [Medium]);

  const handleMedium = async (values) => {
    try {
      const response = await createMedium(values);
      if (response.data.status === 201) {
        showToast("Medium Created Successfully", "success");
      }
    } catch (error) {
      console.error("Error submitting medium:", error);
    }
  };

  const handleMediumDelete = async (id) => {
    try {
      const response = await deleteMedium(id);

      if (response.data.status === 200) {
        showToast("Medium Deleted Successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting medium:", error);
    }
  };
  const handleMediumEdit = async (values) => {
    try {
      const response = await updateMedium({
        mediumId: selectedMedium._id,
        mediumData: values,
      });
      if (response.data.status === 200) {
        showToast("Medium Updated Successfully", "success");
        // setMedium(
        //   medium.map((item) =>
        //     item._id === selectedMedium._id ? { ...item, ...values } : item
        //   )
        // );
        setPopup(false);
      }
    } catch (error) {
      console.error("Error updating medium:", error);
    }
  };

  return (
    <div className="px-4 py-5">
      <div className="row">
        {/* Create Medium Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Medium</h5>
              <Formik
                initialValues={{
                  mediumName: "",
                  instituteId: InstituteId,
                }}
                enableReinitialize
                onSubmit={handleMedium}
              >
                {({}) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="mediumName"
                        id="mediumName"
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

        {/* List Medium Section */}
        <div className="col-md-8 mt-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">List Medium</h5>
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
              {medium?.length > 0 ? (
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col-4">No.</th>
                      <th scope="col-4">Name</th>
                      <th scope="col-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medium?.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td className="text-capitalize">{item.mediumName}</td>
                        <td>
                          <button
                            className="btn btn-edit btn-primary me-2"
                            onClick={() => {
                              setPopup(true);
                              setSelectedMedium(item);
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-delete btn-danger"
                            onClick={() => handleMediumDelete(item._id)}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No medium available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {popup && selectedMedium && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Medium</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    mediumName: selectedMedium.mediumName || "",
                  }}
                  onSubmit={handleMediumEdit}
                >
                  {() => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field
                          type="text"
                          name="mediumName"
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
  );
}

export default Medium;
