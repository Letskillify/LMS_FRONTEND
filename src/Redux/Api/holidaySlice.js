import { apiSlice } from "./ApiSlice";

export const instituteHolidayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInstituteHoliday: builder.mutation({
      query: (holidayData) => ({
        url: `/institute-holiday/post`,
        method: "POST",
        body: holidayData,
      }),
      invalidatesTags: ["InstituteHoliday"],
    }),
    getAllInstituteHolidays: builder.query({
      query: () => `/institute-holiday/get`,
      providesTags: ["InstituteHoliday"],
    }),
    getInstituteHolidaysByMonth: builder.query({
      query: ({ instituteId, year, month }) =>
        `/institute-holiday/get/${instituteId}/${year}/${month}`,
      providesTags: ["InstituteHoliday"],
    }),
    getInstituteHolidayById: builder.query({
      query: (id) => `/institute-holiday/get/${id}`,
      providesTags: ["InstituteHoliday"],
    }),
    getHolidaysByInstituteId: builder.query({
      query: (id) => `/institute-holiday/get/institute/${id}`,
      providesTags: ["InstituteHoliday"],
    }),
    updateInstituteHoliday: builder.mutation({
      query: ({ id, holidayData }) => ({
        url: `/institute-holiday/update/${id}`,
        method: "PUT",
        body: holidayData,
      }),
      invalidatesTags: ["InstituteHoliday"],
    }),
    deleteInstituteHoliday: builder.mutation({
      query: (id) => ({
        url: `/institute-holiday/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InstituteHoliday"],
    }),
  }),
});

export const {
  useCreateInstituteHolidayMutation,
  useGetAllInstituteHolidaysQuery,
  useGetInstituteHolidaysByMonthQuery,
  useGetInstituteHolidayByIdQuery,
  useGetHolidaysByInstituteIdQuery,
  useUpdateInstituteHolidayMutation,
  useDeleteInstituteHolidayMutation,
} = instituteHolidayApi;
