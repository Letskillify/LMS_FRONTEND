import React, { useContext, useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import {
  useCreateStreamMutation,
  useUpdateStreamMutation,
  useDeleteStreamMutation,
} from "../../Redux/Api/academicsApi/streamSlice";

function stream() {
  const showToast = useGlobalToast();
  const { userId, Stream, InstituteId  } = getCommonCredentials();
  const [stream, setstream] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedstream, setSelectedstream] = useState(null);

  useEffect(() => {
    setstream(Stream.items);
  }, [Stream]);

  const [createStream] = useCreateStreamMutation();
  const [updateStream] = useUpdateStreamMutation();
  const [deleteStream] = useDeleteStreamMutation();

  const handlestream = async (values, { resetForm }) => {
    try {
      const response = await createStream(values);
      if (response.data.status === 201) {
        showToast("Stream Created Successfully", "success");
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting stream:", error);
      showToast("Error submitting stream", "error");
    }
  };

  const handlestreamDelete = async (id) => {
    try {
      const response = await deleteStream(id);

      if (response.data.status === 200) {
        showToast("Stream Deleted Successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting stream:", error);
      showToast("Error deleting Stream", "error");
    }
  };
  const handlestreamEdit = async (values, { resetForm }) => {
    try {
      const response = await updateStream({
        streamId: selectedstream._id,
        streamData: values,
      });
      if (response.data.status === 200) {
        showToast("Stream Edit successfully", "success");
        setPopup(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating stream:", error);
      showToast("Error updating stream", "error");
    }
  };

  return (
    <div className="px-4 py-5">
      <div className="row">
        {/* Create stream Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create stream</h5>
              <Formik
                initialValues={{
                  streamName: "",
                  instituteId: userId,
                  instituteId: InstituteId,
                }}
                onSubmit={handlestream}
              >
                {({}) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="streamName"
                        id="streamName"
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

        {/* List stream Section */}
        <div className="col-md-8 mt-2">
          <div className="card">
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
                  <button className="btn btn-primary btn-sm me-2">
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-secondary btn-sm me-2">
                    <i className="fa fa-list-alt" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-info btn-sm">
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
              {stream.length > 0 ? (
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col-4">No.</th>
                      <th scope="col-4">Name</th>
                      <th scope="col-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stream?.map((item, index) => (
                      <tr key={item?.id}>
                        <th scope="row">{index + 1}</th>
                        <td className="text-capitalize">{item?.streamName}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => {
                              setPopup(true);
                              setSelectedstream(item);
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handlestreamDelete(item?._id)}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No stream available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {popup && selectedstream && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit stream</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    streamName: selectedstream.streamName || "",
                  }}
                  onSubmit={handlestreamEdit}
                >
                  {({}) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field
                          type="text"
                          name="streamName"
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

export default stream;
