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
import StudentIdCard from '../Admin Components/idCardPrint/idCard.jsx'
import StaffIdCard from '../Admin Components/idCardPrint/StaffIdCard.jsx'
import IdCardStu from '../Admin Components/idCardPrint/IdCardStu.jsx'
import IdCardStaff from '../Admin Components/idCardPrint/IdCardStaff.jsx'
import Accountant from '../Admin Components/Accountant/Accountant.jsx'
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
import AddClass from '../Admin Components/Class Management/AddClass.jsx'
import ImageUploadComponent from '../Admin Components/Test files/ImageUploadComponent.jsx'
import EditProfile from '../Admin Components/Institute/EditProfile.jsx'
import Stock from '../Admin Components/stock/Stock.jsx'
import Subjects from '../Admin Components/Class Management/Subjects.jsx'
import StaffManagement from '../Admin Components/Staff/StaffManagement.jsx'
import NonTeachingStaff from '../Admin Components/Staff/NonTeachingStaff.jsx'
import TeachingStaff from '../Admin Components/Staff/TeachingStaff.jsx'
import BookListTrash from '../Admin Components/librarys/BookListTrash.jsx'
import BooksList from '../Admin Components/librarys/BooksList.jsx'
import Hostel from '../Admin Components/Hostel Management/Hostel.jsx'
import AdminHomeWork from '../Admin Components/HomeWork Management/AdminHomeWork.jsx'
import TeacherHomeWork from '../Admin Components/HomeWork Management/TeacherHomeWork.jsx'
import AdminExam from '../Admin Components/Exam Management/AdminExam.jsx'
import StudentExam from '../Admin Components/Exam Management/StudentExam.jsx'
import TeacherExam from '../Admin Components/Exam Management/TeacherExam.jsx'
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
import CreateShift from '../Admin Components/Academics/CreateShift.jsx'
import Medium from '../Admin Components/Academics/Medium.jsx'
import Section from '../Admin Components/Academics/Section.jsx'
import Stream from '../Admin Components/Academics/Stream.jsx'
import Subject from '../Admin Components/Academics/Subject.jsx'

const AdminDashboard = () => {
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
                <Route path='/student-id-Card' element={<StudentIdCard />}></Route>
                <Route path='/staff-id-card' element={<StaffIdCard />}></Route>
                <Route path='/id-card-stu' element={<IdCardStu />}></Route>
                <Route path='/id-card-staff' element={<IdCardStaff />}></Route>
                <Route path='/accountant' element={<Accountant />}></Route>
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
                <Route path='/addclasses' element={<AddClass />} />
                <Route path='/allclasses&subjects' element={<Subjects />} />
                <Route path='/stock-Account' element={<Stock />} />
                <Route path="/staff-management" element={<StaffManagement />}></Route>
                <Route path="/non-teaching-staff" element={<NonTeachingStaff />}></Route>
                <Route path="/teaching-staff" element={<TeachingStaff />}></Route>
                <Route path="/hostelmanage" element={<Hostel />}></Route>
                <Route path="/adminhomework" element={<AdminHomeWork />}></Route>
                <Route path="/teacherhomework" element={<TeacherHomeWork />}></Route>
                <Route path="/adminexam" element={<AdminExam />}></Route>
                <Route path="/teacherexam" element={<TeacherExam />}></Route>
                <Route path="/studentexam" element={<StudentExam />}></Route>
                <Route path="/studymaterial" element={<StudyMaterial />}></Route>
                {/* <Route path="/addsections" element={<AddSections />}></Route> */}
                <Route path="/semesters" element={<CreateSemester />}></Route>
                <Route path="/shifts" element={<CreateShift />}></Route>
                <Route path="/mediums" element={<Medium />}></Route>
                <Route path="/sections" element={<Section />}></Route>
                <Route path="/streams" element={<Stream />}></Route>
                <Route path="/subjects" element={<Subject />}></Route>
                <Route path="/board" element={<Board />}></Route>
                <Route path="/classgroup" element={<ClassGroup />}></Route>
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
