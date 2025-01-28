import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../Controller/MainProvider';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';

function Section() {
  const { userId } = useContext(MainContext);
  const [section, setSection] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('/api/section/get');
        setSection(response.data || []);
      } catch (error) {
        console.error('Error fetching Sections:', error);
      }
    };
    fetchSections();
  }, []);

  const handleSection = async (values) => {
    try {
      const response = await axios.post('/api/section/post', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('Data Sent Successfully');
        setSection([...Section, response.data])
      }
    } catch (error) {
      console.error('Error submitting Section:', error);
    }
  };

  const handleSectionDelete = async (id) => {
    try{
      const response = await axios.delete(`api/section/delete/${id}`);

      if (response.status=== 200) {
        alert("Data Deleted Successfully")
      }

    }catch(error  ){
      console.error('Error deleting Section:', error);
    }
  }
  const handleSectionEdit = async (values, id) => {
    try {
      const response = await axios.put(`/api/section/update/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Section updated successfully");
  
        // Update the section state with the edited section
        setSection((prevSections) =>
          prevSections.map((item) =>
            item._id === id ? { ...item, sectionName: values.sectionName } : item
          )
        );
  
        setPopup(false); // Close popup
      }
    } catch (error) {
      console.error("Error updating Section:", error.response?.data || error.message);
      alert("Failed to update section. Please try again.");
    }
  };
  


  return (
    <div className="container py-5">
      <div className="row">
        {/* Create Section Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Section</h5>
              <Formik
                initialValues={{
                  SectionName: '',
                  instituteId: userId,
                }}
                onSubmit={handleSection}
              >
                {({  }) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="SectionName"
                        id="SectionName"
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

        {/* List Section Section */}
        <div className="col-md-8 mt-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">List Section</h5>
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
                  {section.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td className='text-capitalize'>{item.sectionName}</td>
                      <td>
                        <button className="btn btn-edit btn-primary me-2"  onClick={() => {
                            setPopup(true);
                            setSelectedSection(item);
                          }}>
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-delete btn-danger" onClick={() => handleSectionDelete(item._id)}>
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

      {popup && selectedSection && (
        <div className="modal show d-block" tabIndex="-1">
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
                  {() => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field
                          type="text"
                          name="sectionName"
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

export default Section;

