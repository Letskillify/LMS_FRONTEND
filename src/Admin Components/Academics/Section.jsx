import React, { useContext, useEffect, useState } from 'react';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { Bounce, toast } from "react-toastify";
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials';
import { useCreateSectionMutation, useDeleteSectionMutation, useUpdateSectionMutation } from '../../Redux/Api/academicsApi/sectionSlice';
import useGlobalToast from '../../GlobalComponents/GlobalToast';

function Section() {
  const showToast = useGlobalToast();
  const { userId, Section } = getCommonCredentials();
  const [sections, setSections] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  const handleSection = async (values, { resetForm }) => {
    try {
      const response = await createSection(values);
      if (response.data.status === 201) {
        showToast("Section Created Successfully", "success");
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting Section:', error);
      showToast("Error submitting Section", "error");
    }
  };

  const handleSectionDelete = async (id) => {
    try {
      const response = await deleteSection(id);
      if (response.data.status === 200) {
        showToast("Section Deleted Successfully", "success");
      }
    } catch (error) {
      console.error('Error deleting Section:', error);
      showToast("Error deleting Section", "error");
    }
  };

  const handleSectionEdit = async (values, id) => {
    try {
      const response = await updateSection({ sectionId: id, sectionData: values });
      if (response.data.status === 200) {
        showToast("Section Updated Successfully", "success");
        setPopup(false);
        }
    } catch (error) {
      console.error("Error updating Section:", error.response?.data || error.message);
      showToast("Error updating Section", "error");
    }
  };
  useEffect(() => {
    setSections(Section);
  }, [Section]);
  return (
    <div className="px-5 py-5">
      <div className="row">
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Section</h5>
              <Formik
                initialValues={{
                  sectionName: '',
                  instituteId: userId,
                }}
                onSubmit={handleSection}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="sectionName"
                        id="sectionName"
                        className="form-control"
                        placeholder="Name"
                      />
                      {errors.sectionName && touched.sectionName && (
                        <div className="text-danger">{errors.sectionName}</div>
                      )}
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

        <div className="col-md-8 mt-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">List Section</h5>
                <div>
                  <a href="#" className="text-primary me-3">All</a>
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
              {sections.length > 0 ? (
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col-4">No.</th>
                      <th scope="col-4">Name</th>
                      <th scope="col-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td className='sections text-capitalize'>{item?.sectionName}</td>
                        <td>
                          <button className="btn btn-primary me-2" onClick={() => {
                              setPopup(true);
                              setSelectedSection(item);
                            }}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </button>
                          <button className="btn btn-danger" onClick={() => handleSectionDelete(item._id)}>  
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No sections available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {popup && selectedSection && (
        <div className="modal show d-block pt-5" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Section</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{
                    sectionName: selectedSection.sectionName || "",
                  }}
                  onSubmit={(values) => handleSectionEdit(values, selectedSection._id)} 
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field
                          type="text"
                          name="sectionName"
                          id="sectionName"
                          className="form-control"
                        />
                        {errors.sectionName && touched.sectionName && (
                          <div className="text-danger">{errors.sectionName}</div>
                        )}
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

export default Section;

