import { useSelector } from "react-redux";
import decryptValue from "./decryptValue";

export const useCommonCredentials = () => {
  return useSelector((state) => state?.main);
};

export const getCommonCredentials = () => {
  const state = useCommonCredentials();
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
  // console.log("State", state.globalInstitute);
  const decryptedData = getDecryptedValues();
  return {
    Designation: state.designation || decryptedData.designation,
    Islogin: state.Islogin || decryptedData.Islogin,
    Token: state.globalToken || decryptedData.token,
    userId: state.globalUserId || decryptedData.userId,
    StudentTrash: state.globalStudentTrash,
    StudentData: state.globalStudentData,
    Institute: state.globalInstitute,
    Student: state.globalStudent,
    Teacher: state.globalTeacher,
    TeacherData: state?.globalTeacherData,
    NonTeachingStaffData: state?.globalNonTeachingStaffData?.items,
    InstituteId: state.globalInstituteId,
    SidebarOpen: state.globalSidebarOpen,
    Semester: state?.globalSemester?.items,
    Shift: state?.globalShift?.items,
    Medium: state?.globalMedium?.items,
    Section: state?.globalSection?.items,
    Stream: state?.globalStream?.items,
    Subject: state?.globalSubject?.items,
    Board: state?.globalBoard?.items,
    Course: state?.globalCourse?.items,
    CourseGroup: state?.globalCourseGroup?.items,
    Class: state?.globalClass?.items,
    Settings: state.globalSettings,
    EditedData: state.globalEditedData,
    ExamType: state.globalExamType,
  };
};

