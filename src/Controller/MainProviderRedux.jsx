import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import * as XLSX from "xlsx";
import CryptoJS from "crypto-js";
import axios from "axios";
import { getApi } from "../Custom Hooks/CustomeHook";

const SECRET_KEY = "brigatech&letskillify";

const decryptValue = (encryptedValue) => {
  if (!encryptedValue) return null;
  const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getDecryptedValues = () => {
  return {
    token: decryptValue(sessionStorage.getItem("token")),
    userId: decryptValue(sessionStorage.getItem("userId")),
    designation: decryptValue(sessionStorage.getItem("designation")),
    Islogin: decryptValue(sessionStorage.getItem("Islogin")),
  };
};

const ReduxMainProvider = ({ children }) => {
  const [studentData, setStudentData] = useState([]);
  const [instituteId, setInstituteId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { token, userId, designation, Islogin } = getDecryptedValues();

  useEffect(() => {
    if (userId) fetchInstitute();
  }, [userId]);

  useEffect(() => {
    if (instituteId) fetchAllInstituteData();
  }, [instituteId]);

  const fetchInstitute = async () => {
    const data = await getApi(`/api/institute/get/${userId}`);
    setInstituteId(data?._id);
  };

  const fetchAllInstituteData = async () => {
    const endpoints = [
      `/api/student/get`,
      `/api/student/get-trash`,
      `/api/semester/get/institute/${instituteId}`,
      `/api/shift/get/institute/${instituteId}`,
      `/api/medium/get/institute/${instituteId}`,
      `/api/Section/get/institute/${instituteId}`,
      `/api/stream/get/institute/${instituteId}`,
      `/api/subject/get/institute/${instituteId}`,
      `/api/board/get/institute/${instituteId}`,
      `/api/courses/get/institute/${instituteId}`,
      `/api/course-group/get/institute/${instituteId}`,
      `/api/class/get/institute/${instituteId}`,
      `/api/settings/get/institute/${instituteId}`,
    ];

    const responses = await Promise.all(endpoints.map((url) => getApi(url)));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(studentData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "student_data.csv");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(studentData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "student_data.xlsx");
  };

  return <>{children}</>;
};

export default ReduxMainProvider;
