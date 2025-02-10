import { apiSlice } from "./ApiSlice";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getStudents: builder.query({
    //   query: () => `/student/get`,
    //   providesTags: ["Student"],
    // }),
    // getPermanentlyDeletedStudents: builder.query({
    //   query: () => `/student/get-permanently-deleted`,
    //   providesTags: ["Student"],
    // }),
    getStudentsByInstituteId: builder.query({
      query: (instituteId) => `/student/get/institute/${instituteId}`,
      providesTags: ["Student"],
    }),
    getStudentByInstituteAndStudentID: builder.query({
      query: ({ instituteId, studentId }) =>
        `/student/get/institute-student/${instituteId}/${studentId}`,
      providesTags: ["Student"],
    }),
    getStudentByCourseAndSection: builder.query({
      query: ({ courseId, sectionId }) =>
        `/student/get/student-by-course-and-section?courseId=${courseId}&sectionId=${sectionId}`,
      providesTags: ["Student"],
    }),
    getStudentById: builder.query({
      query: (studentId) => `/student/get/${studentId}`,
      providesTags: ["Student"],
    }),
    generateIdCard: builder.query({
      query: (studentId) => `/student/generate-id-card/${studentId}`,
      providesTags: ["Student"],
    }),
    addStudentsFromCSV: builder.mutation({
      query: (file) => ({
        url: `/student/post-bulk`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Student"],
    }),
    addStudent: builder.mutation({
      query: (studentData) => ({
        url: `/student/post`,
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudentById: builder.mutation({
      query: ({ studentId, studentData }) => ({
        url: `/student/update/${studentId}`,
        method: "PUT",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),
    updateAllStudents: builder.mutation({
      query: (studentData) => ({
        url: `/student/update-all`,
        method: "PUT",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),
    getTrashStudents: builder.query({
      query: () => `/student/get-trash`,
      providesTags: ["Student"],
    }),
    getTrashStudentById: builder.query({
      query: (studentId) => `/student/get-trash/${studentId}`,
      providesTags: ["Student"],
    }),
    addStudentToTrash: builder.mutation({
      query: (studentId) => ({
        url: `/student/add-trash/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    addAllStudentsToTrash: builder.mutation({
      query: () => ({
        url: `/student/add-all-trash`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    reviveStudentById: builder.mutation({
      query: (studentId) => ({
        url: `/student/revive/${studentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Student"],
    }),
    reviveAllStudents: builder.mutation({
      query: () => ({
        url: `/student/revive-all`,
        method: "POST",
      }),
      invalidatesTags: ["Student"],
    }),
    permanentlyDeleteStudentById: builder.mutation({
      query: (studentId) => ({
        url: `/student/permanent-delete/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    permanentlyDeleteAllStudents: builder.mutation({
      query: () => ({
        url: `/student/permanent-delete-all`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    getBookIssuedDetailsByStudentId: builder.query({
      query: (studentId) => `/student/${studentId}/books-issued`,
      providesTags: ["Student"],
    }),
  }),
});

export const {
//   useGetStudentsQuery,
//   useGetPermanentlyDeletedStudentsQuery,
  useGetStudentsByInstituteIdQuery,
  useGetStudentByInstituteAndStudentIDQuery,
  useGetStudentByCourseAndSectionQuery,
  useGetStudentByIdQuery,
  useGenerateIdCardQuery,
  useAddStudentsFromCSVMutation,
  useAddStudentMutation,
  useUpdateStudentByIdMutation,
  useUpdateAllStudentsMutation,
  useGetTrashStudentsQuery,
  useGetTrashStudentByIdQuery,
  useAddStudentToTrashMutation,
  useAddAllStudentsToTrashMutation,
  useReviveStudentByIdMutation,
  useReviveAllStudentsMutation,
  usePermanentlyDeleteStudentByIdMutation,
  usePermanentlyDeleteAllStudentsMutation,
  useGetBookIssuedDetailsByStudentIdQuery,
} = studentApi;
