import { apiSlice } from "../Api/ApiSlice";

export const expenseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenses: builder.query({
      query: () => `/expense/get`,
      providesTags: ["Expense"],
    }),
    getExpenseById: builder.query({
      query: (expenseId) => `/expense/get/${expenseId}`,
      providesTags: ["Expense"],
    }),
    getExpensesByFirm: builder.query({
      query: (firmId) => `/expense/get/firm/${firmId}`,
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
      query: (expenseData) => ({
        url: `/expense/post`,
        method: "POST",
        body: expenseData,
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ expenseId, expenseData }) => ({
        url: `/expense/update/${expenseId}`,
        method: "PUT",
        body: expenseData,
      }),
      invalidatesTags: ["Expense"],
    }),
    softDeleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expense/trash/${expenseId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Expense"],
    }),
    restoreExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expense/restore/${expenseId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expense/delete/${expenseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
    getTrashedExpenses: builder.query({
      query: () => `/expense/get-trash`,
      providesTags: ["Expense"],
    }),
    getTrashedExpensesByFirm: builder.query({
      query: (firmId) => `/expense/get-trash/firm/${firmId}`,
      providesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetExpenseByIdQuery,
  useGetExpensesByFirmQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useSoftDeleteExpenseMutation,
  useRestoreExpenseMutation,
  useDeleteExpenseMutation,
  useGetTrashedExpensesQuery,
  useGetTrashedExpensesByFirmQuery,
} = expenseApi;
