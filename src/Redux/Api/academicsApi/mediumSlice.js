import { apiSlice } from "../ApiSlice";

export const mediumApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMediums: builder.query({
      query: () => `/medium/get`,
      providesTags: ["Medium"],
    }),
    getMediumById: builder.query({
      query: (mediumId) => `/medium/get/${mediumId}`,
      providesTags: ["Medium"],
    }),
    getMediumByInstituteId: builder.query({
      query: (instituteId) => `/medium/get/institute/${instituteId}`,
      providesTags: ["Medium"],
    }),
    createMedium: builder.mutation({
      query: (mediumData) => ({
        url: `/medium/post`,
        method: "POST",
        body: mediumData,
      }),
      invalidatesTags: ["Medium"],
    }),
    updateMedium: builder.mutation({
      query: ({ mediumId, mediumData }) => ({
        url: `/medium/update/${mediumId}`,
        method: "PUT",
        body: mediumData,
      }),
      invalidatesTags: ["Medium"],
    }),
    deleteMedium: builder.mutation({
      query: (mediumId) => ({
        url: `/medium/delete/${mediumId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medium"],
    }),
  }),
});

export const {
  useGetAllMediumsQuery,
  useGetMediumByIdQuery,
  useGetMediumByInstituteIdQuery,
  useCreateMediumMutation,
  useUpdateMediumMutation,
  useDeleteMediumMutation,
} = mediumApi;
