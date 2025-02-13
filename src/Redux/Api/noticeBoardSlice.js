import { apiSlice } from "./ApiSlice";

export const noticeBoardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNoticeBoards: builder.query({
            query: () => `/noticeboard/get`,
            providesTags: ["NoticeBoard"],
        }),
        getNoticeBoardById: builder.query({
            query: (id) => `/noticeboard/get/${id}`,
            providesTags: ["NoticeBoard"],
        }),
        getNoticeBoardsByInstituteId: builder.query({
            query: (instituteId) => `/noticeboard/get/institute/${instituteId}`,
            providesTags: ["NoticeBoard"],
        }),
        createNoticeBoard: builder.mutation({
            query: (noticeData) => ({
                url: `/noticeboard/post`,
                method: "POST",
                body: noticeData,
            }),
            invalidatesTags: ["NoticeBoard"],
        }),
        updateNoticeBoard: builder.mutation({
            query: ({ id, noticeData }) => ({
                url: `/noticeboard/update/${id}`,
                method: "PUT",
                body: noticeData,
            }),
            invalidatesTags: ["NoticeBoard"],
        }),
        deleteNoticeBoard: builder.mutation({
            query: (id) => ({
                url: `/noticeboard/delete/${id}`,
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
