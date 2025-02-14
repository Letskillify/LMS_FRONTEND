import { apiSlice } from "./ApiSlice";

export const liveClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLiveClass: builder.mutation({
      query: (liveClassData) => ({
        url: `/live-class/post`,
        method: "POST",
        body: liveClassData,
      }),
      invalidatesTags: ["LiveClass"],
    }),
    getAllLiveClasses: builder.query({
      query: () => `/live-class/get`,
      providesTags: ["LiveClass"],
    }),
    getLiveClassById: builder.query({
      query: (id) => `/live-class/get/${id}`,
      providesTags: ["LiveClass"],
    }),
    getLiveClassByInstituteId: builder.query({
      query: (instituteId) => `/live-class/get/institute/${instituteId}`,
      providesTags: ["LiveClass"],
    }),
    updateLiveClass: builder.mutation({
      query: ({ id, liveClassData }) => ({
        url: `/live-class/update/${id}`,
        method: "PUT",
        body: liveClassData,
      }),
      invalidatesTags: ["LiveClass"],
    }),
    deleteLiveClass: builder.mutation({
      query: (id) => ({
        url: `/live-class/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LiveClass"],
    }),
  }),
});

export const {
  useCreateLiveClassMutation,
  useGetAllLiveClassesQuery,
  useGetLiveClassByIdQuery,
  useGetLiveClassByInstituteIdQuery,
  useUpdateLiveClassMutation,
  useDeleteLiveClassMutation,
} = liveClassApi;
