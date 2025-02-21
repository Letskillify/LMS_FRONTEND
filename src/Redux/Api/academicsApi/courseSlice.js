import { apiSlice } from "../ApiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => `/courses/get`,
      providesTags: ["Course"],
    }),
    getCoursesByInstituteId: builder.query({
      query: (instituteId) => `/courses/get/institute/${instituteId}`,
      providesTags: ["Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => `/courses/get/${courseId}`,
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: `/courses/post`,
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, courseData }) => ({
        url: `/courses/update/${courseId}`,
        method: "PUT",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/delete/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCoursesByInstituteIdQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
