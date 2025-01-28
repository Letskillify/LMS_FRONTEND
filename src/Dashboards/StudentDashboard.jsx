import React from 'react'
import LoginForm from '../Auth User/LoginForm';
import PasswordForget from '../Auth User/PasswordForget';
import InstituteRegister from '../Auth User/InstituteRegister.jsx';
import SideDrawer from '../Student Components/Layout/SideDrawer';
import Navbar from '../Student Components/Layout/Navbar';
import Footer from '../Student Components/Layout/Footer';
import { Route, Routes } from 'react-router-dom';
import PrivteRoute from '../Utils/PrivteRoute.jsx'
import Home from '../Admin Components/Graph';
import BookRequest from '../Student Components/Librarys/BookRequest.jsx';
import BookList from '../Student Components/Librarys/BookList.jsx';
import StudentDetail from '../Student Components/Student/StudentDetail.jsx';
import ParentDetails from '../Student Components/Parent Details/ParentDetails.jsx';
import HomeWork from '../Student Components/Home Work/HomeWork.jsx';
import LiveClasses from '../Student Components/Live Class/LiveClasses.jsx';

const StudentDashboard = () => {
  const token = sessionStorage.getItem("token");
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {token ? <SideDrawer /> : ''}
        <div className="layout-page " style={{ overflowY: 'scroll', height: '100vh', scrollbarWidth: 'thin' }}>
          {token ? <Navbar /> : ''}
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<PrivteRoute />}>
                <Route path="/" element={<Home />}></Route>
              </Route>
              <Route path='/login' element={<LoginForm />} />
              <Route path='/forgotpassword' element={<PasswordForget />} />
              <Route path='/instituteregister' element={<InstituteRegister />} />
              <Route path="/booklist" element={<BookList />} />
              <Route path="/bookrequest" element={<BookRequest />} />
              <Route path="/studentprofile" element={<StudentDetail />} />
              <Route path="/parentdetails" element={<ParentDetails />} />
              <Route path="/homework" element={<HomeWork />} />
              <Route path='/liveclass' element={<LiveClasses />} />
            </Routes>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  )
}

export default StudentDashboard
