import React, { createContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import CryptoJS from "crypto-js";
import axios from "axios";
import {
  getApi,
  HitApi,
  PostApi,
  DeleteApi,
  PutApi,
} from "../Custom Hooks/CustomeHook";
export const MainContext = createContext();
export const MainProvider = ({ children }) => {
  const [StudentTrash, setStudentTrash] = useState([])
  const [studentData, setStudentData] = useState([])
  const [institute, setInstitute] = useState(null)
  const [Student, setStudent] = useState(null)
  const [Teacher, setTeacher] = useState(null)
  const [instituteId, setInstituteId] = useState(null)
  const [sidebaropen, setsidebaropen] = useState(false)
  const [Semester, setSemester] = useState(null)
  const [Shift, setShift] = useState(null)
  const [Medium, setMedium] = useState(null)
  const [Section, setSection] = useState(null)
  const [Stream, setStream] = useState(null)
  const [Subject, setSubject] = useState(null)
  const [Board, setBoard] = useState(null)
  const [Course, setCourse] = useState(null)
  const [CourseGroup, setCourseGroup] = useState(null)
  const [Class, setClass] = useState(null)

  // for stop open inspect

  // useEffect(() => {
  //   const disableRightClick = (e) => e.preventDefault();
  //   document.addEventListener("contextmenu", disableRightClick);

  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // F12 key or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U
  //     if (
  //       e.keyCode === 123 || // F12
  //       (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
  //       (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
  //       (e.ctrlKey && e.keyCode === 85) // Ctrl+U
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  //////////////////////////////////////////////////////////////////////////////

  // const [exams, setExams] = useState()


  useEffect(() => {
    fetchStudent();
    fetchTeacher();
    fetchInstitute();
  }, []);

  // Fetch Other Data Only After instituteId is Available
  useEffect(() => {
    if (instituteId) {
      fetchSemester();
      fetchShift();
      fetchMedium();
      fetchSection();
      fetchStream();
      fetchSubject();
      fetchBoard();
      fetchCourse();
      fetchCourseGroup();
      fetchClass();
      fetchStudentData();
      fetchTrashData();
    }
  }, [instituteId]);

  const fetchStudentData = async () => {
    const data = await getApi("/api/student/get");
    setStudentData(data);
  };

  const fetchTrashData = async () => {
    const data = await getApi("/api/student/get-trash");
    setStudentTrash(data);
  };

  function HandleLogOut() {
    sessionStorage.clear();
    window.location.reload();
  }

  // File Save in CSV

  const flattenObject = (obj, prefix = "") => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        Object.assign(acc, flattenObject(value, newKey));
      } else {
        acc[newKey] = value;
      }

      return acc;
    }, {});
  };

  const handleExportCSV = () => {
    const flattenedData = studentData.map((item) => flattenObject(item));

    const csv = Papa.unparse(flattenedData);

    // Create a blob and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  // Print Excel Data Logic

  const exportToExcel = () => {
    const wsData = studentData.map((student) => ({
      StuID: student?.StuID || "N/A",
      BiometricID: student?.biometricID || "N/A",
      FaceID: student?.faceID || "N/A",
      IsIDGenerated: student?.isIDgenerated ? "Yes" : "No",
      ProfilePhoto: student?.personalDetails?.profilePhoto || "N/A",
      FirstName: student?.personalDetails?.firstName || "N/A",
      LastName: student?.personalDetails?.lastName || "N/A",
      DateOfBirth: student?.personalDetails?.dateOfBirth || "N/A",
      Gender: student?.personalDetails?.gender || "N/A",
      BloodGroup: student?.personalDetails?.bloodGroup || "N/A",
      AadharNo: student?.personalDetails?.aadharNo || "N/A",
      MaritalStatus: student?.personalDetails?.maritalStatus
        ? "Married"
        : "Single",
      Nationality: student?.personalDetails?.nationality || "N/A",
      Religion: student?.personalDetails?.religion || "N/A",
      Category: student?.personalDetails?.category || "N/A",
      Caste: student?.personalDetails?.caste || "N/A",
      Email: student?.contactInfo?.email || "N/A",
      Mobile: student?.contactInfo?.mobile || "N/A",
      WhatsApp: student?.contactInfo?.whatsapp || "N/A",
      AlternateContact: student?.contactInfo?.alternateContact || "N/A",
      Address:
        `${student?.contactInfo?.address?.houseNo || ""}, ${student?.contactInfo?.address?.streetName || ""
          }, ${student?.contactInfo?.address?.city || ""}, ${student?.contactInfo?.address?.state || ""
          }, ${student?.contactInfo?.address?.country || ""}, ${student?.contactInfo?.address?.pincode || ""
          }`.trim() || "N/A",
      FatherName: student?.parentDetails?.Father?.name || "N/A",
      FatherContact: student?.parentDetails?.Father?.contactNumber || "N/A",
      MotherName: student?.parentDetails?.Mother?.name || "N/A",
      MotherContact: student?.parentDetails?.Mother?.contactNumber || "N/A",
      GuardianName: student?.parentDetails?.Guardian?.name || "N/A",
      GuardianRelation: student?.parentDetails?.Guardian?.relation || "N/A",
      GuardianContact: student?.parentDetails?.Guardian?.contactNumber || "N/A",
      RollNo: student?.academicDetails?.previous?.rollNo || "N/A",
      Class: student?.academicDetails?.previous?.class || "N/A",
      Stream: student?.academicDetails?.previous?.stream || "N/A",
      Percentage: student?.academicDetails?.previous?.percentage || "N/A",
      Marks: student?.academicDetails?.previous?.marks || "N/A",
      AdmissionType: student?.enrollmentDetails?.admissionType || "N/A",
      AdmissionCategory: student?.enrollmentDetails?.admissionCategory || "N/A",
      AdmissionDate: student?.enrollmentDetails?.admissionDate || "N/A",
      EnrollmentNo: student?.enrollmentDetails?.enrollmentNO || "N/A",
      TotalFee: student?.feeDetails?.totalFee || "N/A",
      AmountPaid: student?.feeDetails?.amountPaid || "N/A",
      DueFees: student?.feeDetails?.dueFees || "N/A",
      PaymentMethod: student?.feeDetails?.paymentMethod || "N/A",
      PaymentReferenceID: student?.feeDetails?.paymentReferenceID || "N/A",
      BankAccountHolderName: student?.bankDetails?.accountHolderName || "N/A",
      BankName: student?.bankDetails?.bankName || "N/A",
      BranchName: student?.bankDetails?.branchName || "N/A",
      AccountNumber: student?.bankDetails?.accountNumber || "N/A",
      IFSCCode: student?.bankDetails?.ifscCode || "N/A",
      UPIID: student?.bankDetails?.upiID || "N/A",
      Marksheet: student?.documents?.marksheet || "N/A",
      TransferCertificate: student?.documents?.transferCertificate || "N/A",
      IsProfileComplete: student?.is_profile_complete ? "Yes" : "No",
      CreatedAt: student?.createdAt || "Auto-generated by backend",
    }));
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "student_data.xlsx");
  };

  // Print Logic
  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=1200");
    printWindow.document.write(
      "<html><head><title>Print Students Details</title></head><body>"
    );
    printWindow.document.write("<h1>Students Details</h1>");

    studentData?.forEach((studentData, index) => {
      printWindow.document.write(`<h2>Student ${index + 1}</h2>`);

      // Personal Details
      printWindow.document.write("<h3>Personal Details</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Profile Photo</th><td><img src="${studentData?.personalDetails?.profilePhoto
        }" alt="Profile Photo" width="100"></td></tr>
          <tr><th>First Name</th><td>${studentData?.personalDetails?.firstName || "Not Provided"
        }</td></tr>
          <tr><th>Last Name</th><td>${studentData?.personalDetails?.lastName || "Not Provided"
        }</td></tr>
          <tr><th>Date of Birth</th><td>${studentData?.personalDetails?.dateOfBirth || "Not Provided"
        }</td></tr>
          <tr><th>Gender</th><td>${studentData?.personalDetails?.gender || "Not Provided"
        }</td></tr>
          <tr><th>Blood Group</th><td>${studentData?.personalDetails?.bloodGroup || "Not Provided"
        }</td></tr>
          <tr><th>Aadhar Number</th><td>${studentData?.personalDetails?.aadharNo || "Not Provided"
        }</td></tr>
          <tr><th>Marital Status</th><td>${studentData?.personalDetails?.maritalStatus
          ? "Married"
          : "Unmarried"
        }</td></tr>
          <tr><th>Nationality</th><td>${studentData?.personalDetails?.nationality || "Not Provided"
        }</td></tr>
          <tr><th>Religion</th><td>${studentData?.personalDetails?.religion || "Not Provided"
        }</td></tr>
          <tr><th>Category</th><td>${studentData?.personalDetails?.category || "Not Provided"
        }</td></tr>
          <tr><th>Caste</th><td>${studentData?.personalDetails?.caste || "Not Provided"
        }</td></tr>
        </table>
      `);

      // Contact Info
      printWindow.document.write("<h3>Contact Information</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Email</th><td>${studentData?.contactInfo?.email || "Not Provided"
        }</td></tr>
          <tr><th>Mobile</th><td>${studentData?.contactInfo?.mobile || "Not Provided"
        }</td></tr>
          <tr><th>WhatsApp</th><td>${studentData?.contactInfo?.whatsapp || "Not Provided"
        }</td></tr>
          <tr><th>Alternate Contact</th><td>${studentData?.contactInfo?.alternateContact || "Not Provided"
        }</td></tr>
          <tr><th>Address</th><td>${studentData?.contactInfo?.address?.houseNo || "Not Provided"
        }, ${studentData?.contactInfo?.address?.streetName || "Not Provided"
        }, ${studentData?.contactInfo?.address?.city || "Not Provided"}, ${studentData?.contactInfo?.address?.state || "Not Provided"
        }, ${studentData?.contactInfo?.address?.country || "Not Provided"
        }</td></tr>
        </table>
      `);

      // Parent Details
      printWindow.document.write("<h3>Parent Details</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Father Name</th><td>${studentData?.parentDetails?.Father?.name || "Not Provided"
        }</td></tr>
          <tr><th>Mother Name</th><td>${studentData?.parentDetails?.Mother?.name || "Not Provided"
        }</td></tr>
          <tr><th>Guardian Name</th><td>${studentData?.parentDetails?.Guardian?.name || "Not Provided"
        }</td></tr>
        </table>
      `);

      // Academic Details
      printWindow.document.write("<h3>Academic Details</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Previous School</th><td>${studentData?.academicDetails?.previous?.schoolName || "Not Provided"
        }</td></tr>
          <tr><th>Class</th><td>${studentData?.academicDetails?.previous?.class || "Not Provided"
        }</td></tr>
          <tr><th>Percentage</th><td>${studentData?.academicDetails?.previous?.percentage || "Not Provided"
        }</td></tr>
        </table>
      `);

      // Enrollment Details
      printWindow.document.write("<h3>Enrollment Details</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Admission Type</th><td>${studentData?.enrollmentDetails?.admissionType || "Not Provided"
        }</td></tr>
          <tr><th>Admission Date</th><td>${studentData?.enrollmentDetails?.admissionDate || "Not Provided"
        }</td></tr>
        </table>
      `);

      // Documents
      printWindow.document.write("<h3>Documents</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Marksheet</th><td>${studentData?.documents?.marksheet || "Not Provided"
        }</td></tr>
          <tr><th>Transfer Certificate</th><td>${studentData?.documents?.transferCertificate || "Not Provided"
        }</td></tr>
        </table>
      `);

      // System Information
      printWindow.document.write("<h3>System Information</h3>");
      printWindow.document.write(`
        <table border="1" cellpadding="10">
          <tr><th>Student ID</th><td>${studentData?.StuID || "Not Provided"
        }</td></tr>
          <tr><th>Profile Completed</th><td>${studentData?.is_profile_complete ? "Yes" : "No"
        }</td></tr>
          <tr><th>Created At</th><td>${studentData?.createdAt || "Not Provided"
        }</td></tr>
          <tr><th>Updated At</th><td>${studentData?.updatedAt || "Not Provided"
        }</td></tr>
        </table>
      `);
    });

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // edit Student Data

  const [editedData, setEditedData] = useState({});
  const handleEdit = (studentId, student) => {
    setEditedData({
      ...editedData,
      [studentId]: {
        ...student,
      },
    });
    Navigate("/editstudents", { state: { studentId, student } });
  };

  // get Data from sessionStorage

  const SECRET_KEY = "brigatech&letskillify";
  const decryptValue = (encryptedValue) => {
    if (!encryptedValue) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8); // Convert decrypted bytes back to string
  };

  const getDecryptedValues = () => {
    const encryptedToken = sessionStorage.getItem("token");
    const encryptedUserId = sessionStorage.getItem("userId");
    const encryptedDesignation = sessionStorage.getItem("designation");
    const encryptedIslogin = sessionStorage.getItem("Islogin");

    const token = decryptValue(encryptedToken);
    const userId = decryptValue(encryptedUserId);
    const designation = decryptValue(encryptedDesignation);
    const Islogin = decryptValue(encryptedIslogin);

    return { token, userId, designation, Islogin };
  };

  // Usage
  const decryptedData = getDecryptedValues();
  const token = decryptedData.token;
  const userId = decryptedData.userId;
  const designation = decryptedData.designation;
  const Islogin = decryptedData.Islogin;

  // Fetch Institute Data
  const fetchInstitute = async () => {
    const data = await getApi(`/api/institute/get/${userId}`);
    setInstitute(data);
    setInstituteId(data?._id);

  };
  const fetchStudent = async () => {
    const data = await getApi(`/api/student/get/${userId}`);
    setStudent(data);
    if (data) {
      setInstituteId(data?.instituteId?._id);
    }
  };
  const fetchTeacher = async () => {
    const data = await getApi(`/api/teacher/get/${userId}`);
    setTeacher(data);
    if (data) {
      setInstituteId(data?.instituteId._id);
    }
  };



  const fetchSemester = async () => {
    const data = await getApi(`/api/semester/get/institute/${instituteId}`);
    setSemester(Array.isArray(data) ? data : []);
  };
  const fetchShift = async () => {
    const data = await getApi(`/api/shift/get/institute/${instituteId}`);
    setShift(Array.isArray(data) ? data : []);
  };
  const fetchMedium = async () => {
    const data = await getApi(`/api/medium/get/institute/${instituteId}`);
    setMedium(Array.isArray(data) ? data : []);
  };
  const fetchSection = async () => {
    const data = await getApi(`/api/Section/get/institute/${instituteId}`);
    setSection(Array.isArray(data) ? data : []);
  };
  const fetchStream = async () => {
    const data = await getApi(`/api/stream/get/institute/${instituteId}`);
    setStream(Array.isArray(data) ? data : []);
  };
  const fetchSubject = async () => {
    const data = await getApi(`/api/subject/get/institute/${instituteId}`);
    setSubject(Array.isArray(data) ? data : []);
  };

  const fetchBoard = async () => {
    const data = await getApi(`/api/board/get/institute/${instituteId}`);
    setBoard(Array.isArray(data) ? data : []);
  };
  const fetchCourse = async () => {
    const data = await getApi(`/api/courses/get/institute/${instituteId}`);
    setCourse(Array.isArray(data) ? data : []);
  };
  const fetchCourseGroup = async () => {
    const data = await getApi(`/api/course-group/get/institute/${instituteId}`);
    setCourseGroup(Array.isArray(data) ? data : []);
  };
  const fetchClass = async () => {
    const data = await getApi(`/api/class/get/institute/${instituteId}`);
    setClass(Array.isArray(data) ? data : []);
  };

  return (
    <MainContext.Provider value={{ fetchClass, Class, fetchCourseGroup, CourseGroup, fetchCourse, Course, Board, fetchBoard, fetchSubject, Subject, fetchStream, Stream, Section, fetchSection, Medium, fetchMedium, fetchShift, Shift, Semester, fetchSemester, Teacher, instituteId, setsidebaropen, sidebaropen, token, userId, designation, Islogin, fetchInstitute, institute, Student, editedData, handleEdit, fetchTrashData, fetchStudentData, StudentTrash, HandleLogOut, studentData, setStudentData, handlePrint, exportToExcel, handleExportCSV }}>
      {children}
    </MainContext.Provider>
  );
};
