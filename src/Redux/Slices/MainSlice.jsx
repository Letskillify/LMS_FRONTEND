import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  designation: null,
  Islogin: false,
  globalToken: null,
  globalUserId: null,
  globalStudentTrash: [],
  globalStudentData: [],
  globalInstitute: null,
  globalStudent: null,
  globalTeacher: null,
  globalInstituteId: null,
  globalSidebarOpen: false,
  globalSemester: null,
  globalShift: null,
  globalMedium: null,
  globalSection: null,
  globalStream: null,
  globalSubject: null,
  globalBoard: null,
  globalCourse: null,
  globalCourseGroup: null,
  globalClass: null,
  globalSettings: null,
  globalEditedData: {},
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDesignation: (state, action) => {
      state.designation = action.payload;
    },
    setIslogin: (state, action) => {
      state.Islogin = action.payload;
    },
    setGlobalToken: (state, action) => {
      state.globalToken = action.payload;
    },
    setGlobalUserId: (state, action) => {
      state.globalUserId = action.payload;
    },
    setGlobalInstituteId: (state, action) => {
      state.globalInstituteId = action.payload;
    },
    setGlobalStudentTrash: (state, action) => {
      state.globalStudentTrash = action.payload;
    },
    setGlobalStudentData: (state, action) => {
      state.globalStudentData = action.payload;
    },
    setGlobalInstitute: (state, action) => {
      state.globalInstitute = action.payload;
      state.globalInstituteId = action.payload?._id || null;
    },
    setGlobalStudent: (state, action) => {
      state.globalStudent = action.payload;
      state.globalInstituteId = action.payload?.instituteId?._id || null;
    },
    setGlobalTeacher: (state, action) => {
      state.globalTeacher = action.payload;
      state.globalInstituteId = action.payload?.instituteId?._id || null;
    },
    setGlobalSidebarOpen: (state, action) => {
      state.globalSidebarOpen = action.payload;
    },
    setGlobalEditedData: (state, action) => {
      state.globalEditedData = action.payload;
    },
    setGlobalSemester: (state, action) => {
      state.globalSemester = action.payload;
    },
    setGlobalShift: (state, action) => {
      state.globalShift = action.payload;
    },
    setGlobalMedium: (state, action) => {
      state.globalMedium = action.payload;
    },
    setGlobalSection: (state, action) => {
      state.globalSection = action.payload;
    },
    setGlobalStream: (state, action) => {
      state.globalStream = action.payload;
    },
    setGlobalSubject: (state, action) => {
      state.globalSubject = action.payload;
    },
    setGlobalBoard: (state, action) => {
      state.globalBoard = action.payload;
    },
    setGlobalCourse: (state, action) => {
      state.globalCourse = action.payload;
    },
    setGlobalCourseGroup: (state, action) => {
      state.globalCourseGroup = action.payload;
    },
    setGlobalClass: (state, action) => {
      state.globalClass = action.payload;
    },
    setGlobalSettings: (state, action) => {
      state.globalSettings = action.payload;
    },
  },
});

export const {
  setGlobalToken,
  setIslogin,
  setDesignation,
  setGlobalUserId,
  setGlobalInstituteId,
  setGlobalStudentTrash,
  setGlobalStudentData,
  setGlobalInstitute,
  setGlobalStudent,
  setGlobalTeacher,
  setGlobalSidebarOpen,
  setGlobalEditedData,
  setGlobalSemester,
  setGlobalShift,
  setGlobalMedium,
  setGlobalSection,
  setGlobalStream,
  setGlobalSubject,
  setGlobalBoard,
  setGlobalCourse,
  setGlobalCourseGroup,
  setGlobalClass,
  setGlobalSettings,
} = mainSlice.actions;
export default mainSlice.reducer;
