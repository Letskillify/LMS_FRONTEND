import { apiSlice } from "./ApiSlice";

export const examTypeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createExamType: builder.mutation({
      query: (examTypeData) => ({
        url: `/exam-type/post`,
        method: "POST",
        body: examTypeData,
      }),
      invalidatesTags: ["ExamType"],
    }),
    getAllExamTypes: builder.query({
      query: () => `/exam-type/get`,
      providesTags: ["ExamType"],
    }),
    getExamTypeById: builder.query({
      query: (id) => `/exam-type/get/${id}`,
      providesTags: ["ExamType"],
    }),
    getExamTypeByInstituteId: builder.query({
      query: (instituteId) => `/exam-type/get/institute/${instituteId}`,
      providesTags: ["ExamType"],
    }),
    updateExamType: builder.mutation({
      query: ({ id, examTypeData }) => ({
        url: `/exam-type/update/${id}`,
        method: "PUT",
        body: examTypeData,
      }),
      invalidatesTags: ["ExamType"],
    }),
    deleteExamType: builder.mutation({
      query: (id) => ({
        url: `/exam-type/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExamType"],
    }),
  }),
});

export const {
  useCreateExamTypeMutation,
  useGetAllExamTypesQuery,
  useGetExamTypeByIdQuery,
  useGetExamTypeByInstituteIdQuery,
  useUpdateExamTypeMutation,
  useDeleteExamTypeMutation,
} = examTypeApi;
