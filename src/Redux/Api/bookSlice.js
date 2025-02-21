import { apiSlice } from "./ApiSlice";

export const bookListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/book/get`,
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/book/get/${id}`,
      providesTags: ["Books"],
    }),
    getBooksByInstituteId: builder.query({
      query: (id) => `/book/get/institute/${id}`,
      providesTags: ["Books"],
    }),
    getBooksByClassId: builder.query({
      query: (id) => `/book/get/class/${id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: `/book/post`,
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/book/update/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    softDeleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Books"],
    }),
    restoreBook: builder.mutation({
      query: (id) => ({
        url: `/book/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    getTrashBooks: builder.query({
      query: () => `/book/get-trash`,
      providesTags: ["Books"],
    }),
    getTrashBooksByInstituteId: builder.query({
      query: (id) => `/book/get-trash/institute/${id}`,
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useGetBooksByInstituteIdQuery,
  useGetBooksByClassIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useSoftDeleteBookMutation,
  useRestoreBookMutation,
  useDeleteBookMutation,
  useGetTrashBooksQuery,
  useGetTrashBooksByInstituteIdQuery,
} = bookListApi;
