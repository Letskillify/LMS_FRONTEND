import { apiSlice } from "./ApiSlice";

export const academicsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSemester: builder.query({
      query: (instituteId) => `/semester/get/institute/${instituteId}`,
      providesTags: ["Academics"],
    }),
  }),
});

export const { useGetSemesterQuery } = academicsApi;
