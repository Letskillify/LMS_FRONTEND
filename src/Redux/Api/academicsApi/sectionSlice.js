import { apiSlice } from "../ApiSlice";

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSections: builder.query({
      query: () => `/section/get`,
      providesTags: ["Section"],
    }),
    getSectionById: builder.query({
      query: (sectionId) => `/section/get/${sectionId}`,
      providesTags: ["Section"],
    }),
    getSectionByInstituteId: builder.query({
      query: (instituteId) => `/section/get/institute/${instituteId}`,
      providesTags: ["Section"],
    }),
    createSection: builder.mutation({
      query: (sectionData) => ({
        url: `/section/post`,
        method: "POST",
        body: sectionData,
      }),
      invalidatesTags: ["Section"],
    }),
    updateSection: builder.mutation({
      query: ({ sectionId, sectionData }) => ({
        url: `/section/update/${sectionId}`,
        method: "PUT",
        body: sectionData,
      }),
      invalidatesTags: ["Section"],
    }),
    deleteSection: builder.mutation({
      query: (sectionId) => ({
        url: `/section/delete/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Section"],
    }),
  }),
});

export const {
  useGetAllSectionsQuery,
  useGetSectionByIdQuery,
  useGetSectionByInstituteIdQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;
