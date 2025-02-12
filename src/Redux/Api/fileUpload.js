import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFilesMutation } = fileUploadApi;

export default fileUploadApi;