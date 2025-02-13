import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setGlobalInstituteId,
  setGlobalStudentData,
  setGlobalTeacher,
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
  setGlobalTeacherData,
} from "../Redux/Slices/MainSlice";

import { useGetInstituteByIdQuery } from "../Redux/Api/instituteSlice";
import { useGetStudentsByInstituteIdQuery } from "../Redux/Api/studentSlice";
import { useGetTeachersByInstituteIdQuery } from "../Redux/Api/teacherSlice";
import { useGetSemesterByInstituteIdQuery } from "../Redux/Api/academicsApi/semesterSlice";
import { useGetShiftByInstituteIdQuery } from "../Redux/Api/academicsApi/shiftSlice";
import { useGetMediumByInstituteIdQuery } from "../Redux/Api/academicsApi/mediumSlice";
import { useGetSectionByInstituteIdQuery } from "../Redux/Api/academicsApi/sectionSlice";
import { useGetStreamsByInstituteIdQuery } from "../Redux/Api/academicsApi/streamSlice";
import { useGetSubjectsByInstituteIdQuery } from "../Redux/Api/academicsApi/subjectSlice";
import { useGetBoardsByInstituteIdQuery } from "../Redux/Api/academicsApi/boardSlice";
import { useGetCourseGroupByInstituteIdQuery } from "../Redux/Api/academicsApi/courseGroupSlilce";
import { useGetClassByInstituteIdQuery } from "../Redux/Api/academicsApi/classSlice";
import { useGetSettingsByInstituteIdQuery } from "../Redux/Api/settingsSlice";

export const useFetchInstituteData = (userId, isLogin, token, designation) => {
  const dispatch = useDispatch();

  // Fetch institute details
  const { data: instituteData } = useGetInstituteByIdQuery(userId, {
    skip: !userId || !isLogin || !token || designation !== "Institute",
  });

  const instituteId = instituteData?._id;

  dispatch(setGlobalInstituteId(instituteId));
  useEffect(() => {
    console.log("instituteId:", instituteId); 
    if (instituteId) {
    }
  }, [instituteId, dispatch]);

  // Fetch all other data related to the institute
  const studentQuery = useGetStudentsByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const teacherQuery = useGetTeachersByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const semesterQuery = useGetSemesterByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const shiftQuery = useGetShiftByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const mediumQuery = useGetMediumByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const sectionQuery = useGetSectionByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const streamQuery = useGetStreamsByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const subjectQuery = useGetSubjectsByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const boardQuery = useGetBoardsByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const courseQuery = useGetCourseGroupByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const classQuery = useGetClassByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });
  const settingsQuery = useGetSettingsByInstituteIdQuery(instituteId, {
    skip: !instituteId,
  });


  // Separate useEffect for student data
  useEffect(() => {
    if (studentQuery.data) {
      dispatch(setGlobalStudentData(studentQuery.data));
    }
  }, [dispatch, studentQuery.data]); // ✅ Only runs when student data changes

  // Separate useEffect for teacher data
  useEffect(() => {
    if (teacherQuery.data) {
      dispatch(setGlobalTeacherData(teacherQuery.data));
    }
  }, [dispatch, teacherQuery.data]);

  useEffect(() => {
    if (semesterQuery.data) {
      dispatch(setGlobalSemester(semesterQuery.data));
    }
  }, [dispatch, semesterQuery.data]);

  useEffect(() => {
    if (shiftQuery.data) {
      dispatch(setGlobalShift(shiftQuery.data));
    }
  }, [dispatch, shiftQuery.data]);

  useEffect(() => {
    if (mediumQuery.data) {
      dispatch(setGlobalMedium(mediumQuery.data));
    }
  }, [dispatch, mediumQuery.data]);

  useEffect(() => {
    if (sectionQuery.data) {
      dispatch(setGlobalSection(sectionQuery.data));
    }
  }, [dispatch, sectionQuery.data]);

  useEffect(() => {
    if (streamQuery.data) {
      dispatch(setGlobalStream(streamQuery.data));
    }
  }, [dispatch, streamQuery.data]);

  useEffect(() => {
    if (subjectQuery.data) {
      dispatch(setGlobalSubject(subjectQuery.data));
    }
  }, [dispatch, subjectQuery.data]);

  useEffect(() => {
    if (boardQuery.data) {
      dispatch(setGlobalBoard(boardQuery.data));
    }
  }, [dispatch, boardQuery.data]);

  useEffect(() => {
    if (courseQuery.data) {
      dispatch(setGlobalCourse(courseQuery.data));
    }
  }, [dispatch, courseQuery.data]);

  useEffect(() => {
    if (classQuery.data) {
      dispatch(setGlobalClass(classQuery.data));
    }
  }, [dispatch, classQuery.data]);

  useEffect(() => {
    if (settingsQuery.data) {
      dispatch(setGlobalSettings(settingsQuery.data));
    }
  }, [dispatch, settingsQuery.data]);

  return { instituteId };
};
