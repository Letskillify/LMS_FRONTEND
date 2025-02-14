import { apiSlice } from "./ApiSlice";

export const holidayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDefaultHolidays: builder.query({
      query: () => `/holiday-list/get`,
      providesTags: ["Holiday"],
    }),
    getDefaultHolidayById: builder.query({
      query: (id) => `/holiday-list/get/${id}`,
      providesTags: ["Holiday"],
    }),
    createDefaultHoliday: builder.mutation({
      query: (holidayData) => ({
        url: `/holiday-list/post`,
        method: "POST",
        body: holidayData,
      }),
      invalidatesTags: ["Holiday"],
    }),
    createBulkDefaultHolidays: builder.mutation({
      query: (holidays) => ({
        url: `/holiday-list/bulk-post`,
        method: "POST",
        body: holidays,
      }),
      invalidatesTags: ["Holiday"],
    }),
    updateDefaultHoliday: builder.mutation({
      query: ({ id, holidayData }) => ({
        url: `/holiday-list/update/${id}`,
        method: "PUT",
        body: holidayData,
      }),
      invalidatesTags: ["Holiday"],
    }),
    softDeleteDefaultHoliday: builder.mutation({
      query: (id) => ({
        url: `/holiday-list/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Holiday"],
    }),
    restoreDefaultHoliday: builder.mutation({
      query: (id) => ({
        url: `/holiday-list/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Holiday"],
    }),
    deleteDefaultHoliday: builder.mutation({
      query: (id) => ({
        url: `/holiday-list/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Holiday"],
    }),
    getTrashedDefaultHolidays: builder.query({
      query: () => `/holiday-list/get-trash`,
      providesTags: ["Holiday"],
    }),
  }),
});

export const {
  useGetAllDefaultHolidaysQuery,
  useGetDefaultHolidayByIdQuery,
  useCreateDefaultHolidayMutation,
  useCreateBulkDefaultHolidaysMutation,
  useUpdateDefaultHolidayMutation,
  useSoftDeleteDefaultHolidayMutation,
  useRestoreDefaultHolidayMutation,
  useDeleteDefaultHolidayMutation,
  useGetTrashedDefaultHolidaysQuery,
} = holidayApi;


