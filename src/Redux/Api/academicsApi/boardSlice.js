import { apiSlice } from "../ApiSlice";

export const boardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => `/board/get`,
      providesTags: ["Board"],
    }),
    getBoardById: builder.query({
      query: (boardId) => `/board/get/${boardId}`,
      providesTags: ["Board"],
    }),
    getBoardsByInstituteId: builder.query({
      query: (instituteId) => `/board/get/institute/${instituteId}`,
      providesTags: ["Board"],
    }),
    createBoard: builder.mutation({
      query: (boardData) => ({
        url: `/board/post`,
        method: "POST",
        body: boardData,
      }),
      invalidatesTags: ["Board"],
    }),
    updateBoard: builder.mutation({
      query: ({ boardId, boardData }) => ({
        url: `/board/update/${boardId}`,
        method: "PUT",
        body: boardData,
      }),
      invalidatesTags: ["Board"],
    }),
    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `/board/delete/${boardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board"],
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useGetBoardsByInstituteIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
