import { useDispatch } from 'react-redux';
import { useFetchStudentDataQuery, useFetchStudentTrashQuery, useFetchInstituteQuery, useFetchTeacherQuery, useFetchSettingsQuery } from '../Api/ApiSlice';
import { setStudentData, setStudentTrash, setInstitute, setStudent, setTeacher, setSettings } from '../Slices/MainSlice';
import { useEffect } from 'react';

export const useMain = (userId, instituteId) => {
  const dispatch = useDispatch();

  const { data: studentData } = useFetchStudentDataQuery();
  const { data: studentTrash } = useFetchStudentTrashQuery();
  const { data: instituteData } = useFetchInstituteQuery(userId);
  const { data: teacherData } = useFetchTeacherQuery(userId);
  const { data: settingsData } = useFetchSettingsQuery(instituteId);

  useEffect(() => {
    if (studentData) {
      dispatch(setStudentData(studentData));  // Set student data in Redux
    }
  }, [studentData, dispatch]);

  useEffect(() => {
    if (studentTrash) {
      dispatch(setStudentTrash(studentTrash));  // Set student trash in Redux
    }
  }, [studentTrash, dispatch]);

  useEffect(() => {
    if (instituteData) {
      dispatch(setInstitute(instituteData));  // Set institute in Redux
    }
  }, [instituteData, dispatch]);

  useEffect(() => {
    if (teacherData) {
      dispatch(setTeacher(teacherData));  // Set teacher in Redux
    }
  }, [teacherData, dispatch]);

  useEffect(() => {
    if (settingsData) {
      dispatch(setSettings(settingsData));  // Set settings in Redux
    }
  }, [settingsData, dispatch]);

  return {
    studentData,
    studentTrash,
    instituteData,
    teacherData,
    settingsData,
  };
};
