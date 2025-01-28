import React, { useContext, useState } from 'react'
import { MainContext } from './Controller/MainProvider'
import StudentDashboard from './Dashboards/StudentDashboard'
import TeacherDashboard from './Dashboards/TeacherDashboard'
import StaffDashboard from './Dashboards/StaffDashboard'
import AdminDashboard from './Dashboards/AdminDashboard'
import LoginForm from './Auth User/LoginForm'
import { useLocation } from 'react-router-dom'
import PasswordForget from './Auth User/PasswordForget'
import InstituteRegister from './Auth User/InstituteRegister'

function App() {
  const { token, userId, designation, Islogin } = useContext(MainContext)
  const location = useLocation();

  return (
    <>
      {designation === 'Institute' && Islogin ? (
        <div>
          <AdminDashboard />
        </div>
      ) : designation === 'Student' && Islogin ? (
        < StudentDashboard />
      ) : designation === 'Teaching-Staff' && Islogin ? (
        < TeacherDashboard />
      ) : designation === 'Non Teaching-Staff' && Islogin ? (
        < StaffDashboard />
      ) : (
        <div>
          {location.pathname === '/forgotpassword' ? <PasswordForget /> : location.pathname === '/instituteregister' ? <InstituteRegister /> : <LoginForm />}
        </div>
      )
      }

    </>
  )
}

export default App
