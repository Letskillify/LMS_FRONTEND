import { apiSlice } from "../ApiSlice";

export const classApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClasses: builder.query({
      query: () => `/class/get`,
      providesTags: ["Class"],
    }),
    getClassByInstituteId: builder.query({
      query: (instituteId) => `/class/get/institute/${instituteId}`,
      providesTags: ["Class"],
    }),
    getClassById: builder.query({
      query: (classId) => `/class/get/${classId}`,
      providesTags: ["Class"],
    }),
    createClass: builder.mutation({
      query: (classData) => ({
        url: `/class/post`,
        method: "POST",
        body: classData,
      }),
      invalidatesTags: ["Class"],
    }),
    updateClass: builder.mutation({
      query: ({ classId, classData }) => ({
        url: `/class/update/${classId}`,
        method: "PUT",
        body: classData,
      }),
      invalidatesTags: ["Class"],
    }),
    deleteClass: builder.mutation({
      query: (classId) => ({
        url: `/class/delete/${classId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Class"],
    }),
  }),
});

export const {
  useGetAllClassesQuery,
  useGetClassByInstituteIdQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;
