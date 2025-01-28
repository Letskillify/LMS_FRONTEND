import React from 'react'
import LoginForm from '../Auth User/LoginForm';
import PasswordForget from '../Auth User/PasswordForget';
import InstituteRegister from '../Auth User/InstituteRegister.jsx';
import SideDrawer from '../Staff Components/Layout/SideDrawer';
import Navbar from '../Staff Components/Layout/Navbar';
import Footer from '../Staff Components/Layout/Footer';
import { Route, Routes } from 'react-router-dom';
import PrivteRoute from '../Utils/PrivteRoute.jsx'
import Home from '../Admin Components/Graph';
const StaffDashboard = () => {
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

export default StaffDashboard
