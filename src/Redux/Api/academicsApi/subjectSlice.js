import { apiSlice } from "../ApiSlice";

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: () => `/subject/get`,
      providesTags: ["Subject"],
    }),
    getSubjectById: builder.query({
      query: (subjectId) => `/subject/get/${subjectId}`,
      providesTags: ["Subject"],
    }),
    getSubjectsByInstituteId: builder.query({
      query: (instituteId) => `/subject/get/institute/${instituteId}`,
      providesTags: ["Subject"],
    }),
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: `/subject/post`,
        method: "POST",
        body: subjectData,
      }),
      invalidatesTags: ["Subject"],
      headers: {
        "Content-Type": "application/json",
      },
    }),
    updateSubject: builder.mutation({
      query: ({ subjectId, subjectData }) => ({
        url: `/subject/update/${subjectId}`,
        method: "PUT",
        body: subjectData,
      }),
      invalidatesTags: ["Subject"],
    }),
    deleteSubject: builder.mutation({
      query: (subjectId) => ({
        url: `/subject/delete/${subjectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subject"],
    }),
  }),
});

export const {
  useGetAllSubjectsQuery,
  useGetSubjectByIdQuery,
  useGetSubjectsByInstituteIdQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;

