import { apiSlice } from "../ApiSlice";

export const ncertBookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNCERTBooks: builder.query({
      query: () => "/NCERT/book/get",
      providesTags: ["NCERTBook"],
    }),
    getNCERTBookById: builder.query({
      query: (id) => `/NCERT/book/get/${id}`,
      providesTags: ["NCERTBook"],
    }),
    getNCERTBooksByClass: builder.query({
      query: (classId) => `/NCERT/book/get/class/${classId}`,
      providesTags: ["NCERTBook"],
    }),
    createNCERTBook: builder.mutation({
      query: (newBook) => ({
        url: "/NCERT/book/post",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["NCERTBook"],
    }),
    updateNCERTBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `/NCERT/book/update/${id}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: ["NCERTBook"],
    }),
    softDeleteNCERTBook: builder.mutation({
      query: (id) => ({
        url: `/NCERT/book/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NCERTBook"],
    }),
    restoreNCERTBook: builder.mutation({
      query: (id) => ({
        url: `/NCERT/book/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NCERTBook"],
    }),
    deleteNCERTBook: builder.mutation({
      query: (id) => ({
        url: `/NCERT/book/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NCERTBook"],
    }),
    getTrashNCERTBooks: builder.query({
      query: () => "/NCERT/book/get-trash",
      providesTags: ["NCERTBook"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllNCERTBooksQuery,
  useGetNCERTBookByIdQuery,
  useGetNCERTBooksByClassQuery,
  useCreateNCERTBookMutation,
  useUpdateNCERTBookMutation,
  useSoftDeleteNCERTBookMutation,
  useRestoreNCERTBookMutation,
  useDeleteNCERTBookMutation,
  useGetTrashNCERTBooksQuery,
} = ncertBookApi;
