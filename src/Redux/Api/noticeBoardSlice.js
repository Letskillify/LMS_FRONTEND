import { apiSlice } from "./ApiSlice";

export const noticeBoardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNoticeBoards: builder.query({
            query: () => `/notice-board/get`,
            providesTags: ["NoticeBoard"],
        }),
        getNoticeBoardById: builder.query({
            query: (id) => `/notice-board/get/${id}`,
            providesTags: ["NoticeBoard"],
        }),
        getNoticeBoardsByInstituteId: builder.query({
            query: (instituteId) => `/notice-board/get/institute/${instituteId}`,
            providesTags: ["NoticeBoard"],
        }),
        createNoticeBoard: builder.mutation({
            query: (noticeData) => ({
                url: `/notice-board/post`,
                method: "POST",
                body: noticeData,
            }),
            invalidatesTags: ["NoticeBoard"],
        }),
        updateNoticeBoard: builder.mutation({
            query: ({ id, noticeData }) => ({
                url: `/notice-board/update/${id}`,
                method: "PUT",
                body: noticeData,
            }),
            invalidatesTags: ["NoticeBoard"],
        }),
        deleteNoticeBoard: builder.mutation({
            query: (id) => ({
                url: `/notice-board/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["NoticeBoard"],
        }),
    }),
});

export const {
    useGetNoticeBoardsQuery,
    useGetNoticeBoardByIdQuery,
    useGetNoticeBoardsByInstituteIdQuery,
    useCreateNoticeBoardMutation,
    useUpdateNoticeBoardMutation,
    useDeleteNoticeBoardMutation
} = noticeBoardApi;
