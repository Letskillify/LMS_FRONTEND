import { apiSlice } from "../ApiSlice";

export const shiftApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShifts: builder.query({
      query: () => `/shift/get`,
      providesTags: ["Shift"],
    }),
    getShiftById: builder.query({
      query: (shiftId) => `/shift/get/${shiftId}`,
      providesTags: ["Shift"],
    }),
    getShiftByInstituteId: builder.query({
      query: (instituteId) => `/shift/get/institute/${instituteId}`,
      providesTags: ["Shift"],
    }),
    createShift: builder.mutation({
      query: (shiftData) => ({
        url: `/shift/post`,
        method: "POST",
        body: shiftData,
      }),
      invalidatesTags: ["Shift"],
    }),
    updateShift: builder.mutation({
      query: ({ shiftId, shiftData }) => ({
        url: `/shift/update/${shiftId}`,
        method: "PUT",
        body: shiftData,
      }),
      invalidatesTags: ["Shift"],
    }),
    deleteShift: builder.mutation({
      query: (shiftId) => ({
        url: `/shift/delete/${shiftId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shift"],
    }),
  }),
});

export const {
  useGetAllShiftsQuery,
  useGetShiftByIdQuery,
  useGetShiftByInstituteIdQuery,
  useCreateShiftMutation,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
} = shiftApi;
