import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Controller/MainProvider';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { Bounce, toast } from "react-toastify";

function Medium() {
  const { userId } = useContext(MainContext);
  const [medium, setMedium] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedMedium, setSelectedMedium] = useState(null);



  const fetchMediums = async () => {
    try {
      const response = await axios.get('/api/medium/get');
      setMedium(response.data);
    } catch (error) {
      console.error('Error fetching mediums:', error);
    }
  };

  const handleMedium = async (values, { resetForm }) => {
    try {
      const response = await axios.post('/api/medium/post', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        toast.success("Medium added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        // setMedium([...medium, response.data]);
        resetForm();
        fetchMediums();
      }
    } catch (error) {
      console.error('Error submitting medium:', error);
      toast.error(error.response.data.message || "Error adding medium", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
    }
  };

  const handleMediumDelete = async (id) => {
    try {
      const response = await axios.delete(`api/medium/delete/${id}`);

      if (response.status === 200) {
        toast.success("Medium deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        // setMedium(medium.filter(item => item._id !== id));
        fetchMediums();
      }
    } catch (error) {
      console.error('Error deleting medium:', error);
      toast.error(error.response.data.message || "Error deleting medium", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
    }
  };

  const handleMediumEdit = async (values) => {
    try {
      const response = await axios.put(`/api/medium/update/${selectedMedium._id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Medium updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        // setMedium(
        //   medium.map((item) =>
        //     item._id === selectedMedium._id ? { ...item, ...values } : item
        //   )
        // );
        setPopup(false); // Close popup
        fetchMediums();
      }
    } catch (error) {
      console.error("Error updating medium:", error);
      toast.error(error.response.data.message || "Error adding medium", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
    }
  };
  useEffect(() => {
    fetchMediums();
  }, []);
  return (
    <div className="container py-5">
      <div className="row">
        {/* Create Medium Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Medium</h5>
              <Formik
                initialValues={{
                  mediumName: '',
                  instituteId: userId,
                }}
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
                    style={{ width: '200px' }}
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
                  {medium && medium.length > 0 ? (
                    medium.map((item, index) => (
                      <tr key={item?._id}>
                        <th scope="row">{index + 1}</th>
                        <td className='text-capitalize'>{item?.mediumName}</td>
                        <td>
                          <button className="btn btn-edit btn-lg" onClick={() => {
                              setPopup(true);
                              setSelectedMedium(item);
                            }}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </button>
                          <button className="btn btn-delete btn-lg" onClick={() => handleMediumDelete(item?._id)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                    mediumName: selectedMedium?.mediumName || "",
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
                          id="mediumName"
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

