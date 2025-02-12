import { apiSlice } from "./ApiSlice";

export const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSettings: builder.mutation({
      query: (settingsData) => ({
        url: `/settings/post`,
        method: "POST",
        body: settingsData,
      }),
      invalidatesTags: ["Settings"],
    }),
    getSettingsByInstituteId: builder.query({
      query: (instituteId) => `/settings/get/institute/${instituteId}`,
      providesTags: ["Settings"],
    }),
    getAllSettings: builder.query({
      query: () => `/settings/get`,
      providesTags: ["Settings"],
    }),
    getSettingsById: builder.query({
      query: (id) => `/settings/get/${id}`,
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation({
      query: ({ id, settingsData }) => ({
        url: `/settings/update/${id}`,
        method: "PUT",
        body: settingsData,
      }),
      invalidatesTags: ["Settings"],
    }),
    deleteSettings: builder.mutation({
      query: (id) => ({
        url: `/settings/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useCreateSettingsMutation,
  useGetSettingsByInstituteIdQuery,
  useGetAllSettingsQuery,
  useGetSettingsByIdQuery,
  useUpdateSettingsMutation,
  useDeleteSettingsMutation,
} = settingsApi;
