import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MainContext } from "../../Controller/MainProvider";
const StudentTransfer = () => {
  const validationSchema = Yup.object({
    // firstName: Yup.string().required("First Name is required"),
    // lastName: Yup.string().required("Last Name is required"),
    // rollNumber: Yup.string()
    // .required("Roll Number is required")
    // .matches(/^\d+$/, "Roll Number must be numeric"),
    // class: Yup.string().required("Class is required"),
    // contactNumber: Yup.string()
    //   .required("Contact Details are required")
    //   .matches(/^\d{10}$/, "Contact Details must be a valid 10-digit number"),
    // email: Yup.string()
    //   .required("Contact Details are required"),
    reason: Yup.string().required("Reason for transfer is required"),
  });

  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState({});
  const { Student } = useContext(MainContext);

  useEffect(() => {
    if (Student) {
      setLoading(false);
    }
  }, [Student]);

  return (
    <>
      {loading ? (
        <h1 className="text-center mt-5">Loading...</h1>
      ) : (
        <div className="main-wrapper container mt-4">
          {/* Page Wrapper */}
          <div className="page-wrapper">
            <div className="content content-two">
              {/* Page Header */}
              <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                <div className="my-auto mb-2">
                  <h3 className="page-title mb-1">Transfer Certificate</h3>
                  <nav>
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Dashboard</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Transfer Certificate
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {/* /Page Header */}

              {/* content */}
              <div className="card">
                <h5 className="card-header">Transfer Certificate</h5>
                <div className="card-body">
                  <Formik
                    initialValues={{
                      firstName: Student?.personalDetails?.firstName,
                      lastName: Student?.personalDetails?.lastName,
                      rollNumber: Student?.academicDetails?.previous?.rollNo,
                      class: Student?.academicDetails?.previous?.class,
                      reason: "",
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                      console.log("Form Data:", values);
                      // Perform API request or action here
                    }}
                  >
                    {({ isSubmitting, values }) => (
                      <Form>
                        <div className="row">
                          {/* First Name */}
                          <div className="col-6">
                            <label className="form-label">First Name</label>
                            <Field
                              name="firstName"
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          {/* Last Name */}
                          <div className="col-6">
                            <label className="form-label">Last Name</label>
                            <Field
                              name="lastName"
                              type="text"
                              className="form-control"
                              placeholder="Enter Last Name"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          {/* Roll Number */}
                          <div className="col-6 mt-2">
                            <label className="form-label">Roll Number</label>
                            <Field
                              name="rollNumber"
                              type="text"
                              className="form-control"
                              placeholder="Enter Roll Number"
                            />
                            <ErrorMessage
                              name="rollNumber"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          {/* Class */}
                          <div className="col-6 mt-2">
                            <label className="form-label">Class</label>
                            <Field
                              name="class"
                              type="text"
                              className="form-control"
                              placeholder="Class"
                            />
                            <ErrorMessage
                              name="class"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          {/* Reason for Transfer */}
                          <div className="col-12 mt-2">
                            <label className="form-label">
                              Reason for Transfer
                            </label>
                            <Field
                              name="reason"
                              as="textarea"
                              className="form-control"
                              placeholder="Enter Reason for Transfer"
                            />
                            <ErrorMessage
                              name="reason"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          {/* Submit Button */}
                          <div className="col-12 d-flex justify-content-end align-items-end mt-4">
                            <button
                              type="submit"
                              className="btn btn-success py-2 px-3 fs-5"
                              disabled={isSubmitting}
                            >
                              Send for Approval
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              {/* content */}
            </div>
          </div>
          {/* /Page Wrapper */}
        </div>
      )}
    </>
  );
};

export default StudentTransfer;
