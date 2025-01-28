import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Controller/MainProvider';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { Bounce, toast } from "react-toastify";

function stream() {
  const { userId } = useContext(MainContext);
  const [stream, setstream] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedstream, setSelectedstream] = useState(null);

 
    const fetchstreams = async () => {
      try {
        const response = await axios.get('/api/stream/get');
        setstream(response.data || []);
      } catch (error) {
        console.error('Error fetching streams:', error);
      }
    };
 

  const handlestream = async (values, { resetForm }) => {
    try {
      const response = await axios.post('/api/stream/post', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        toast.success("Stream added successfully", {
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
        setstream([...stream, response.data])
        resetForm();
        fetchstreams()
      }
    } catch (error) {
      console.error('Error submitting stream:', error);
      toast.error(error.response.data.message || "Error adding Stream", {
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

  const handlestreamDelete = async (id) => {
    try{
      const response = await axios.delete(`api/stream/delete/${id}`);

      if (response.status=== 200) {
        toast.success("Stream deleted successfully", {
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
      }
      fetchstreams()

    }catch(error  ){
      console.error('Error deleting stream:', error);
      toast.error(error.response.data.message || "Error deleting Stream", {
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
  }
  const handlestreamEdit = async (values, { resetForm }) => {
    try {
      const response = await axios.put(`/api/stream/update/${selectedstream._id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Stream Edit successfully", {
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
        setstream(
          stream.map((item) =>
            item._id === selectedstream._id ? { ...item, ...values } : item
          )
        );
        setPopup(false); // Close popup
        resetForm();
        fetchstreams()
      }
    } catch (error) {
      console.error("Error updating stream:", error); 
      toast.error(error.response.data.message || "Error updating Stream", {
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
    fetchstreams();
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        {/* Create stream Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create stream</h5>
              <Formik
                initialValues={{
                  streamName: '',
                  instituteId: userId,
                }}
                onSubmit={handlestream}
              >
                {({  }) => (
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
                  {stream.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td className='text-capitalize'>{item.streamName}</td>
                      <td>
                        <button className="btn btn-edit btn-lg "  onClick={() => {
                            setPopup(true);
                            setSelectedstream(item);
                          }}>
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-delete btn-lg" onClick={() => handlestreamDelete(item._id)}>
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