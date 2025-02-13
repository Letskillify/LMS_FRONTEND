import apiSlice from "./ApiSlice";

export const fileUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ImageUpload"],
    }),
  }),
});

export const { useUploadFilesMutation } = fileUploadApi;
