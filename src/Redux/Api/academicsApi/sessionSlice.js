import { apiSlice } from "../ApiSlice";

export const sessionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessions: builder.query({
      query: () => `/session/get`,
      providesTags: ["Session"],
    }),
    getSessionById: builder.query({
      query: (sessionId) => `/session/get/${sessionId}`,
      providesTags: ["Session"],
    }),
    getSessionByInstituteId: builder.query({
      query: (instituteId) => `/session/get/institute/${instituteId}`,
      providesTags: ["Session"],
    }),
    createSession: builder.mutation({
      query: (sessionData) => ({
        url: `/session/post`,
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["Session"],
    }),
    updateSession: builder.mutation({
      query: ({ sessionId, sessionData }) => ({
        url: `/session/update/${sessionId}`,
        method: "PUT",
        body: sessionData,
      }),
      invalidatesTags: ["Session"],
    }),
    deleteSession: builder.mutation({
      query: (sessionId) => ({
        url: `/session/delete/${sessionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useGetAllSessionsQuery,
  useGetSessionByIdQuery,
  useGetSessionByInstituteIdQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionApi;
