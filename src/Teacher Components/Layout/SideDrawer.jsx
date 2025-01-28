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
    // const admission
    const isActive = activeRoutes.includes(location.pathname);
    const Adm_isActive = admission_activeRoutes.includes(location.pathname);
    const AdmIn_isActive = admissionIn_activeRoutes.includes(location.pathname);
    const parent_Active = parents_info.includes(location.pathname);
    const Id_card = Id_cardStudent.includes(location.pathname);
    const Attendance = Manage_Attendance.includes(location.pathname);
    const studentReport = attendance_report.includes(location.pathname);
    const timetable = time_Table.includes(location.pathname);
    const feemanagement = fee_management.includes(location.pathname);
    const Homework = Home_work.includes(location.pathname);
    const Exam = Exam_management.includes(location.pathname);
    const staff = staff_info.includes(location.pathname);
    const Stf_salary = stf_Salary.includes(location.pathname);
    const librarypaths = librarypath.includes(location.pathname);

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
                                    <h3 className='fw-bold border border-2 rounded p-3 text-white'>School Logo  <h6 className='mb-0  fw-bold border border-2 rounded-sm mt-2 p-1 text-white'>Teacher Dashboard</h6></h3>
                                </span>
                            </Link>
                        </div>
                        <NavLink className="menu-item border-top" activeclassname="active" to="/">
                            <Link to="/" className="menu-link">
                                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                                <div data-i18n="Analytics" >Overview</div>
                            </Link>
                        </NavLink>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideDrawer
