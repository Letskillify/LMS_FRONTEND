import { apiSlice } from "./ApiSlice";

export const nonTeachingStaffApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNonTeachingStaff: builder.query({
      query: () => `/staff/get-all`,
      providesTags: ["NonTeachingStaff"],
    }),
    getNonTeachingStaffById: builder.query({
      query: (id) => `/staff/get/${id}`,
      providesTags: ["NonTeachingStaff"],
    }),
    getNonTeachingStaffByInstituteId: builder.query({
      query: (id) => `/staff/get/institute/${id}`,
      providesTags: ["NonTeachingStaff"],
    }),
    addNonTeachingStaff: builder.mutation({
      query: (staffData) => ({
        url: `/staff/post`,
        method: "POST",
        body: staffData,
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    updateStaffById: builder.mutation({
      query: ({ id, staffData }) => ({
        url: `/staff/update/${id}`,
        method: "PUT",
        body: staffData,
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    updateAllStaff: builder.mutation({
      query: (staffData) => ({
        url: `/staff/update-all`,
        method: "PUT",
        body: staffData,
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    addStaffToTrashById: builder.mutation({
      query: (id) => ({
        url: `/staff/trash/add/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    addAllStaffToTrash: builder.mutation({
      query: () => ({
        url: `/staff/trash/add-all`,
        method: "DELETE",
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    getTrashStaffDetails: builder.query({
      query: () => `/staff/trash/get-all`,
      providesTags: ["NonTeachingStaff"],
    }),
    getTrashStaffById: builder.query({
      query: (id) => `/staff/trash/get/${id}`,
      providesTags: ["NonTeachingStaff"],
    }),
    reviveStaffById: builder.mutation({
      query: (id) => ({
        url: `/staff/revive/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    reviveAllStaff: builder.mutation({
      query: () => ({
        url: `/staff/revive-all`,
        method: "POST",
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    deleteAllStaffPermanently: builder.mutation({
      query: () => ({
        url: `/staff/delete-all-permantely`,
        method: "DELETE",
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
    deleteStaffPermanentlyById: builder.mutation({
      query: (id) => ({
        url: `/staff/delete-permantely/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NonTeachingStaff"],
    }),
  }),
});

export const {
  useGetAllNonTeachingStaffQuery,
  useGetNonTeachingStaffByIdQuery,
  useGetNonTeachingStaffByInstituteIdQuery,
  useAddNonTeachingStaffMutation,
  useUpdateStaffByIdMutation,
  useUpdateAllStaffMutation,
  useAddStaffToTrashByIdMutation,
  useAddAllStaffToTrashMutation,
  useGetTrashStaffDetailsQuery,
  useGetTrashStaffByIdQuery,
  useReviveStaffByIdMutation,
  useReviveAllStaffMutation,
  useDeleteAllStaffPermanentlyMutation,
  useDeleteStaffPermanentlyByIdMutation,
} = nonTeachingStaffApi;
