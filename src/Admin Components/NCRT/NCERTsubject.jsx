import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import {
  useUpdateNCERTSubjectMutation,
  useDeleteNCERTSubjectMutation,
  useGetAllNCERTSubjectsQuery,
  useCreateNCERTSubjectMutation,
} from "../../Redux/Api/NCERT/NCERTsubject";

const validationSchema = Yup.object({
  subjectName: Yup.string().required("Subject name is required"),
});

function NCERTsubject() {
  const [popup, setPopup] = useState(false);
  const [selectedNCERTsubject, setSelectedNCERTsubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const showToast = useGlobalToast();
  const [subject, setSubject] = useState([]);
  const { data: NCERTsubject } = useGetAllNCERTSubjectsQuery();
  const [createNCERTSubject] = useCreateNCERTSubjectMutation();
  const [updateNCERTSubject] = useUpdateNCERTSubjectMutation();
  const [deleteNCERTSubject] = useDeleteNCERTSubjectMutation();

  useEffect(() => {
    if (NCERTsubject) {
      setSubject(NCERTsubject); 
    }
  }, [NCERTsubject]);

  const handleCreateSubject = async (values, { resetForm }) => {
    try {
      const response = await createNCERTSubject(values);
      if (response) {
        showToast("NCERT subject created successfully", "success");
        resetForm();
      }
    } catch (error) {
      showToast(error?.data?.message || "Failed to create NCERT subject", "error");
    }
  };

  const handleNCERTsubjectEdit = async (values) => {
    try {
      await updateNCERTSubject({
        id: selectedNCERTsubject._id,
        subjectData: values,
      });
      setPopup(false);
      setSelectedNCERTsubject(null);
      showToast( "NCERT Subject updated successfully", "success");
    } catch (err) {
      showToast( "Failed to update NCERT Subject", "error");
    }
  };

  const handleNCERTsubjectDelete = async (id) => {
    try {
      await deleteNCERTSubject(id);
      showToast("NCERT Subject deleted successfully", "success");
    } catch (err) {
      showToast( "Failed to delete NCERT Subject", "error");
    }
  };

  return (
    <div className="px-4 py-5">
      <div className="row">
        {/* Create NCERT Subject Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create NCERT Subject</h5>
              <Formik
                initialValues={{ subjectName: "" }}
                validationSchema={validationSchema}
                onSubmit={handleCreateSubject}
              >
                <Form>
                  <div className="mb-3">
                    <label className="form-label">Subject Name *</label>
                    <Field
                      type="text"
                      name="subjectName"
                      className="form-control"
                      placeholder="Enter subject name"
                    />
                    <ErrorMessage
                      name="subjectName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>

        {/* List NCERT Subjects Section */}
        <div className="col-md-8 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">List NCERT Subjects</h5>
              <div className="d-flex justify-content-between mb-3">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-secondary btn-sm">
                  <i className="fa fa-refresh"></i>
                </button>
              </div>
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subject?.items?.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.subjectName}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => {
                            setPopup(true);
                            setSelectedNCERTsubject(item);
                          }}
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleNCERTsubjectDelete(item._id)}
                        >
                          <i className="fa fa-trash-o"></i>
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

      {/* Edit Subject Popup */}
      {popup && selectedNCERTsubject && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit NCERT Subject</h5>
                <button
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{ subjectName: selectedNCERTsubject.subjectName }}
                  validationSchema={validationSchema}
                  onSubmit={handleNCERTsubjectEdit}
                >
                  <Form>
                    <div className="mb-3">
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
                    <button type="submit" className="btn btn-primary w-100">
                      Update
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NCERTsubject;
