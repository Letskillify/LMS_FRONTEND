import React, { useContext, useEffect } from 'react'
import Avatar from "../../assets/img/avatars/1.png"
import avatar2 from "../../assets/img/avatars/1.png"
import { MainContext } from '../../Controller/MainProvider'
import { Link, useLocation } from 'react-router-dom'
import { getCommonCredentials } from '../../GlobalHelper/CommonCredentials'
function Navbar() {
    const { HandleLogOut,setsidebaropen } = useContext(MainContext) // -->> real time karna hai 
    const { Institute: institute, userId } = getCommonCredentials();


    // for sidebar toggle 
    const location = useLocation();
    useEffect(() => {
        setsidebaropen(false);
    }, [location.pathname]);
    return (
        <>
            <div className=' bg-themprimary'>
                <nav class="navbar navbar-expand-lg navbar-dark px-3 align-items-center">
                    <div className='mx-3 d-xl-none d-block' onClick={() => setsidebaropen(true)}>
                        <Link><i class="fa fa-bars fs-4 text-white" aria-hidden="true"></i></Link>
                    </div>
                    <div class="d-flex align-items-center me-auto w-50 shadow-none">
                        <input
                            type="text"
                            className="form-control me-2 shadow-none p-2 ps-3"
                            placeholder="Search Student"
                        />
                        <button class="btn btn-light shadow-none">
                            <i className="bx bx-search fs-6"></i>
                        </button>
                    </div>


                    <div class="navbar-nav d-lg-flex align-items-center d-none">
                        <div class="dropdown p-0">
                            <button
                                class="btn bg-themprimary dropdown-toggle text-white  p-1 px-2 "
                                data-bs-toggle="dropdown"
                            >
                                Language
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">English</a></li>
                                <li><a class="dropdown-item" href="#">Hindi</a></li>
                            </ul>
                        </div>
                        <div class="dropdown p-0 me-2">
                            <button
                                class="btn bg-themprimary dropdown-toggle text-white p-1 px-2"
                                data-bs-toggle="dropdown"
                            >
                                Main Campus
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Campus A</a></li>
                                <li><a class="dropdown-item" href="#">Campus B</a></li>
                            </ul>
                        </div>
                        <div class="d-flex ">
                            <Link to="/transportation">
                                <i class="fa menu-icon tf-icons fa-bus text-white fs-6 border p-1 rounded " aria-hidden="true"></i>
                            </Link>
                            <Link to="/homework">
                                <i class="fa menu-icon tf-icons fa-folder text-white fs-6 border p-1 rounded " aria-hidden="true"></i>
                            </Link>
                            <Link to="/notifications">
                                <i class="fa menu-icon tf-icons fa-bell text-white fs-6 border p-1 rounded " aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>


                    <div class="d-flex align-items-center">
                        <a className="nav-link dropdown-toggle hide-arrow p-1 pt-0" href="javascript:void(0);" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img src={Avatar} alt className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src={avatar2} alt className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <Link className="flex-grow-1" to={'/instituteprofile'}>
                                            <span className="fw-semibold d-block">{institute?.name}</span>
                                            <small className="text-muted">Id : {userId}</small>
                                        </Link>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={'/instituteprofile'}>
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
                                <a className="dropdown-item" href="#">
                                    <span className="d-flex align-items-center align-middle">
                                        <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                        <span className="flex-grow-1 align-middle">Billing</span>
                                        <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>

                            <li>
                                <Link className="dropdown-item" onClick={HandleLogOut}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <a className="align-middle">Log Out</a>
                                </Link>
                            </li>
                            <div class="text-center mx-auto d-lg-none align-items-center row mt-3">
                                <div class="dropdown col-sm-3 col-6 pe-0">
                                    <button
                                        class="btn btn-primary dropdown-toggle text-white"
                                        data-bs-toggle="dropdown"
                                    >
                                        Language
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">English</a></li>
                                        <li><a class="dropdown-item" href="#">Hindi</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown col-sm-3 col-6 ps-0">
                                    <button
                                        class="btn btn-primary dropdown-toggle text-white"
                                        data-bs-toggle="dropdown"
                                    >
                                        Main Campus
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Campus A</a></li>
                                        <li><a class="dropdown-item" href="#">Campus B</a></li>
                                    </ul>
                                </div>
                                <div className='col-sm-3 col-12 mt-2 mt-sm-0 '>
                                    <button class="btn btn-primary w-100 ">
                                        Notifications
                                    </button>
                                </div>
                                <div class="d-flex">
                                    <i class="fa menu-icon tf-icons fa-folder text-white ms-1 fs-6 " aria-hidden="true"></i>
                                    <i class="fa menu-icon tf-icons fa-bus text-white ms-1 fs-6 " aria-hidden="true"></i>
                                    <i class="fa menu-icon tf-icons fa-bell text-white ms-1 fs-6 " aria-hidden="true"></i>
                                    <i className='menu-icon tf-icons bx bx-building-house text-white ms-1 fs-6 ' ></i>
                                    <i className='menu-icon tf-icons bx bx-id-card text-white ms-1 fs-6 '></i>
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
