import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { Bounce, toast, ToastContainer } from 'react-toastify'
function PasswordForget() {
  const Navigate = useNavigate();
  const handleSubmit = async (v) => {
    try {
      const response = await axios.post("/auth/forgot-password", v);
      console.log(response.data);
      
      if (response.status === 200) {
        toast.success("Password reset email sent. Please check your email.", {
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
        Navigate("/");
      }

    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.warn(error.response.data.message || "Error sending reset email", {
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
      } else {
        toast.error("Network error. Please try again.", {
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
    }
  }
  return (
    <>

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">

            <div className="card">
              <div className="card-body">

                <div className="app-brand justify-content-center">
                  <a href="index.html" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">
                      {/* <img src={Logo} alt="" style={{maxHeight: "90px"}} /> */}
                      <h2 className='fw-bold'>BrigaSys</h2>
                    </span>
                  </a>
                </div>
                <h4 className="mb-2">Forgot Password? 🔒</h4>
                <p className="mb-4">Enter your email and we'll send you instructions to reset your password</p>
                <Formik initialValues={{ email: "", designation: "" }} onSubmit={handleSubmit}>
                  <Form id="formAuthentication" className="mb-3" >
                    <div className="mb-3">
                      <label for="email" className="form-label">Email</label>
                      <Field type="text" className="form-control" id="email" name="email" placeholder="Enter your email" autofocus />
                    </div>
                    <div className=" mb-4">
                      <label for="designation" className="form-label">Designation</label>
                      <Field
                        as="select"
                        name="designation"
                        className="form-select"
                      >
                        <option value="" className="text-muted" disabled>
                          Select User Type
                        </option>
                        <option value="Student">Student</option>
                        <option value="Teaching-Staff">Teacher</option>
                        <option value="Non Teaching-Staff">Staff</option>
                        <option value="Institute">Institute</option>
                      </Field>
                    </div>
                    <div className="d-flex flex-wrap">
                      <button className="btn btn-primary d-grid w-100 me-2">Continue</button>
                      <Link className='mt-2' to={"/"}><i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i> Back to Login</Link>
                      {/* <button className="btn btn-primary d-grid w-100 ms-2">Send OTP</button> */}
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export default PasswordForget
