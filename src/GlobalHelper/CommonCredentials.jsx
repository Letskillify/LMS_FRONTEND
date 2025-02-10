import { useSelector } from "react-redux";

export const useCommonCredentials = () => {
  return useSelector((state) => state?.main);
};

export const getCommonCredentials = () => {
  const state = useCommonCredentials();
  return {
    Designation: state.designation,
    Islogin: state.Islogin,
    Token: state.globalToken,
    userId: state.globalUserId,
    StudentTrash: state.globalStudentTrash,
    StudentData: state.globalStudentData,
    Institute: state.globalInstitute,
    Student: state.globalStudent,
    Teacher: state.globalTeacher,
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
  };
};
