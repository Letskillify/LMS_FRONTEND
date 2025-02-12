import { apiSlice } from "./ApiSlice";

export const leaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyLeave: builder.mutation({
      query: (leaveData) => ({
        url: `/leaves/post`,
        method: "POST",
        body: leaveData,
      }),
      invalidatesTags: ["Leaves"],
    }),
    getAllLeaves: builder.query({
      query: () => `/leaves/get`,
      providesTags: ["Leaves"],
    }),
    getLeavesByInstituteId: builder.query({
      query: (instituteId) => `/leaves/get/institute/${instituteId}`,
      providesTags: ["Leaves"],
    }),
    getLeavesByUserId: builder.query({
      query: (userId) => `/leaves/get/user/${userId}`,
      providesTags: ["Leaves"],
    }),
    getLeaveById: builder.query({
      query: (leaveId) => `/leaves/get/${leaveId}`,
      providesTags: ["Leaves"],
    }),
    updateLeave: builder.mutation({
      query: ({ leaveId, leaveData }) => ({
        url: `/leaves/update/${leaveId}`,
        method: "PUT",
        body: leaveData,
      }),
      invalidatesTags: ["Leaves"],
    }),
    deleteLeave: builder.mutation({
      query: (leaveId) => ({
        url: `/leaves/delete/${leaveId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leaves"],
    }),
    updateLeaveStatus: builder.mutation({
      query: ({ leaveId, statusData }) => ({
        url: `/leaves/patch/status/${leaveId}`,
        method: "PATCH",
        body: statusData,
      }),
      invalidatesTags: ["Leaves"],
    }),
  }),
});

export const {
  useApplyLeaveMutation,
  useGetAllLeavesQuery,
  useGetLeavesByInstituteIdQuery,
  useGetLeavesByUserIdQuery,
  useGetLeaveByIdQuery,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
  useUpdateLeaveStatusMutation,
} = leaveApi;
