import { apiSlice } from "../ApiSlice";

export const purchaseVoucherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVouchers: builder.query({
      query: () => `/purchase-voucher/get`,
      providesTags: ["PurchaseVoucher"],
    }),
    getVoucherById: builder.query({
      query: (id) => `/purchase-voucher/get/${id}`,
      providesTags: ["PurchaseVoucher"],
    }),
    getVouchersByInstituteId: builder.query({
      query: (instituteId) => `/purchase-voucher/get/institute/${instituteId}`,
      providesTags: ["PurchaseVoucher"],
    }),
    addPurchaseVoucher: builder.mutation({
      query: (voucherData) => ({
        url: `/purchase-voucher/post`,
        method: "POST",
        body: voucherData,
      }),
      invalidatesTags: ["PurchaseVoucher"],
    }),
    updatePurchaseVoucher: builder.mutation({
      query: ({ id, voucherData }) => ({
        url: `/purchase-voucher/update/${id}`,
        method: "PUT",
        body: voucherData,
      }),
      invalidatesTags: ["PurchaseVoucher"],
    }),
    softDeleteVoucher: builder.mutation({
      query: (id) => ({
        url: `/purchase-voucher/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["PurchaseVoucher"],
    }),
    restoreVoucher: builder.mutation({
      query: (id) => ({
        url: `/purchase-voucher/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["PurchaseVoucher"],
    }),
    deleteVoucher: builder.mutation({
      query: (id) => ({
        url: `/purchase-voucher/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PurchaseVoucher"],
    }),
    getTrashVouchers: builder.query({
      query: () => `/purchase-voucher/get-trash`,
      providesTags: ["PurchaseVoucher"],
    }),
    getTrashVouchersByInstituteId: builder.query({
      query: (instituteId) => `/purchase-voucher/get-trash/institute/${instituteId}`,
      providesTags: ["PurchaseVoucher"],
    }),
  }),
});

export const {
  useGetAllVouchersQuery,
  useGetVoucherByIdQuery,
  useGetVouchersByInstituteIdQuery,
  useAddPurchaseVoucherMutation,
  useUpdatePurchaseVoucherMutation,
  useSoftDeleteVoucherMutation,
  useRestoreVoucherMutation,
  useDeleteVoucherMutation,
  useGetTrashVouchersQuery,
  useGetTrashVouchersByInstituteIdQuery,
} = purchaseVoucherApi;
