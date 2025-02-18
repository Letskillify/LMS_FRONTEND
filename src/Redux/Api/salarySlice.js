import { apiSlice } from "./ApiSlice";

export const salaryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalaries: builder.query({
      query: () => "/salary/get-all",
      providesTags: ["Salary"],
    }),
    getSalariesByInstituteId: builder.query({
      query: (id) => `/salary/get/institute/${id}`,
      providesTags: ["Salary"],
    }),
    getAllSalariesByType: builder.query({
      query: () => "/salary/getAllSalariesByType",
      providesTags: ["Salary"],
    }),
    getSalaryById: builder.query({
      query: (id) => `/salary/get/${id}`,
      providesTags: ["Salary"],
    }),
    getSalaryByStaffId: builder.query({
      query: (id) => `/salary/get/staff/${id}`,
      providesTags: ["Salary"],
    }),
    getSalarySettingsByInstituteId: builder.query({
      query: ({ instituteId, month, year }) =>
        `/salary/get-salarySettings?instituteId=${instituteId}&month=${month}&year=${year}`,
      providesTags: ["Salary"],
    }),
    generateSalarySettings: builder.mutation({
      query: (salaryData) => ({
        url: `/salary/generate`,
        method: "POST",
        body: salaryData,
      }),
      invalidatesTags: ["Salary"],
    }),
    updateSalarySettings: builder.mutation({
      query: ({instituteId, salaryData, month, year}) => ({
        url: `/salary/updateSalarySettings?instituteId=${instituteId}&month=${month}&year=${year}`,
        method: "POST",
        body: salaryData,
      }),
      invalidatesTags: ["Salary"],
    }),
    createSalary: builder.mutation({
      query: (salaryData) => ({
        url: "/salary/create",
        method: "POST",
        body: salaryData,
      }),
      invalidatesTags: ["Salary"],
    }),
    updateSalaryById: builder.mutation({
      query: ({ id, salaryData }) => ({
        url: `/salary/update/${id}`,
        method: "PUT",
        body: salaryData,
      }),
      invalidatesTags: ["Salary"],
    }),
    updateAllSalaries: builder.mutation({
      query: (salaryData) => ({
        url: "/salary/update-all",
        method: "PUT",
        body: salaryData,
      }),
      invalidatesTags: ["Salary"],
    }),
    deleteSalaryById: builder.mutation({
      query: (id) => ({
        url: `/salary/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Salary"],
    }),
    deleteAllSalaries: builder.mutation({
      query: () => ({
        url: "/salary/delete-all",
        method: "DELETE",
      }),
      invalidatesTags: ["Salary"],
    }),
    generateSalarySlips: builder.mutation({
      query: (id) => ({
        url: `/salary/generate-slips/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Salary"],
    }),
    getSalarySlipById: builder.query({
      query: (id) => `/salary/slip/${id}`,
      providesTags: ["Salary"],
    }),
    settleAllSalaries: builder.mutation({
      query: () => ({
        url: "/salary/settle-all-salaries",
        method: "POST",
      }),
      invalidatesTags: ["Salary"],
    }),
  }),
});

export const {
  useGetAllSalariesQuery,
  useGetSalariesByInstituteIdQuery,
  useGetAllSalariesByTypeQuery,
  useGetSalaryByIdQuery,
  useGetSalaryByStaffIdQuery,
  useGetSalarySettingsByInstituteIdQuery,
  useGenerateSalarySettingsMutation,
  useUpdateSalarySettingsMutation,
  useCreateSalaryMutation,
  useUpdateSalaryByIdMutation,
  useUpdateAllSalariesMutation,
  useDeleteSalaryByIdMutation,
  useDeleteAllSalariesMutation,
  useGenerateSalarySlipsMutation,
  useGetSalarySlipByIdQuery,
  useSettleAllSalariesMutation,
} = salaryApi;
