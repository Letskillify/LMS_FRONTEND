import { apiSlice } from "./ApiSlice";

export const allowanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAllowances: builder.query({
      query: () => `/salary/allowance/get`,
      providesTags: ["Allowance"],
    }),
    getAllowanceById: builder.query({
      query: (allowanceId) => `/salary/allowance/get/${allowanceId}`,
      providesTags: ["Allowance"],
    }),
    getAllowancesByInstituteId: builder.query({
      query: (instituteId) => `/salary/allowance/get/institute/${instituteId}`,
      providesTags: ["Allowance"],
    }),
    createAllowance: builder.mutation({
      query: (allowanceData) => ({
        url: `/salary/allowance/post`,
        method: "POST",
        body: allowanceData,
      }),
      invalidatesTags: ["Allowance"],
    }),
    updateAllowance: builder.mutation({
      query: ({ allowanceId, allowanceData }) => ({
        url: `/salary/allowance/update/${allowanceId}`,
        method: "PUT",
        body: allowanceData,
      }),
      invalidatesTags: ["Allowance"],
    }),
    deleteAllowance: builder.mutation({
      query: (allowanceId) => ({
        url: `/salary/allowance/delete/${allowanceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Allowance"],
    }),
  }),
});

export const {
  useGetAllAllowancesQuery,
  useGetAllowanceByIdQuery,
  useGetAllowancesByInstituteIdQuery,
  useCreateAllowanceMutation,
  useUpdateAllowanceMutation,
  useDeleteAllowanceMutation,
} = allowanceApi;
