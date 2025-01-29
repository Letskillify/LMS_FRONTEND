import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Controller/MainProvider';
import * as Yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from "react-toastify";

const validationSchema = Yup.object({
  subjectName: Yup.string().required('Subject name is required'),
  subjectCode: Yup.string().required('Subject code is required'),
  medium: Yup.string().required('Subject medium is required'),
  subjectType: Yup.string().required('Subject type is required'),
});

function Subject() {
  const { userId } = useContext(MainContext);
  const [subjects, setSubjects] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [medium, setMedium] = useState([])

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/api/subject/get');
      setSubjects(response.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };


  useEffect(() => {
    axios.get('/api/medium/get').then(response => {
      setMedium(response.data);
    })
  }, [])

  const handleSubject = async (values, { resetForm }) => {
    console.log(values);
    
    try {
      const response = await axios.post('/api/subject/post', values, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201) {
        toast.success(" Subject added successfully", {
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
        fetchSubjects();
        resetForm();
      }
    } catch (err) {
      console.error('Failed to send data:', err);
      toast.error(err.response.data.message || "Error adding inventory", {
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

  const handleSubjectEdit = async (id, values) => {
    try {
      const response = await axios.put(`/api/subject/update/${id}`, values, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        toast.success("Subject updating successfully", {
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
        fetchSubjects();
        setPopup(false);
      }
    } catch (err) {
      console.error('Error updating data:', err);
      toast.error(err.response.data.message || "Error updating Subject", {
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

  const handleSubjectDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/subject/delete/${id}`);
      if (response.status === 200) {
        toast.success("Subject Deleting successfully", {
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
        fetchSubjects();
      }
    } catch (err) {
      console.error('Failed to delete data:', err);
      toast.error(err.response.data.message || "Error Deleting Subject", {
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
    fetchSubjects(); 
  }, []);

  console.log(subjects);
  return (
    <div className="container my-5">
      <div className="card shadow-sm mb-4">
        <h2 className="text-center mt-5 mb-4">Subject Management</h2>
        <div className="card-body">
          <Formik
            initialValues={{
              subjectName: '',
              subjectCode: '',
              medium: '',
              subjectType: '',
              instituteId: userId,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubject}
          >
            {() => (
              <Form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Subject Name</label>
                    <Field type="text" name="subjectName" className="form-control" />
                    <ErrorMessage name="subjectName" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6">
                    <label>Subject Code</label>
                    <Field type="text" name="subjectCode" className="form-control" />
                    <ErrorMessage name="subjectCode" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Subject Type</label>
                    <Field as="select" name="subjectType" className="form-select">
                      <option value="" disabled>
                        Select Type
                      </option>
                      <option value="Theory">Theory</option>
                      <option value="Practical">Practical</option>
                    </Field>
                    <ErrorMessage name="subjectType" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6">
                    <label>Subject Medium</label>
                    <Field as="select" name="medium" className="form-select">
                      <option value="" disabled>
                        Select Medium
                      </option>
                      {medium?.map((medium) => (
                        <option key={medium?._id} value={medium?._id}>
                          {medium?.mediumName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="medium" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Save
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

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Medium</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject._id}>
                    <td>{index + 1}</td>
                    <td>{subject.subjectName}</td>
                    <td>{subject.subjectCode}</td>
                    <td>{subject?.medium?.mediumName || 'Not Provided'}</td>
                    <td>{subject.subjectType}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          setPopup(true);
                          setSelectedSubject(subject);
                        }}
                      >
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleSubjectDelete(subject._id)}
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

      {popup && selectedSubject && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Subject</h5>
                <button className="btn-close" onClick={() => setPopup(false)}></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    subjectName: selectedSubject.subjectName,
                    subjectCode: selectedSubject.subjectCode,
                    medium: selectedSubject.medium,
                    subjectType: selectedSubject.subjectType,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleSubjectEdit(selectedSubject._id, values)}
                >
                  {() => (
                    <Form>
                      <div className="mb-3">
                        <label>Subject Name</label>
                        <Field type="text" name="subjectName" className="form-control" />
                        <ErrorMessage name="subjectName" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label>Subject Code</label>
                        <Field type="text" name="subjectCode" className="form-control" />
                        <ErrorMessage name="subjectCode" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label>Subject Type</label>
                        <Field as="select" name="subjectType" className="form-select">
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="Theory">Theory</option>
                          <option value="Practical">Practical</option>
                        </Field>
                        <ErrorMessage name="subjectType" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label>Subject Medium</label>
                        <Field type="text" name="medium" className="form-control" />
                        <ErrorMessage name="medium" component="div" className="text-danger" />
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
      