import { apiSlice } from "./ApiSlice";

export const assignedHomeworkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHomework: builder.query({
      query: () => `/homework/assigned/get`,
      providesTags: ["AssignedHomework"],
    }),
    getHomeworkById: builder.query({
      query: (id) => `/homework/assigned/get/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    getHomeworkByInstitute: builder.query({
      query: (id) => `/homework/assigned/get/institute/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    getHomeworkByClass: builder.query({
      query: (id) => `/homework/assigned/get/class/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    getHomeworkByCourse: builder.query({
      query: (id) => `/homework/assigned/get/course/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    getHomeworkBySubject: builder.query({
      query: (id) => `/homework/assigned/get/subject/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    getHomeworkByTeacher: builder.query({
      query: (id) => `/homework/assigned/get/teacher/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    createHomework: builder.mutation({
      query: (newHomework) => ({
        url: `/homework/assigned/post`,
        method: "POST",
        body: newHomework,
      }),
      invalidatesTags: ["AssignedHomework"],
    }),
    updateHomework: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/homework/assigned/update/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["AssignedHomework"],
    }),
    softDeleteHomework: builder.mutation({
      query: (id) => ({
        url: `/homework/assigned/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["AssignedHomework"],
    }),
    restoreHomework: builder.mutation({
      query: (id) => ({
        url: `/homework/assigned/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["AssignedHomework"],
    }),
    deleteHomework: builder.mutation({
      query: (id) => ({
        url: `/homework/assigned/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AssignedHomework"],
    }),
    getTrashedHomework: builder.query({
      query: () => `/homework/assigned/get-trash`,
      providesTags: ["AssignedHomework"],
    }),
    getTrashedHomeworkByInstitute: builder.query({
      query: (id) => `/homework/assigned/get-trash/institute/${id}`,
      providesTags: ["AssignedHomework"],
    }),
    getTrashedHomeworkByTeacher: builder.query({
      query: (id) => `/homework/assigned/get-trash/teacher/${id}`,
      providesTags: ["AssignedHomework"],
    }),
  }),
});

export const {
  useGetAllHomeworkQuery,
  useGetHomeworkByIdQuery,
  useGetHomeworkByInstituteQuery,
  useGetHomeworkByClassQuery,
  useGetHomeworkByCourseQuery,
  useGetHomeworkBySubjectQuery,
  useGetHomeworkByTeacherQuery,
  useCreateHomeworkMutation,
  useUpdateHomeworkMutation,
  useSoftDeleteHomeworkMutation,
  useRestoreHomeworkMutation,
  useDeleteHomeworkMutation,
  useGetTrashedHomeworkQuery,
  useGetTrashedHomeworkByInstituteQuery,
  useGetTrashedHomeworkByTeacherQuery,
} = assignedHomeworkApi;
