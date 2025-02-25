import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Bounce, toast } from "react-toastify";
import { useLoginMutation } from "../Redux/Api/authSlice";
import { useDispatch } from "react-redux";
import {
  setDesignation,
  setGlobalInstituteId,
  setGlobalToken,
  setGlobalUserId,
  setIslogin,
} from "../Redux/Slices/MainSlice";
import useGlobalToast from "../GlobalComponents/GlobalToast";
import bgImage from "../assets/img/backgrounds/loginFormBg.png";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./css/login.css";
import Loader from "../GlobalComponents/GlobalLoader";

const LoginForm = () => {
  const showToast = useGlobalToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Message, setMessage] = useState();
  const [Success, setSuccess] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({});
  const SECRET_KEY = "brigatech&letskillify";
  const [login, { isLoading }] = useLoginMutation();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const selectInputRef = useRef(null);

  useEffect(() => {
    dispatch(setIslogin(loginData?.success));
    dispatch(setGlobalToken(loginData?.token));
    dispatch(setDesignation(loginData?.designation));
    if (loginData?.designation == "Institute") {
      dispatch(setGlobalInstituteId(loginData?.userId));
      dispatch(setGlobalUserId(loginData?.userId));
    } else {
      dispatch(setGlobalUserId(loginData?.userId));
    }
  }, [loginData, dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    designation: Yup.string().required("Please select a user type"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await login(values);

      console.log("resposne : ", res);

      if (res?.data?.success) {
        const { token, userId, designation, message, success } = res.data;

        setLoginData(res.data);

        // Ensure SECRET_KEY is valid
        // console.log("SECRET_KEY:", SECRET_KEY);

        // Encrypt and store data in sessionStorage
        sessionStorage.setItem(
          "token",
          CryptoJS.AES.encrypt(token || "", SECRET_KEY).toString()
        );
        sessionStorage.setItem(
          "userId",
          CryptoJS.AES.encrypt(userId || "", SECRET_KEY).toString()
        );
        sessionStorage.setItem(
          "designation",
          CryptoJS.AES.encrypt(designation || "", SECRET_KEY).toString()
        );
        sessionStorage.setItem(
          "Islogin",
          CryptoJS.AES.encrypt(String(success) || "", SECRET_KEY).toString()
        );
        setMessage(message);
        setSuccess(success);
        window.location.reload();
        navigate("/", {
          state: { userId, designation, token },
        });
      } else if (res?.error?.data?.status == 400) {
        showToast(
          res?.error?.data?.message || "Invalid credentials",
          "warning"
        );
      }
    } catch (err) {
      console.log("err", err);
      setMessage(err?.response?.data?.message || "An error occurred");
      showToast(err?.response?.data?.message || "An error occurred", "error");
    }
  };

  return (
    <div className="d-flex w-100 vh-100">
      {/* Left Side - Illustration */}
      <div
        className="w-50 d-flex flex-column justify-content-between py-4 align-items-center text-white"
        style={{ background: "linear-gradient(to bottom,#0069D1, #004C97)" }}
      >
        <h1 className="fw-bold text-left text-white w-100 px-5">BrigaSYS</h1>
        <img
          width={"90%"}
          src={bgImage}
          alt="Illustration"
          className="img-fluid"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-light p-4">
        <div className="w-75">
          <h2 className="fw-bold text-center mb-4">Welcome Back !!</h2>
          <p className="text-center">Login to Continue</p>
          <Formik
            initialValues={{ email: "", password: "", designation: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="p-4 rounded-4">
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <div className="input-group">
                    <span
                      onClick={() => emailInputRef.current.focus()}
                      className="cursor-pointer input-group-text px-3 py-3 bg-light border-1"
                    >
                      <FaEnvelope className="text-primary" />
                    </span>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      innerRef={emailInputRef}
                      placeholder="Enter your email"
                      style={{ color: "#004C97" }}
                      className="form-control border-1"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {/* User Type */}
                <div className="mb-3">
                  <label
                    htmlFor="designation"
                    className="form-label fw-semibold"
                  >
                    User Type
                  </label>
                  <div className="input-group">
                    <span
                      onClick={() => {
                        if (selectInputRef.current) {
                          selectInputRef.current.focus();
                          selectInputRef.current.click();
                        }
                      }}
                      className="input-group-text px-3 py-3 bg-light border-1 cursor-pointer"
                    >
                      <FaUser className="text-primary" />
                    </span>
                    <Field
                      as="select"
                      id="designation"
                      name="designation"
                      innerRef={selectInputRef}
                      className="form-select border-1"
                    >
                      <option value="" disabled>
                        Select User Type
                      </option>
                      <option value="Student">Student</option>
                      <option value="Teaching-Staff">Teacher</option>
                      <option value="Non Teaching-Staff">Staff</option>
                      <option value="Institute">Institute</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <div className="input-group">
                    <span
                      onClick={() => passwordInputRef.current.focus()}
                      className="input-group-text px-3 py-3 bg-light border-1 cursor-pointer"
                    >
                      <FaLock className="text-primary" />
                    </span>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      innerRef={passwordInputRef}
                      placeholder="Enter your password"
                      className="form-control border-1"
                    />
                    <span
                      onClick={() => {
                        setShowPassword(!showPassword);
                        if (passwordInputRef.current) {
                          passwordInputRef.current.focus();
                        }
                      }}
                      className="input-group-text px-3 py-3 bg-light border-1 cursor-pointer"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-primary" />
                      ) : (
                        <FaEye className="text-primary" />
                      )}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="remember"
                      className="form-check-input"
                    />
                    <label htmlFor="remember" className="form-check-label">
                      Remember Me
                    </label>
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="text-primary text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-100 position-relative fs-5 py-2 login-btn fw-bold"
                  disabled={isSubmitting}
                >
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <Loader className="login-btn-loader" size={20} />
                    </div>
                  ) : (
                    <>
                      <span> LogIn </span>
                      <i className="fa fa-arrow-circle-right fs-2 position-absolute login-btn-icon text-white" />
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Don't have an account?{" "}
                    <Link
                      to="/instituteregister"
                      className="text-primary fw-semibold"
                    >
                      Sign Up
                    </Link>
                  </small>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
