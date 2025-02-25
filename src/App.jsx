import React from "react";
import StudentDashboard from "./Dashboards/StudentDashboard";
import TeacherDashboard from "./Dashboards/TeacherDashboard";
import StaffDashboard from "./Dashboards/StaffDashboard";
import AdminDashboard from "./Dashboards/AdminDashboard";
import LoginForm from "./Auth User/LoginForm";
import { useLocation } from "react-router-dom";
import PasswordForget from "./Auth User/PasswordForget";
import InstituteRegister from "./Auth User/InstituteRegister";
import { useSelector } from "react-redux";
import { getCommonCredentials } from "./GlobalHelper/CommonCredentials";

function App() {
  const {
    userId,
    Designation: designation,
    Islogin,
    Token,
  } = getCommonCredentials();

  const location = useLocation();

  return (
    <>
      {designation === "Institute" || "Admin" && Islogin ? (
        <div>
          <AdminDashboard />
        </div>
      ) : designation === "Student" && Islogin ? (
        <StudentDashboard />
      ) : designation === "Teaching-Staff" && Islogin ? (
        <TeacherDashboard />
      ) : designation === "Non Teaching-Staff" && Islogin ? (
        <StaffDashboard />
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          {location.pathname === "/forgotpassword" ? (
            <PasswordForget />
          ) : location.pathname === "/instituteregister" ? (
            <InstituteRegister />
          ) : (
            <LoginForm />
          )}
        </div>
      )}
    </>
  );
}

export default App;
