import { apiSlice } from "./ApiSlice";

export const studentSubmissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmissions: builder.query({
      query: () => `/homework/submit/get`,
      providesTags: ["StudentSubmission"],
    }),
    getSubmissionById: builder.query({
      query: (id) => `/homework/submit/get/${id}`,
      providesTags: ["StudentSubmission"],
    }),
    getSubmissionsByInstituteId: builder.query({
      query: (instituteId) =>
        `/homework/submit/get/institute/${instituteId}`,
      providesTags: ["StudentSubmission"],
    }),
    addSubmission: builder.mutation({
      query: (submissionData) => ({
        url: `/homework/submit/post`,
        method: "POST",
        body: submissionData,
      }),
      invalidatesTags: ["StudentSubmission"],
    }),
    updateSubmission: builder.mutation({
      query: ({ id, submissionData }) => ({
        url: `/homework/submit/update/${id}`,
        method: "PUT",
        body: submissionData,
      }),
      invalidatesTags: ["StudentSubmission"],
    }),
    deleteSubmission: builder.mutation({
      query: (id) => ({
        url: `/homework/submit/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudentSubmission"],
    }),
  }),
});

export const {
  useGetAllSubmissionsQuery,
  useGetSubmissionByIdQuery,
  useGetSubmissionsByInstituteIdQuery,
  useAddSubmissionMutation,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} = studentSubmissionApi;
