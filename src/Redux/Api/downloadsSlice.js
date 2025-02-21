import { apiSlice } from "./ApiSlice";

export const downloadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDownloadLink: builder.query({
      query: (link) => `/download/link?url=${encodeURIComponent(link)}`,
    }),
  }),
});

export const { useLazyGetDownloadLinkQuery } = downloadApi;
