import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getStudentData: builder.query({
      query: () => "/student/get",
    }),
    getTrashData: builder.query({
      query: () => "/student/get-trash",
    }),
    getInstitute: builder.query({
      query: (userId) => `/institute/get/${userId}`,
    }),
    getTeacher: builder.query({
      query: (userId) => `/teacher/get/${userId}`,
    }),
    getStudent: builder.query({
      query: (userId) => `/student/get/${userId}`,
    }),
    getSettings: builder.query({
      query: (instituteId) => `/settings/get/institute/${instituteId}`,
    }),
  }),
});

export const {
  useGetStudentDataQuery,
  useGetTrashDataQuery,
  useGetInstituteQuery,
  useGetTeacherQuery,
  useGetStudentQuery,
  useGetSettingsQuery,
} = apiSlice;
