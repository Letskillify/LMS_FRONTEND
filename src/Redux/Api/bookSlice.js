import { apiSlice } from "./ApiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/book/get`,
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `/book/get/${id}`,
      providesTags: ["Book"],
    }),
    addNewBook: builder.mutation({
      query: (bookData) => ({
        url: `/book/post`,
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBookById: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/book/update/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBooksInBulk: builder.mutation({
      query: (bookData) => ({
        url: `/book/update-all`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),
    getTrashBooks: builder.query({
      query: () => `/book/get-trash`,
      providesTags: ["Book"],
    }),
    getTrashBookById: builder.query({
      query: (id) => `/book/get-trash/${id}`,
      providesTags: ["Book"],
    }),
    addBookToTrashById: builder.mutation({
      query: (id) => ({
        url: `/book/add-trash/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    addAllBooksToTrash: builder.mutation({
      query: () => ({
        url: `/book/add-all-trash`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    reviveBookById: builder.mutation({
      query: (id) => ({
        url: `/book/revive/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Book"],
    }),
    reviveAllBooks: builder.mutation({
      query: () => ({
        url: `/book/revive-all`,
        method: "POST",
      }),
      invalidatesTags: ["Book"],
    }),
    permanentlyDeleteBookById: builder.mutation({
      query: (id) => ({
        url: `/book/permanent-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    permanentlyDeleteAllBooks: builder.mutation({
      query: () => ({
        url: `/book/permanent-delete-all`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddNewBookMutation,
  useUpdateBookByIdMutation,
  useUpdateBooksInBulkMutation,
  useGetTrashBooksQuery,
  useGetTrashBookByIdQuery,
  useAddBookToTrashByIdMutation,
  useAddAllBooksToTrashMutation,
  useReviveBookByIdMutation,
  useReviveAllBooksMutation,
  usePermanentlyDeleteBookByIdMutation,
  usePermanentlyDeleteAllBooksMutation,
} = bookApi;
