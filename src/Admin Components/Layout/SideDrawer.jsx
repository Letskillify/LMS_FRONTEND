import React, { useContext, useState } from 'react'
import black from "../../assets/img/logo_black.svg"
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MainContext } from '../../Controller/MainProvider';
function SideDrawer() {
    const location = useLocation();
    const [OpenToggle, setOpenToggle] = useState()
    const [SubopenToggle, setSubopenToggle] = useState()

    const { sidebaropen } = useContext(MainContext)
    const stutoggle = () => {
        setOpenToggle(OpenToggle === "stuinfo" ? '' : 'stuinfo')
    }
    const Academic = () => {
        setOpenToggle(OpenToggle === "Academic" ? '' : 'Academic')
    }
    const admtoggle = () => {
        setSubopenToggle(SubopenToggle === "admission" ? '' : 'admission')
    }
    const admintoggle = () => {
        setOpenToggle(OpenToggle === "admissionIn" ? '' : 'admissionIn')
    }
    const partoggle = () => {
        setOpenToggle(OpenToggle === "parentinfo" ? '' : 'parentinfo')
    }
    const idCardStu = () => {
        setOpenToggle(OpenToggle === "idCard" ? '' : 'idCard')
    }
    const manageAttendance = () => {
        setOpenToggle(OpenToggle === "manageAtt" ? '' : 'manageAtt')
    }

    const StockInventory = () => {
        setOpenToggle(OpenToggle === "stockInventory" ? '' : 'stockInventory')
    }

    const Voucher = () => {
        setOpenToggle(OpenToggle === "voucher" ? '' : 'voucher')
    }
    const staffSalaryGenerate = () => {
        setOpenToggle(OpenToggle === "staffsalary" ? '' : 'staffsalary')
    }
    const attendanceReport = () => {
        setSubopenToggle(SubopenToggle === "report" ? '' : 'report')
    }
    const TimeTableManagement = () => {
        setOpenToggle(OpenToggle === "timetables" ? '' : 'timetables')
    }
    const handlefeemanagement = () => {
        setOpenToggle(OpenToggle === "feemanagement" ? '' : 'feemanagement')
    }
    const handleHomework = () => {
        setOpenToggle(OpenToggle === "Homework" ? '' : 'Homework')
    }
    const handleExam = () => {
        setOpenToggle(OpenToggle === "Exam" ? '' : 'Exam')
    }
    const classNamelogic = () => {
        setOpenToggle(OpenToggle === "classNamelogic" ? '' : 'classNamelogic')
    }
    const Library = () => {
        setOpenToggle(OpenToggle === "Library" ? '' : 'Library')
    }
    const staffToggle = () => {
        setOpenToggle(OpenToggle === "staffinfo" ? '' : 'staffinfo')
    }
    const time_Table = [
        '/addtimetable'
    ]
    const activeRoutes = [
        '/student-info',
        '/student-promote',
        '/student-transfer',
        '/student-birthdays',
        '/studentInfo'
    ];
    const admission_activeRoutes = [
        '/admit-students',
        '/admit-bulk-students',
        '/admissionenquiry'

    ];
    const admissionIn_activeRoutes = [


    ];

    const parents_info = [
        '/manage-accounts',
        '/account-requests',
        '/parents-info-report'
    ]

    const Id_cardStudent = [
        '/student-id-Card',
        '/staff-id-card',
        '/id-card-stu'
    ]
    const Manage_Attendance = [
        '/manage-attendance'
    ]
    const Stock_Inventory = [
        '/stock-inventory',
        '/Stock-Access'
    ]

    const Voucher_Stock = [
        '/Voucher-purchase',
        '/Voucher-expense',
        '/Voucher-sales',
        '/Voucher-receipt'
    ]
    const attendance_report = [
        '/student-report',
        '/staff-report'
    ]
    const stf_Salary = [
        '/StaffSalaryGeneration'
    ]
    const librarypath = [
        '/librarymember',
        '/booklist',
        '/bookreturn',
        '/bookissue'
    ]
    const staff_info = [
        '/staff-management'
    ]
    const fee_management = [
        '/feesoverview',
        '/feestructure',
        '/feesdetails',
        '/feeremindertoall',
        '/pendingfees',
        '/feecollection'
    ]
    const Home_work = [
        '/adminhomework',
        '/studenthomework',
        '/teacherhomework'
    ]
    const Exam_management = [
        '/adminexam',
        '/studentexam',
        '/teacherexam'
    ]
    const Academics = [
        '/semesters',
        '/shifts',
        '/mediums',
        '/sections',
        '/course',
        '/streams',
        '/subjects',
        '/board',
        '/coursegroup',
        '/classes',
        '/assignteachers',

    ]
    // const admission
    const isActive = activeRoutes.includes(location.pathname);
    const Adm_isActive = admission_activeRoutes.includes(location.pathname);
    const AdmIn_isActive = admissionIn_activeRoutes.includes(location.pathname);
    const parent_Active = parents_info.includes(location.pathname);
    const Id_card = Id_cardStudent.includes(location.pathname);
    const Attendance = Manage_Attendance.includes(location.pathname);
    const Stockinventory = Stock_Inventory.includes(location.pathname) || location.pathname === '/stockinventory';
    const Vouchers = Voucher_Stock.includes(location.pathname);
    const studentReport = attendance_report.includes(location.pathname);
    const timetable = time_Table.includes(location.pathname);
    const feemanagement = fee_management.includes(location.pathname);
    const Homework = Home_work.includes(location.pathname);
    const Exam = Exam_management.includes(location.pathname);
    const staff = staff_info.includes(location.pathname);
    const Stf_salary = stf_Salary.includes(location.pathname);
    const librarypaths = librarypath.includes(location.pathname);
    const isAcademic = Academics.includes(location.pathname);

    return (
        <>
            <aside id="layout-menu" className={`layout-menu menu-vertical menu bg-menu-theme d-xl-block`} style={{ overflowY: 'scroll', height: '100vh', width: 'auto', scrollbarWidth: 'thin', transform: sidebaropen ? 'none' : '' }}>


                <div className='bg-themprimary'>
                    {/* <p>a</p> */}
                    <ul className="menu-inner ">
                        <div className='d-flex justify-content-center align-items-center mx-auto mt-3'>
                            <Link to={'/'} className="">
                                <span className="">
                                    {/* <img src={black} alt="" style={{ maxHeight: "50px" }} /> */}
                                    <h3 className='fw-bold border border-2 rounded p-3 text-white'>School Logo  <h6 className='mb-0  fw-bold border border-2 rounded-sm mt-2 p-1 text-white'>Admin Dashboard</h6></h3>
                                </span>
                            </Link>
                        </div>
                        <NavLink className="menu-item border-top" activeclassname="active" to="/">
                            <Link to="/" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                                <div data-i18n="Analytics" >Overview</div>
                            </Link>
                        </NavLink>
                        <li className={`menu-item ${isAcademic ? 'active' : ''} ${OpenToggle == 'Academic' ? 'open' : ''}`} id='Academic' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={Academic}>
                                <i className='menu-icon tf-icons bx bx-book-content'></i>
                                <div>Academic Management</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/semesters">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Semesters</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/shifts">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Shifts</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/mediums">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Mediums</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/sections">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Sections</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/streams">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Streams</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/subjects">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Subjects</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/board">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Boards</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/course">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Courses</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/coursegroup">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Course Group</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/classes">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Classes</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/assignteachers">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Assign Teachers</div>
                                    </a>
                                </NavLink>
                            </ul>
                        </li>
                        <li className={`menu-item ${Adm_isActive ? 'active' : ''} ${OpenToggle == 'admissionIn' ? 'open' : ''}`} id='admissionIn' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={admintoggle}>
                                <i className='menu-icon tf-icons bx bx-id-card'></i>
                                <div>Admission Management</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink to="/admit-students" activeclassname="active" className="menu-item" >
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Admit Students</div>
                                    </a>
                                </NavLink>
                                <NavLink to="/admit-bulk-students" activeclassname="active" className="menu-item">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Admit Bulk Students</div>
                                    </a>
                                </NavLink>
                                <NavLink to="/admissionenquiry" activeclassname="active" className="menu-item">
                                    <Link to={"/admissionenquiry"} className="menu-link">
                                        <div>Manage Inquiries</div>
                                    </Link>
                                </NavLink>

                                {/* <NavLink activeclassname="active" className="menu-item" to="/admission-enquiries">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Admission Requests</div>
                                </a>
                            </NavLink>
                            <NavLink activeclassname="active" className="menu-item" to="/Studymaterial">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Study Materials</div>
                                </a>
                            </NavLink>
                            <NavLink activeclassname="active" className="menu-item" to="/exams">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Exams</div>
                                </a>
                            </NavLink>
                            <NavLink activeclassname="active" className="menu-item" to="/">
                                <a href="javascript:void(0);" className="menu-link">
                                <div>Admission Report</div>
                                </a>
                                </NavLink> */}
                            </ul>
                        </li>
                        <li className={`menu-item ${isActive ? 'active' : ''} ${OpenToggle == 'stuinfo' ? 'open' : ''}`} id='stuinfo' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={stutoggle}>
                                <i className='menu-icon tf-icons bx bxs-user-rectangle'></i>
                                <div>Students Management</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/student-info">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Students Information</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/student-promote">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Students Promotions</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/student-transfer">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Students Transfer</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/student-birthdays">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Students Birthdays</div>
                                    </a>
                                </NavLink>
                                {/* <NavLink activeclassname="active" className="menu-item" to="/studentInfo">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Student Info Report</div>
                                </a>
                            </NavLink> */}
                            </ul>
                        </li>
                        <li className={`menu-item ${parent_Active ? 'active' : ''} ${OpenToggle == 'parentinfo' ? 'open' : ''}`} id='parentinfo' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={partoggle}>
                                <i className='menu-icon tf-icons bx bxs-user-badge'></i>
                                <div>Parents Account</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/manage-accounts">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Manage Accounts</div>
                                    </a>
                                </NavLink>
                                {/* <NavLink activeclassname="active" className="menu-item" to="/account-requests">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Account Requests</div>
                                </a>
                            </NavLink>
                            <NavLink activeclassname="active" className="menu-item" to="/parents-info-report">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Parents Info Report</div>
                                </a>
                            </NavLink> */}
                            </ul>
                        </li>
                        <li className={`menu-item ${Homework ? 'active' : ''} ${OpenToggle == 'Homework' ? 'open' : ''}`} id='timetables' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={handleHomework}>
                                <i className='menu-icon tf-icons bx bxs-group'></i>
                                <div>Home Work</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/adminhomework">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Admin homeWork</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/teacherhomework">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Teacher homeWork</div>
                                    </a>
                                </NavLink>
                            </ul>

                        </li>
                        <li className={`menu-item ${Stf_salary ? 'active' : ''} ${OpenToggle == 'classNamelogic' ? 'open' : ''}`}>
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={classNamelogic}>
                                <i className="menu-icon tf-icons bx bx-layout"></i>
                                <div>Class & Subject Management</div>
                            </a>

                            <ul className="menu-sub">
                                <li className="menu-item">
                                    <Link to={"/addclasses"} className="menu-link">
                                        <div>Add Class</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to={"/allclasses&subjects"} className="menu-link">
                                        <div>Classes & Subjects</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <NavLink activeclassname="active" className="menu-item" to="/liveclass">
                            <a href="javascript:void(0);" className="menu-link">
                                <i className="menu-icon  fa fa-video-camera" aria-hidden="true"></i>
                                <div>Live Classes</div>
                            </a>
                        </NavLink>
                        <NavLink activeclassname="active" className="menu-item" to="/studymaterial">
                            <a href="javascript:void(0);" className="menu-link">
                                <i className='menu-icon tf-icons bx bx-pencil'></i>
                                <div>Study Materials</div>
                            </a>
                        </NavLink>
                        <NavLink className="menu-item" activeclassname="active" to="hostelmanage">
                            <Link to="/hostelmanage" className="menu-link">
                                <i className='menu-icon tf-icons bx bx-building-house' ></i>
                                <div>Hostel Management</div>
                            </Link>
                        </NavLink>
                        <li className={`menu-item ${librarypaths ? 'active' : ''} ${OpenToggle == 'Library' ? 'open' : ''}`} id='Library' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={Library}>
                                <i className='menu-icon tf-icons bx bx-book-add'></i>
                                <div>Library</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/booklist">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Book List</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/bookissue">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Book Issue</div>
                                    </a>
                                </NavLink>
                            </ul>
                        </li>
                        <li className={`menu-item ${staff ? 'active' : ''} ${OpenToggle == 'staffinfo' ? 'open' : ''}`} id='staffinfo' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={staffToggle}>
                                <i className='menu-icon tf-icons bx bx-user'></i>
                                <div>Staff Management</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/staff-management">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Staff Management</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/teaching-staff">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Teaching Staff</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/non-teaching-staff">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Non Teaching Staff</div>
                                    </a>
                                </NavLink>
                            </ul>
                        </li>
                        <li className={`menu-item ${feemanagement ? 'active' : ''} ${OpenToggle == 'feemanagement' ? 'open' : ''}`} id='timetables' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={handlefeemanagement}>
                                <i className='menu-icon tf-icons bx bx-rupee'></i>
                                <div>Fee Management</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/feesoverview">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Fees Overview</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/feesdetails">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Fees Accounts</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/pendingfees">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Pending Fees</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/feecollection">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Collect fee</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/feestructure">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Fees Structure</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/feeremindertoall">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Fees Reminder</div>
                                    </a>
                                </NavLink>
                            </ul>

                        </li>
                        <li className={`menu-item ${Exam ? 'active' : ''} ${OpenToggle == 'Exam' ? 'open' : ''}`} id='timetables' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={handleExam}>
                                <i className='menu-icon tf-icons bx bx-book-open'></i>
                                <div>Exam Management</div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/adminexam">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Admin Exam</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/teacherexam">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Teacher Exam</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/studentexam">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Student Exam</div>
                                    </a>
                                </NavLink>
                            </ul>

                        </li>

                        {/* <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bxs-group'></i>
                            <div>Subject</div>
                        </Link>
                    </li> */}
                        {/* <NavLink className="menu-item" activeclassname="active" to="homeWork">
                        <Link to="/homeWork" className="menu-link">
                            <i className='menu-icon tf-icons bx bxs-group'></i>
                            <div>Home Work</div>
                        </Link>
                    </NavLink> */}

                        <li className={`menu-item ${Id_card ? 'active' : ''} ${OpenToggle == 'idCard' ? 'open' : ''}`} id='idCard' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={idCardStu}>
                                <i className='menu-icon tf-icons bx bx-id-card'></i>
                                <div>Id Card Printing </div>
                            </a>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/student-id-card">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Print Student Cards</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/staff-id-card">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Print Staff Cards</div>
                                    </a>
                                </NavLink>
                                {/* <NavLink activeclassname="active" className="menu-item" to="/">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>ID Card Settings</div>
                                </a>
                            </NavLink> */}
                            </ul>
                        </li>

                        {/* <NavLink className="menu-item" activeclassname="active" to="accountant">
                        <Link to="/accountant" className="menu-link">
                            <i className='menu-icon tf-icons bx bxs-group'></i>
                            <div>Accountant</div>
                        </Link>
                    </NavLink>
                    <NavLink className="menu-item" activeclassname="active" to="feepayment">
                        <Link to="/feepayment" className="menu-link">
                            <i className='menu-icon tf-icons bx bx-rupee'></i>
                            <div>Fee Payment</div>
                        </Link>
                    </NavLink> */}
                        <li className={`menu-item ${timetable ? 'active' : ''} ${OpenToggle == 'timetables' ? 'open' : ''}`} id='timetables' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={TimeTableManagement}>
                                <i className='menu-icon tf-icons bx bx-calendar'></i>
                                <div>Time Table Management</div>
                            </a>
                            <ul className="menu-sub">
                                {/* <NavLink activeclassname="active" className="menu-item" to="/">
                                <a href="javascript:void(0);" className="menu-link">
                                    <div>Add Timetable</div>
                                </a>
                            </NavLink> */}
                                <NavLink activeclassname="active" className="menu-item" to="/addtimetable">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Manage Timetable</div>
                                    </a>
                                </NavLink>
                            </ul>

                        </li>
                        <li className={`menu-item ${Attendance ? 'active' : ''} ${OpenToggle == 'manageAtt' ? 'open' : ''}`} id='manageAtt' >
                            <Link to="/manage-attendance" className="menu-link menu-link menu-toggle" onClick={manageAttendance}>
                                <i className='menu-icon tf-icons bx bx-id-card'></i>
                                <div>Manage Attendance</div>
                            </Link>

                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/student-attendance">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Students Attendance</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/staff-attendance">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Staff Attendance</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Attendance Accounts</div>
                                    </a>
                                </NavLink>
                                {/* <li className={`menu-item ${studentReport ? 'active' : ''} ${SubopenToggle == 'report' ? 'open' : ''}`} id='report' >
                                <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={attendanceReport}>
                                    <div> Attendance Report </div>
                                </a>
                                <ul className="menu-sub">
                                    <NavLink activeclassname="active" className="menu-item" to="/student-report">
                                        <a href="javascript:void(0);" className="menu-link">
                                            <div>Students Attendance Report</div>
                                        </a>
                                    </NavLink>
                                    <NavLink activeclassname="active" className="menu-item" to="/staff-report">
                                        <a href="javascript:void(0);" className="menu-link">
                                            <div>Staff Attendance Report</div>
                                        </a>
                                    </NavLink>
                                </ul>
                            </li> */}
                            </ul>
                        </li>
                        <li className={`menu-item ${Stf_salary ? 'active' : ''} ${OpenToggle == 'staffsalary' ? 'open' : ''}`} id='staffsalary' >
                            <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={staffSalaryGenerate}>
                                <i className='menu-icon tf-icons bx bx-money'></i>
                                <div>Staff Salary Management</div>
                            </a>
                            <ul className='menu-sub'>

                                <NavLink activeclassname="active" className="menu-item" to="/staffsalarysetting">
                                    <a href="javascript:void(0);" className="menu-link">

                                        <div>Salary Generation setting</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/managesalaries">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Manage Salaries</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/loanmanagement">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Loan Management</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/salaryloanreport">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Salary & Loan Reports</div>
                                    </a>
                                </NavLink>
                            </ul>
                        </li>

                        <NavLink activeclassname="active" className="menu-item" to="/balancesheet">
                            <a href="javascript:void(0);" className="menu-link">
                                <i className="menu-icon  tf-icons bx bx-credit-card-front" ></i>
                                <div>Accounting</div>
                            </a>
                        </NavLink>


                        {/* <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bx-chat'></i>
                            <div>Public Massages</div>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bxs-group'></i>
                            <div>Manage Attendance</div>
                        </Link>
                    </li> */}
                        {/* <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bx-calendar'></i>
                            <div>Time Table Management</div>
                        </Link>
                    </li> */}


                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-wallet'></i>
                                <div>Expense Management</div>
                            </Link>
                        </li>

                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-file'></i>
                                <div>Reporting Area</div>
                            </Link>
                        </li>
                        <li className={`menu-item ${Stockinventory ? 'active' : ''} ${OpenToggle == 'stockInventory' ? 'open' : ''}`} id='stockInventory'>
                            <Link to="/stock-account" className="menu-link menu-link menu-toggle" onClick={() => { StockInventory(); }}>
                                <i className='menu-icon tf-icons bx bx-layer'></i>
                                <div>Stock & Inventory</div>
                            </Link>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/stock-account">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Stock Account</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/stock-inventory">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Stock Inventory</div>
                                    </a>
                                </NavLink>
                            </ul>
                        </li>
                        <li className={`menu-item ${Vouchers ? 'active' : ''} ${OpenToggle === 'voucher' ? 'open' : ''}`} id='Vouchers'>
                            <Link to="/Voucher-purchase" className="menu-link menu-toggle" onClick={Voucher}>
                                <i className='menu-icon tf-icons bx bx-layer'></i>
                                <div>Voucher</div>
                            </Link>
                            <ul className="menu-sub">
                                <NavLink activeclassname="active" className="menu-item" to="/Voucher-purchase">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Purchase</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="/Vourchar-expense">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Expense</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="Vourchar-Sale">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Sales</div>
                                    </a>
                                </NavLink>
                                <NavLink activeclassname="active" className="menu-item" to="Vourchar-Receipt">
                                    <a href="javascript:void(0);" className="menu-link">
                                        <div>Receipt</div>
                                    </a>
                                </NavLink>
                            </ul>
                        </li>
                        {/* <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bx-book-open'></i>
                            <div>Exam Management</div>
                        </Link>
                    </li> */}
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-certification' ></i>
                                <div>Certification</div>
                            </Link>
                        </li>
                        {/* <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bx-timer'></i>
                            <div>Daily Home Work Dairy</div>
                        </Link>
                    </li> */}
                        {/* <li className="menu-item">
                        <Link className="menu-link" to="/studymaterial">
                            <i className='menu-icon tf-icons bx bx-pencil'></i>
                            <div>Study Material</div>
                        </Link>
                    </li> */}
                        {/* <li className="menu-item">
                        <Link className="menu-link">
                            <i className='menu-icon tf-icons bx bx-book-add'></i>
                            <div>Library Management</div>
                        </Link>
                    </li> */}
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-book-reader'></i>
                                <div>Leave Management</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-message-rounded-dots'></i>
                                <div>SMS Management</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-mobile-alt' ></i>
                                <div>Mobile App Notification</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-envelope' ></i>
                                <div>Email Alerts</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-chalkboard' ></i>
                                <div>School Notice Board</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bxs-school'></i>
                                <div>Manage Campus</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bxs-group'></i>
                                <div>Admin Roles Management</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-globe'></i>
                                <div>Website Management</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-book'></i>
                                <div>Books & Stationery</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-bus-school' ></i>
                                <div>Bus Management</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bx-run' ></i>
                                <div>Sports</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link">
                                <i className='menu-icon tf-icons bx bxs-school'></i>
                                <div>School Information Management</div>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to={'/settings'}>
                                <i className='menu-icon tf-icons bx bx-cog' ></i>
                                <div>Setting</div>
                            </Link>
                        </li>

                        {/* <li className="menu-item">
                        <a href="" target="_blank" className="menu-link" >
                            <i className="menu-icon tf-icons bx bx-support"></i>
                            <div data-i18n="Support">Support</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="" target="_blank" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-file"></i>
                            <div>Documentation</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="" target="_blank" className="menu-link">
                            <i className='menu-icon tf-icons bx bx-recycle'></i>
                            <div>Recycle</div>
                        </a>
                    </li> */}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideDrawer
