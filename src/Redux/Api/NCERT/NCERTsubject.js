import { apiSlice } from "../ApiSlice";

export const ncertApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNCERTSubjects: builder.query({
      query: () => `/NCERT/subject/get`,
      providesTags: ["NCERTsubject"],
    }),
    getNCERTSubjectById: builder.query({
      query: (id) => `/NCERT/subject/get/${id}`,
      providesTags: ["NCERTsubject"],
    }),
    createNCERTSubject: builder.mutation({
      query: (subjectData) => ({
        url: `/NCERT/subject/post`,
        method: "POST",
        body: subjectData,
      }),
      invalidatesTags: ["NCERTsubject"],
    }),
    updateNCERTSubject: builder.mutation({
      query: ({ id, subjectData }) => ({
        url: `/NCERT/subject/update/${id}`,
        method: "PUT",
        body: subjectData,
      }),
      invalidatesTags: ["NCERTsubject"],
    }),
    softDeleteNCERTSubject: builder.mutation({
      query: (id) => ({
        url: `/NCERT/subject/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NCERTsubject"],
    }),
    restoreNCERTSubject: builder.mutation({
      query: (id) => ({
        url: `/NCERT/subject/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NCERTsubject"],
    }),
    deleteNCERTSubject: builder.mutation({
      query: (id) => ({
        url: `/NCERT/subject/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NCERTsubject"],
    }),
    getTrashedNCERTSubjects: builder.query({
      query: () => `/NCERT/subject/get-trash`,
      providesTags: ["NCERTsubject"],
    }),
  }),
});

export const {
  useGetAllNCERTSubjectsQuery,
  useGetNCERTSubjectByIdQuery,
  useCreateNCERTSubjectMutation,
  useUpdateNCERTSubjectMutation,
  useSoftDeleteNCERTSubjectMutation,
  useRestoreNCERTSubjectMutation,
  useDeleteNCERTSubjectMutation,
  useGetTrashedNCERTSubjectsQuery,
} = ncertApi;
