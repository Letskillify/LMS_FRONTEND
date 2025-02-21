import { apiSlice } from "./ApiSlice";

export const instituteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutes: builder.query({
      query: () => `/institute/get`,
      providesTags: ["Institute"],
    }),
    getInstituteById: builder.query({
      query: (id) => `/institute/get/${id}`,
      providesTags: ["Institute"],
    }),
    getPermanentlyDeletedInstitutes: builder.query({
      query: () => `/institute/get-permanently-deleted`,
      providesTags: ["Institute"],
    }),
    addInstitute: builder.mutation({
      query: (instituteData) => ({
        url: `/institute/post`,
        method: "POST",
        body: instituteData,
      }),
      invalidatesTags: ["Institute"],
    }),
    updateInstituteById: builder.mutation({
      query: ({ id, instituteData }) => ({
        url: `/institute/update/${id}`,
        method: "PUT",
        body: instituteData,
      }),
      invalidatesTags: ["Institute"],
    }),
    getTrashInstitutes: builder.query({
      query: () => `/institute/get-trash`,
      providesTags: ["Institute"],
    }),
    getTrashInstituteById: builder.query({
      query: (id) => `/institute/get-trash/${id}`,
      providesTags: ["Institute"],
    }),
    addInstituteToTrash: builder.mutation({
      query: (id) => ({
        url: `/institute/add-trash/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Institute"],
    }),
    addAllInstitutesToTrash: builder.mutation({
      query: () => ({
        url: `/institute/add-all-trash`,
        method: "DELETE",
      }),
      invalidatesTags: ["Institute"],
    }),
    reviveInstituteById: builder.mutation({
      query: (id) => ({
        url: `/institute/revive/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Institute"],
    }),
    reviveAllInstitutes: builder.mutation({
      query: () => ({
        url: `/institute/revive-all`,
        method: "POST",
      }),
      invalidatesTags: ["Institute"],
    }),
    permanentlyDeleteInstituteById: builder.mutation({
      query: (id) => ({
        url: `/institute/permanent-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Institute"],
    }),
    permanentlyDeleteAllInstitutes: builder.mutation({
      query: () => ({
        url: `/institute/permanent-delete-all`,
        method: "DELETE",
      }),
      invalidatesTags: ["Institute"],
    }),
  }),
});

export const {
  useGetInstitutesQuery,
  useGetInstituteByIdQuery,
  useGetPermanentlyDeletedInstitutesQuery,
  useAddInstituteMutation,
  useUpdateInstituteByIdMutation,
  useGetTrashInstitutesQuery,
  useGetTrashInstituteByIdQuery,
  useAddInstituteToTrashMutation,
  useAddAllInstitutesToTrashMutation,
  useReviveInstituteByIdMutation,
  useReviveAllInstitutesMutation,
  usePermanentlyDeleteInstituteByIdMutation,
  usePermanentlyDeleteAllInstitutesMutation,
} = instituteApi;
