import { apiSlice } from "./ApiSlice";

export const examApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExams: builder.query({
      query: () => `/exam/get`,
      providesTags: ["Exam"],
    }),
    getExamById: builder.query({
      query: (id) => `/exam/get/${id}`,
      providesTags: ["Exam"],
    }),
    getExamByInstituteId: builder.query({
      query: (instituteId) => `/exam/get/institute/${instituteId}`,
      providesTags: ["Exam"],
    }),
    addNewExam: builder.mutation({
      query: (examData) => ({
        url: `/exam/post`,
        method: "POST",
        body: examData,
      }),
      invalidatesTags: ["Exam"],
    }),
    updateExamById: builder.mutation({
      query: ({ id, examData }) => ({
        url: `/exam/update/${id}`,
        method: "PUT",
        body: examData,
      }),
      invalidatesTags: ["Exam"],
    }),
    deleteExam: builder.mutation({
      query: (id) => ({
        url: `/exam/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exam"],
    }),
  }),
});

export const { 
  useGetAllExamsQuery, 
  useGetExamByIdQuery, 
  useGetExamByInstituteIdQuery, 
  useAddNewExamMutation, 
  useUpdateExamByIdMutation, 
  useDeleteExamMutation 
} = examApi;
