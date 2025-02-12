import { apiSlice } from "./ApiSlice";

export const deductionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeductions: builder.query({
      query: () => `/salary/deduction/get`,
      providesTags: ["Deduction"],
    }),
    getDeductionById: builder.query({
      query: (deductionId) => `/salary/deduction/get/${deductionId}`,
      providesTags: ["Deduction"],
    }),
    getDeductionsByInstituteId: builder.query({
      query: (instituteId) => `/salary/deduction/get/institute/${instituteId}`,
      providesTags: ["Deduction"],
    }),
    createDeduction: builder.mutation({
      query: (deductionData) => ({
        url: `/salary/deduction/post`,
        method: "POST",
        body: deductionData,
      }),
      invalidatesTags: ["Deduction"],
    }),
    updateDeduction: builder.mutation({
      query: ({ deductionId, deductionData }) => ({
        url: `/salary/deduction/update/${deductionId}`,
        method: "PUT",
        body: deductionData,
      }),
      invalidatesTags: ["Deduction"],
    }),
    deleteDeduction: builder.mutation({
      query: (deductionId) => ({
        url: `/salary/deduction/delete/${deductionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deduction"],
    }),
  }),
});

export const {
  useGetAllDeductionsQuery,
  useGetDeductionByIdQuery,
  useGetDeductionsByInstituteIdQuery,
  useCreateDeductionMutation,
  useUpdateDeductionMutation,
  useDeleteDeductionMutation,
} = deductionApi;
