import { apiSlice } from "./ApiSlice";

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: () => `/teacher/get-all`,
      providesTags: ["Teacher"],
    }),
    getTeacherById: builder.query({
      query: (teacherId) => `/teacher/get/${teacherId}`,
      providesTags: ["Teacher"],
    }),
    getTeachersByInstituteId: builder.query({
      query: (instituteId) => `/teacher/get/institute/${instituteId}`,
      providesTags: ["Teacher"],
    }),
    addTeacher: builder.mutation({
      query: (teacherData) => ({
        url: `/teacher/post`,
        method: "POST",
        body: teacherData,
      }),
      invalidatesTags: ["Teacher"],
    }),
    updateTeacherById: builder.mutation({
      query: ({ teacherId, teacherData }) => ({
        url: `/teacher/update/${teacherId}`,
        method: "PUT",
        body: teacherData,
      }),
      invalidatesTags: ["Teacher"],
    }),
    updateAllTeachers: builder.mutation({
      query: (teacherData) => ({
        url: `/teacher/update-all`,
        method: "PUT",
        body: teacherData,
      }),
      invalidatesTags: ["Teacher"],
    }),
    addTeacherToTrash: builder.mutation({
      query: (teacherId) => ({
        url: `/teacher/trash/add/${teacherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
    addAllTeachersToTrash: builder.mutation({
      query: () => ({
        url: `/teacher/trash/add-all`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
    getTrashTeachers: builder.query({
      query: () => `/teacher/trash/get-all`,
      providesTags: ["Teacher"],
    }),
    getTrashTeacherById: builder.query({
      query: (teacherId) => `/teacher/trash/get/${teacherId}`,
      providesTags: ["Teacher"],
    }),
    reviveAllTeachers: builder.mutation({
      query: () => ({
        url: `/teacher/revive-all`,
        method: "POST",
      }),
      invalidatesTags: ["Teacher"],
    }),
    reviveTeacherById: builder.mutation({
      query: (teacherId) => ({
        url: `/teacher/revive/${teacherId}`,
        method: "POST",
      }),
      invalidatesTags: ["Teacher"],
    }),
    permanentlyDeleteAllTeachers: builder.mutation({
      query: () => ({
        url: `/teacher/delete-all-permantely`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
    permanentlyDeleteTeacherById: builder.mutation({
      query: (teacherId) => ({
        url: `/teacher/delete-permantely/${teacherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useGetTeacherByIdQuery,
  useGetTeachersByInstituteIdQuery,
  useAddTeacherMutation,
  useUpdateTeacherByIdMutation,
  useUpdateAllTeachersMutation,
  useAddTeacherToTrashMutation,
  useAddAllTeachersToTrashMutation,
  useGetTrashTeachersQuery,
  useGetTrashTeacherByIdQuery,
  useReviveAllTeachersMutation,
  useReviveTeacherByIdMutation,
  usePermanentlyDeleteAllTeachersMutation,
  usePermanentlyDeleteTeacherByIdMutation,
} = teacherApi;
