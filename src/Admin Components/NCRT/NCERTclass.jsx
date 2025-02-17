import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useGlobalToast from "../../GlobalComponents/GlobalToast";
import {
  useCreateNcertClassMutation,
  useGetAllNcertClassesQuery,
  useDeleteNcertClassMutation,
  useUpdateNcertClassMutation
} from "../../Redux/Api/NCERT/NCERTclassSlice";

const validationSchema = Yup.object({
  classname: Yup.string().required("Class name is required"),
});

function NCERTclass() {
  const [popup, setPopup] = useState(false);
  const [selectedNCERTclass, setSelectedNCERTclass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const showToast = useGlobalToast();
  const [Class, setClass] = useState();
  const { data: NCERTClass } = useGetAllNcertClassesQuery();
  const [createClass] = useCreateNcertClassMutation();
  const [UpdateNCERTClass] = useUpdateNcertClassMutation();
  const [deleteNCERTClass] = useDeleteNcertClassMutation();

  useEffect(() => {
    if (NCERTClass) {
      setClass(NCERTClass);
    }
  }, [NCERTClass]);

  const handleCreateClass = async (values, { resetForm }) => {
    try {
      const response = await createClass(values);
      if (response.data.status === 201) {
        showToast( "NCERT Class created successfully", "success");
        resetForm();
      }
    } catch (error) {
      showToast( error.data?.message || "Failed to create NCERT class", "error");
    }
  };

  const handleNCERTclassEdit = async (values) => {
    try {
      await UpdateNCERTClass({ id: selectedNCERTclass._id, classData: values });
      setPopup(false);
      setSelectedNCERTclass();
      showToast( "NCERT Class updated successfully", "success");
    } catch (err) {
      showToast( "Failed to update NCERT class", "error");
    }
  };

  const handleNCERTclassDelete = async (id) => {
    try {
     const response = await deleteNCERTClass(id);
     if(response){
       showToast( "NCERT Class deleted successfully", "success");

     }
    } catch (err) {
      showToast( "Failed to delete NCERT class", "error");
    }
  };

  return (
    <div className="px-4 py-5">
      <div className="row">
        {/* Create NCERT Class Section */}
        <div className="col-md-4 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create NCERT Class</h5>
              <Formik
                initialValues={{ classname: "" }}
                // validationSchema={validationSchema}
                onSubmit={handleCreateClass}
              >
                <Form>
                  <div className="mb-3">
                    <label className="form-label">Class Name *</label>
                    <Field
                      type="text"
                      name="classname"
                      className="form-control"
                      placeholder="Enter class name"
                    />
                    <ErrorMessage
                      name="classname"
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

        {/* List NCERT Class Section */}
        <div className="col-md-8 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">List NCERT Classes</h5>
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
                  {Class?.items?.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.classname}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => {
                            setPopup(true);
                            setSelectedNCERTclass(item);
                          }}
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleNCERTclassDelete(item._id)}
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

      {popup && selectedNCERTclass && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit NCERT Class</h5>
                <button
                  className="btn-close"
                  onClick={() => setPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{ classname: selectedNCERTclass.classname }}
                  validationSchema={validationSchema}
                  onSubmit={handleNCERTclassEdit}
                >
                  <Form>
                    <div className="mb-3">
                      <Field
                        type="text"
                        name="classname"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="classname"
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

export default NCERTclass;
