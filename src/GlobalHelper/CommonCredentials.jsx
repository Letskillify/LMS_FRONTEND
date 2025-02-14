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
    TeacherData: state.globalTeacherData,
    NonTeachingStaffData: state.globalNonTeachingStaffData,
    InstituteId: state.globalInstituteId,
    SidebarOpen: state.globalSidebarOpen,
    Semester: state.globalSemester,
    Shift: state.globalShift,
    Medium: state.globalMedium,
    Section: state.globalSection,
    Stream: state.globalStream,
    Subject: state.globalSubject,
    Board: state.globalBoard,
    Course: state.globalCourse,
    CourseGroup: state.globalCourseGroup,
    Class: state.globalClass,
    Settings: state.globalSettings,
    EditedData: state.globalEditedData,
    ExamType: state.globalExamType,
  };
};

