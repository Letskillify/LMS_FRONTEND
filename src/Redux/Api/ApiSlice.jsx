import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "Student",
    "Teacher",
    "Institute",
    "Class",
    "Board",
    "configureStore",
    "Medium",
    "Section",
    "Semester",
    "Session",
    "Stream",
    "Shift",
    "Subject",
    "Course",
    "CourseGroup",
    "Settings",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
