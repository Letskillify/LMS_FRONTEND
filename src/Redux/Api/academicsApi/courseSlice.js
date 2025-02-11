import { apiSlice } from "../ApiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => `/course/get`,
      providesTags: ["Course"],
    }),
    getCoursesByInstituteId: builder.query({
      query: (instituteId) => `/course/get/institute/${instituteId}`,
      providesTags: ["Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => `/course/get/${courseId}`,
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: `/course/post`,
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, courseData }) => ({
        url: `/course/update/${courseId}`,
        method: "PUT",
        body: courseData,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/delete/${courseId}`,
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
