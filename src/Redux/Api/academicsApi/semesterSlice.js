import { apiSlice } from "../ApiSlice";

export const semesterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => `/semester/get`,
      providesTags: ["Semester"],
    }),
    getSemesterById: builder.query({
      query: (semesterId) => `/semester/get/${semesterId}`,
      providesTags: ["Semester"],
    }),
    getSemesterByInstituteId: builder.query({
      query: (instituteId) => `/semester/get/institute/${instituteId}`,
      providesTags: ["Semester"],
    }),
    createSemester: builder.mutation({
      query: (semesterData) => ({
        url: `/semester/post`,
        method: "POST",
        body: semesterData,
      }),
      invalidatesTags: ["Semester"],
    }),
    updateSemester: builder.mutation({
      query: ({ semesterId, semesterData }) => ({
        url: `/semester/update/${semesterId}`,
        method: "PUT",
        body: semesterData,
      }),
      invalidatesTags: ["Semester"],
    }),
    deleteSemester: builder.mutation({
      query: (semesterId) => ({
        url: `/semester/delete/${semesterId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Semester"],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetSemesterByIdQuery,
  useGetSemesterByInstituteIdQuery,
  useCreateSemesterMutation,
  useUpdateSemesterMutation,
  useDeleteSemesterMutation,
} = semesterApi;
