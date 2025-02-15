import React, { useContext, useEffect } from 'react'
import Avatar from "../../assets/img/avatars/1.png"
import avatar2 from "../../assets/img/avatars/1.png"
import { MainContext } from '../../Controller/MainProvider'
import { Link, useLocation } from 'react-router-dom'
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials'
function Navbar() {
    // const { HandleLogOut, setsidebaropen } = useContext(MainContext); // -->> real time karna hai
    const {userId, Student } = getCommonCredentials();


    // for sidebar toggle 
    // const location = useLocation();
    // useEffect(() => {
    //     setsidebaropen(false);
    // }, [location.pathname]);
    return (
        <>
            <div className=' bg-themprimary'>
                <nav class="navbar navbar-expand-lg navbar-dark px-3 align-items-center">
                    <div className='mx-3 d-xl-none d-block'>
                        <Link><i class="fa fa-bars fs-4 text-white" aria-hidden="true"></i></Link>
                    </div>
                    <div class="align-items-center me-auto shadow-none d-none d-sm-flex">
                        <div className=''>
                            <div className='border-end pe-3 ms-2'>
                                <small className="text-white">Scholar No.</small>
                                <h6 className="text-white">123456</h6>
                            </div>
                        </div>
                        <div className='ms-3'>
                            <small className="text-white">Class/Course</small>
                            <h6 className="text-white">B.Tech (CSE) IV SEM, SEC-A</h6>
                        </div>
                        {/* <input
                            type="text"
                            class="form-control me-2 shadow-none p-2 ps-3"
                            placeholder="Search Student"
                        />
                        <button class="btn btn-light shadow-none">
                            <i className="bx bx-search fs-6"></i>
                        </button> */}
                    </div>


                    <div class="navbar-nav d-lg-flex align-items-center d-none">
                        <div class="dropdown p-0">
                            <button
                                class="btn bg-themprimary border text-white  p-1 px-2 "
                                data-bs-toggle="dropdown"
                            >
                                Session Years : 2023-24, First Semester
                            </button>
                        </div>
                        <div class="dropdown p-0">
                            <button
                                class="btn bg-themprimary dropdown-toggle text-white  p-1 px-4 "
                                data-bs-toggle="dropdown"
                            >
                                Language
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">English</a></li>
                                <li><a class="dropdown-item" href="#">Hindi</a></li>
                            </ul>
                        </div>
                        <div class="d-flex ">
                            <Link to="/notifications">
                                <i class="fa menu-icon tf-icons fa-bell text-white fs-6 border p-1 rounded " aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>


                    <div class="d-flex align-items-center">
                        <a className="nav-link dropdown-toggle hide-arrow p-1 pt-0" href="javascript:void(0);" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img src={Student?.personalDetails?.profilePhoto} onError={(e) => { e.target.src = "/image/defaultImg.png"; }} alt className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src={Student?.personalDetails?.profilePhoto} onError={(e) => { e.target.src = "/image/defaultImg.png"; }} alt='' className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <Link className="flex-grow-1" to={'/Studentprofile'}>
                                            <span className="fw-semibold d-block">{Student?.personalDetails?.firstName + " " + Student?.personalDetails?.lastName}</span>
                                            <small className="text-muted">Id : {userId}</small>
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <span className="dropdown-item border-bottom pb-0">
                                    <h6>Scolar No : 123456</h6>
                                    <h6>Class/Course : B.Tech (CSE) IV SEM, SEC-A</h6>
                                    <h6>Session Years : 2023-24, First Semester</h6>
                                </span>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={'/studentprofile'}>
                                    <i className="bx bx-user me-2"></i>
                                    <span className="align-middle">My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-cog me-2"></i>
                                    <span className="align-middle">Settings</span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>

                            {/* <li>
                                <Link className="dropdown-item" onClick={HandleLogOut}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <a className="align-middle">Log Out</a>
                                </Link>
                            </li> */}
                            <div class="text-center mx-auto d-lg-none align-items-center row mt-3">
                                <div className='col-6 mt-2 mt-sm-0 '>
                                    <button class="btn bg-themprimary text-white w-100 ">
                                        Notifications
                                    </button>
                                </div>
                                <div class="col-6 mt-2 mt-sm-0">
                                    <button
                                        class="btn bg-themprimary dropdown-toggle text-white w-100 "
                                        data-bs-toggle="dropdown"
                                    >
                                        Language
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">English</a></li>
                                        <li><a class="dropdown-item" href="#">Hindi</a></li>
                                    </ul>
                                </div>
                            </div>
                        </ul>
                    </div>

                </nav>
                <div className='row' style={{ "--bs-gutter-x": 0 }}>
                    <div className='col-12' >
                        <ul className="navbar-nav flex-row align-items-center ms-auto justify-content-start overflow-auto w-100 mb-2 " style={{ whiteSpace: 'nowrap' }}>
                            <div className="d-flex flex-row mt-2 pb-2 ms-3">
                                <Link to={'/'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-home-circle p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/admission'}>
                                    <i className="fa menu-icon fs-4 tf-icons fa-folder p-1 mx-1 text-white border rounded " aria-hidden="true"></i>
                                </Link>
                                <Link to={'/transport'}>
                                    <i className="fa menu-icon fs-4 tf-icons fa-bus p-1 mx-1 text-white border rounded " aria-hidden="true"></i>
                                </Link>
                                <Link to={'/notification'}>
                                    <i className="fa menu-icon fs-4 tf-icons fa-bell p-1 mx-1 text-white border rounded " aria-hidden="true"></i>
                                </Link>
                                <Link to={'/hostel'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-building-house p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/account'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-id-card p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/fee'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-rupee p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/onlineclass'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-globe p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/library'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-book-add p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/setting'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-cog p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/onlineclass'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-book-open p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/exam'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-calendar p-1 mx-1 text-white border rounded'></i>
                                </Link>
                                <Link to={'/account'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-money p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/fee'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-credit-card-front p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/account'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-wallet p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/document'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-file p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/layer'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-layer p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/certification'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-certification p-1 mx-1 text-white border rounded '></i>
                                </Link>
                                <Link to={'/library'}>
                                    <i className='menu-icon fs-4 tf-icons bx bx-book-reader p-1 mx-1 text-white border rounded '></i>
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
