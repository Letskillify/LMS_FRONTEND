import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideDrawer from '../Admin Components/Layout/SideDrawer.jsx'
import Footer from '../Admin Components/Layout/Footer.jsx'
import Navbar from '../Admin Components/Layout/Navbar.jsx'
import Home from '../Admin Components/Graph.jsx'
// import StaffManagement from '../Admin Components/Staff/StaffManagement.jsx'
import Studentsinformation from '../Admin Components/Students/Studentsinformation.jsx'
import StudentPromotion from '../Admin Components/Students/StudentPromotion.jsx'
import StudentTransfer from '../Admin Components/Students/StudentTransfer.jsx'
import StudentBirthdays from '../Admin Components/Students/StudentBirthdays.jsx'
import StudentInfo from '../Admin Components/Students/StudentInfo.jsx'
import AdmitStudents from '../Admin Components/Admission/AdmitStudents.jsx'
import AdmitBulk from '../Admin Components/Admission/AdmitBulk.jsx'
import ManageParents from '../Admin Components/Parents/ManageParents.jsx'
import idCard from "../Admin Components/idCardPrint/IdCardPrint.jsx"
import StudentIdCard from "../Admin Components/idCardPrint/idCard.jsx"
import StaffIdCard from "../Admin Components/idCardPrint/StaffIdCard.jsx"
import Fee from '../Admin Components/Fee Payment/Fee.jsx'
import FeeManage from '../Admin Components/Fee Payment/FeeManage.jsx'
import ManageAttendance from '../Admin Components/Attandance/manageAttendance.jsx'
import StudentReport from '../Admin Components/Attandance/StudentReport.jsx'
import StudentReportPrint from '../Admin Components/Attandance/StudentReportPrint.jsx'
import StaffAttendance from '../Admin Components/Attandance/StaffAttendance.jsx'
import StudentAttendance from '../Admin Components/Attandance/StudentAttendance.jsx'
import LiveClass from '../Admin Components/liveClass/LiveClass.jsx'
import AddTimeTable from '../Admin Components/Timetable/AddTimeTable.jsx'
import StaffSalarySetting from '../Admin Components/StaffSalary/StaffSalarySetting.jsx'
import SalaryGeneration from '../Admin Components/StaffSalary/SalaryGeneration.jsx'
import ManageSalaries from '../Admin Components/StaffSalary/ManageSalaries.jsx'
import LoanManagement from '../Admin Components/StaffSalary/LoanManagement.jsx'
import SalaryLoanReport from '../Admin Components/StaffSalary/SalaryLoanReport.jsx'
import Balancesheet from '../Admin Components/Accounting/Balancesheet.jsx'
import StudentTrash from '../Admin Components/Admission/Trash files/StudentTrash.jsx'
import PrivteRoute from '../Utils/PrivteRoute.jsx'
import LoginForm from '../Auth User/LoginForm.jsx'
import StudentDetail from '../Admin Components/Admission/StudentDetail.jsx'
import ExamTests from '../Admin Components/Exams/ExamTests.jsx'
// import LibraryMember from '../Admin Components/librarys/LibraryMember.jsx'
import BookList from '../Admin Components/librarys/BooksList.jsx'
// import BookReturn from '../Admin Components/librarys/BookReturn.jsx'
import BookIssue from '../Admin Components/librarys/BookIssue.jsx'
// import AllTeacher from '../Admin Components/Study Material/AllTeachers.jsx'
import EditStudentData from '../Admin Components/Admission/EditStudentData.jsx'
import AdmissionEnquiry from '../Admin Components/Admission/AdmissionEnquiry.jsx'
import InstituteRegister from '../Auth User/InstituteRegister.jsx'
import InstituteProfile from '../Admin Components/Institute/InstituteProfile.jsx'
import FeesOverview from '../Admin Components/Fee Management/FeesOverview.jsx'
import FeeStructure from '../Admin Components/Fee Management/FeeStructure.jsx'
import FeeDetails from '../Admin Components/Fee Management/FeeDetails.jsx'
import FeeReminderToAll from '../Admin Components/Fee Management/FeeReminderToAll.jsx'
import PendingFeesTracker from '../Admin Components/Fee Management/PendingFeesTracker.jsx'
import EditParents from '../Admin Components/Parents/EditParents.jsx'
import ImageUploadComponent from '../Admin Components/Test files/ImageUploadComponent.jsx'
import EditProfile from '../Admin Components/Institute/EditProfile.jsx'
import Stock from '../Admin Components/stock/Stock.jsx'
import StaffManagement from '../Admin Components/Staff/StaffManagement.jsx'
import NonTeachingStaff from '../Admin Components/Staff/NonTeachingStaff.jsx'
import TeachingStaff from '../Admin Components/Staff/TeachingStaff.jsx'
import BookListTrash from '../Admin Components/librarys/BookListTrash.jsx'
import BooksList from '../Admin Components/librarys/BooksList.jsx'
import Hostel from '../Admin Components/Hostel Management/Hostel.jsx'
import AdminHomeWork from '../Admin Components/HomeWork Management/AdminHomeWork.jsx'
import TeacherHomeWork from '../Admin Components/HomeWork Management/TeacherHomeWork.jsx'
import ExamForm from '../Admin Components/Exam Management/ExamForm.jsx'
// import StudentExam from '../Admin Components/Exam Management/StudentExam.jsx'
// import TeacherExam from '../Admin Components/Exam Management/TeacherExam.jsx'
import StudyMaterial from '../Admin Components/Study Materials/StudyMaterial.jsx'
import VideoUploaderComponent from '../Admin Components/Test files/VideoUploaderComponent .jsx'
import FileUploader from '../Admin Components/Test files/FileUploader.jsx'
import CsvToJsonConverter from '../Admin Components/Test files/CsvToJsonConverter.jsx'
import RazerpayTest from '../Admin Components/Test files/RazerpayTest.jsx'
import FeeCollection from '../Admin Components/Fee Management/FeeCollection.jsx'
import PasswordForget from '../Auth User/PasswordForget.jsx'
// import AddSections from '../Admin Components/Sections/AddSections.jsx'
import MultiSelectFormik from '../Admin Components/Test files/MultiSelectFormik.jsx'
import CreateSemester from '../Admin Components/Academics/CreateSemester.jsx'
import CreateShift  from '../Admin Components/Academics/CreateShift.jsx'
import Medium from '../Admin Components/Academics/Medium.jsx'
import Section from '../Admin Components/Academics/Section.jsx'
import Stream from '../Admin Components/Academics/Stream.jsx'
import Subject from '../Admin Components/Academics/Subject.jsx'
import Board from '../Admin Components/Academics/Board.jsx'
// import ClassGroup from '../Admin Components/Academics/c`'
import Purchase from '../Admin Components/Vouchars/Purchase.jsx'
import ExpenseForm from '../Admin Components/Vouchars/ExpenseForm.jsx'
import Sale from '../Admin Components/Vouchars/Sale.jsx'
import Receipt from '../Admin Components/Vouchars/Receipt.jsx'
import Classes from '../Admin Components/Academics/Classes.jsx'
import Course from '../Admin Components/Academics/Course.jsx'
import IdCard from '../Admin Components/idCardPrint/idCard.jsx'
import IdCardPrint from '../Admin Components/idCardPrint/IdCardPrint.jsx'
import CourseGroup from '../Admin Components/Academics/CourseGroup.jsx'
import AssignTeacher from '../Admin Components/Academics/AssignTeacher.jsx'
import FeeType from '../Admin Components/Fee Management/FeeType.jsx'
import Settings from '../Admin Components/Setting/Settings.jsx'
import StockInventory from '../Admin Components/stock/Inventory.jsx'
import EmployeRole from '../Admin Components/Employe-Role/EmployeRole.jsx'
import Holiday from '../Admin Components/Hoslidays/Holiday.jsx'
import ExamType from '../Admin Components/Exam Management/ExamType.jsx'
import { getCommonCredentials } from '../GlobalHelper/CommonCredentials.jsx'
import { useFetchInstituteData } from '../Controller/useFetchAllQueries.jsx'
import ExpenseGetReceipt from '../Admin Components/Vouchars/ExpenseGetReceipt.jsx'
import NCERTclass from '../Admin Components/NCRT/NCERTclass.jsx'
import NCERTsubject from '../Admin Components/NCRT/NCERTsubject.jsx'
// import ExamType from '../Admin Components/Exam Management/ExamType.jsx'
import NoticeBoard from '../Admin Components/Notice Board/NoticeBoard.jsx'
import LeaveManagement from '../Admin Components/LeaveManagement.jsx'
import Class from '../Admin Components/NCRT/NCRTbooks/Book.jsx'
import Subjects from '../Admin Components/NCRT/NCRTbooks/Subjects.jsx'
import Chapters from '../Admin Components/NCRT/NCRTbooks/Chapter.jsx'
import Book from '../Admin Components/NCRT/NCRTbooks/Book.jsx'

const AdminDashboard = () => {
  const { userId, Designation: designation, Islogin, Token: token } =
    getCommonCredentials();
  // const token = sessionStorage.getItem("token");
  useFetchInstituteData(userId, Islogin, token, designation);
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {token ? <SideDrawer /> : ''}
        <div className="layout-page " style={{ overflowY: 'scroll', height: '100vh', scrollbarWidth: 'thin' }}>
          {token ? <Navbar /> : ''}
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<PrivteRoute />}>
                <Route path='/testfile' element={<ImageUploadComponent />} />
                <Route path='/videotestfile' element={<VideoUploaderComponent />} />
                <Route path='/fileuploadertest' element={<FileUploader />} />
                <Route path='/CsvToJsonConverter' element={<CsvToJsonConverter />} />
                <Route path='/razerpaytest' element={<RazerpayTest />} />
                <Route path='/MultiSelectFormiktest' element={<MultiSelectFormik />} />
                <Route path="/" element={<Home />}></Route>
                <Route path="/instituteprofile" element={<InstituteProfile />}></Route>
                <Route path="/editinstituteprofile" element={<EditProfile />}></Route>
                <Route path="/admit-students" element={<AdmitStudents />}></Route>
                <Route path="/editstudents" element={<EditStudentData />}></Route>
                <Route path="/admissionenquiry" element={<AdmissionEnquiry />}></Route>
                <Route path="/admit-bulk-students" element={<AdmitBulk />}></Route>
                <Route path="/student-info" element={<Studentsinformation />}></Route>
                <Route path="/student-promote" element={<StudentPromotion />}></Route>
                <Route path="/student-transfer" element={<StudentTransfer />}></Route>
                <Route path="/student-birthdays" element={<StudentBirthdays />}></Route>
                <Route path="/studentInfo" element={<StudentInfo />}></Route>
                <Route path="/manage-accounts" element={<ManageParents />}></Route>
                <Route path="/editparents" element={<EditParents />}></Route>
                <Route path='/student-id-card' element={<StudentIdCard />}></Route>
                <Route path='/staff-id-card' element={<StaffIdCard />}></Route>
                <Route path='/id-card-stu' element={<IdCard />}></Route>
                <Route path='/id-card-staff' element={<StaffIdCard />}></Route>
                <Route path='/id-card-print' element={<IdCardPrint />}></Route>
                <Route path='/feepayment' element={<Fee />}></Route>
                <Route path='/Check' element={<FeeManage />}></Route>
                <Route path='/manage-attendance' element={<ManageAttendance />}></Route>
                <Route path='/student-attendance' element={<StudentAttendance />}></Route>
                <Route path='/student-report' element={<StudentReport />}></Route>
                <Route path='/student-report-print' element={<StudentReportPrint />}></Route>
                <Route path='/addtimetable' element={<AddTimeTable />}></Route>
                <Route path='/liveclass' element={<LiveClass />} />
                <Route path='/staff-attendance' element={<StaffAttendance />} />
                <Route path='/staffsalarysetting' element={<StaffSalarySetting />} />
                <Route path='/salaryGeneration' element={<SalaryGeneration />} />
                <Route path='/managesalaries' element={<ManageSalaries />} />
                <Route path='/loanmanagement' element={<LoanManagement />} />
                <Route path='/salaryloanreport' element={<SalaryLoanReport />} />
                <Route path='/balancesheet' element={<Balancesheet />} />
                <Route path='/studenttrash' element={<StudentTrash />} />
                <Route path='/exams' element={<ExamTests />} />
                {/* <Route path='/librarymember' element={<LibraryMember />} /> */}
                <Route path='/booklist' element={<BooksList />} />
                {/* <Route path='/bookreturn' element={<BookReturn />} /> */}
                <Route path='/bookissue' element={<BookIssue />} />
                <Route path="/booklisttrash" element={<BookListTrash />} />
                {/* <Route path='/Studymaterial' element={<AllTeacher />} /> */}
                <Route path='/studentdetail/:id' element={<StudentDetail />} />
                <Route path='/feesoverview' element={<FeesOverview />} />
                <Route path='/feestructure' element={<FeeStructure />} />
                <Route path='/feesdetails' element={<FeeDetails />} />
                <Route path='/feeremindertoall' element={<FeeReminderToAll />} />
                <Route path='/pendingfees' element={<PendingFeesTracker />} />
                <Route path='/feecollection' element={<FeeCollection />} />
                <Route path='/stock-Account' element={<Stock />} />
                <Route path='/stock-inventory' element={<StockInventory/>} />
                <Route path="/staff-management" element={<StaffManagement />}></Route>
                <Route path="/non-teaching-staff" element={<NonTeachingStaff />}></Route>
                <Route path="/teaching-staff" element={<TeachingStaff />}></Route>
                <Route path="/hostelmanage" element={<Hostel />}></Route>
                <Route path="/adminhomework" element={<AdminHomeWork />}></Route>
                <Route path="/teacherhomework" element={<TeacherHomeWork />}></Route>
                <Route path="/adminexam" element={<ExamForm />}></Route>
                <Route path="/teacherexam" element={<ExamType/>}></Route>
                {/* <Route path="/studentexam" element={<StudentExam />}></Route> */}
                <Route path="/studymaterial" element={<StudyMaterial />}></Route>
                {/* <Route path="/addsections" element={<AddSections />}></Route> */}
                <Route path="/semesters" element={<CreateSemester />}></Route>
                <Route path="/shifts" element={<CreateShift />}></Route>
                <Route path="/mediums" element={<Medium />}></Route>
                <Route path="/sections" element={<Section />}></Route>
                <Route path="/streams" element={<Stream />}></Route>
                <Route path="/subjects" element={<Subject />}></Route>
                <Route path="/board" element={<Board />}></Route>
                {/* <Route path="/classgroup" element={<ClassGroup />}></Route> */}
                <Route path="/Voucher-purchase" element={<Purchase />}></Route>
                <Route path="/Vourchar-expense" element={<ExpenseForm />}></Route>
                <Route path="/Vourchar-expense-get" element={<ExpenseGetReceipt />}></Route>
                <Route path="/Vourchar-Sale" element={<Sale />}></Route>
                <Route path="/Vourchar-Receipt" element={<Receipt />}></Route>
                <Route path="/course" element={<Course />}></Route>
                <Route path="/coursegroup" element={<CourseGroup />}></Route>
                <Route path="/classes" element={<Classes />}></Route>
                <Route path="/assignteachers" element={<AssignTeacher />}></Route>
                <Route path="/holiday" element={<Holiday/>}></Route>
                <Route path="/fee-type" element={<FeeType />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/employe-role" element={<EmployeRole/>}></Route>
                <Route path="fee-type" element={<FeeType />}></Route>
                <Route path="employe-role" element={<EmployeRole/>}></Route>
                <Route path='/leave' element={<Leave/>} />
                <Route path='/admin-leave' element={<Leaveinstitute/>} />
                <Route path='/Notification-Board' element={<NotificationBoard/>} />
                <Route path='/NCERT-class' element={<NCERTclass/>} />
                <Route path='/NCERT-subject' element={<NCERTsubject/>} />
                <Route path='/leavemanagement' element={<LeaveManagement/>} />
                <Route path='/notice-board' element={<NoticeBoard/>} />
                <Route path='/NCRT-class' element={<Class/>} />
                <Route path='/NCRT-subject' element={<Subjects/>} />
                <Route path='/NCRT-chapters' element={<Chapters/>} />
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

export default AdminDashboard
