import { apiSlice } from "../ApiSlice";

export const streamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStreams: builder.query({
      query: () => `/stream/get`,
      providesTags: ["Stream"],
    }),
    getStreamById: builder.query({
      query: (streamId) => `/stream/get/${streamId}`,
      providesTags: ["Stream"],
    }),
    getStreamsByInstituteId: builder.query({
      query: (instituteId) => `/stream/get/institute/${instituteId}`,
      providesTags: ["Stream"],
    }),
    createStream: builder.mutation({
      query: (streamData) => ({
        url: `/stream/post`,
        method: "POST",
        body: streamData,
      }),
      invalidatesTags: ["Stream"],
    }),
    updateStream: builder.mutation({
      query: ({ streamId, streamData }) => ({
        url: `/stream/update/${streamId}`,
        method: "PUT",
        body: streamData,
      }),
      invalidatesTags: ["Stream"],
    }),
    deleteStream: builder.mutation({
      query: (streamId) => ({
        url: `/stream/delete/${streamId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stream"],
    }),
  }),
});

export const {
  useGetAllStreamsQuery,
  useGetStreamByIdQuery,
  useGetStreamsByInstituteIdQuery,
  useCreateStreamMutation,
  useUpdateStreamMutation,
  useDeleteStreamMutation,
} = streamApi;
