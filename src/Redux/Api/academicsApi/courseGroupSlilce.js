import { apiSlice } from "../ApiSlice";

export const courseGroupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseGroups: builder.query({
      query: () => `/course-group/get`,
      providesTags: ["CourseGroup"],
    }),
    getCourseGroupById: builder.query({
      query: (courseGroupId) => `/course-group/get/${courseGroupId}`,
      providesTags: ["CourseGroup"],
    }),
    getCourseGroupByInstituteId: builder.query({
      query: (instituteId) => `/course-group/get/institute/${instituteId}`,
      providesTags: ["CourseGroup"],
    }),
    createCourseGroup: builder.mutation({
      query: (courseGroupData) => ({
        url: `/course-group/post`,
        method: "POST",
        body: courseGroupData,
      }),
      invalidatesTags: ["CourseGroup"],
    }),
    updateCourseGroup: builder.mutation({
      query: ({ courseGroupId, courseGroupData }) => ({
        url: `/course-group/update/${courseGroupId}`,
        method: "PUT",
        body: courseGroupData,
      }),
      invalidatesTags: ["CourseGroup"],
    }),
    deleteCourseGroup: builder.mutation({
      query: (courseGroupId) => ({
        url: `/course-group/delete/${courseGroupId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CourseGroup"],
    }),
  }),
});

export const {
  useGetAllCourseGroupsQuery,
  useGetCourseGroupByIdQuery,
  useGetCourseGroupByInstituteIdQuery,
  useCreateCourseGroupMutation,
  useUpdateCourseGroupMutation,
  useDeleteCourseGroupMutation,
} = courseGroupApi;
