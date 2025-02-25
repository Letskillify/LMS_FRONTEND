import { apiSlice } from "../ApiSlice";

export const firmAccountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFirmAccounts: builder.query({
      query: () => `/firm-account/get`,
      providesTags: ["FirmAccount"],
    }),
    getFirmAccountById: builder.query({
      query: (id) => `/firm-account/get/${id}`,
      providesTags: ["FirmAccount"],
    }),
    getFirmAccountsByInstituteId: builder.query({
      query: (instituteId) => `/firm-account/get/institute/${instituteId}`,
      providesTags: ["FirmAccount"],
    }),
    getFirmAccountsByClass: builder.query({
      query: (classId) => `/firm-account/get/class/${classId}`,
      providesTags: ["FirmAccount"],
    }),
    createFirmAccount: builder.mutation({
      query: (data) => ({
        url: `/firm-account/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FirmAccount"],
    }),
    updateFirmAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/firm-account/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FirmAccount"],
    }),
    softDeleteFirmAccount: builder.mutation({
      query: (id) => ({
        url: `/firm-account/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["FirmAccount"],
    }),
    restoreFirmAccount: builder.mutation({
      query: (id) => ({
        url: `/firm-account/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["FirmAccount"],
    }),
    deleteFirmAccount: builder.mutation({
      query: (id) => ({
        url: `/firm-account/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FirmAccount"],
    }),
    getTrashFirmAccounts: builder.query({
      query: () => `/firm-account/get-trash`,
      providesTags: ["FirmAccount"],
    }),
    getTrashFirmAccountsByInstitute: builder.query({
      query: (instituteId) => `/firm-account/get-trash/institute/${instituteId}`,
      providesTags: ["FirmAccount"],
    }),
  }),
  overrideExisting: true,
});

export const { 
  useGetAllFirmAccountsQuery, 
  useGetFirmAccountByIdQuery, 
  useGetFirmAccountsByInstituteIdQuery, 
  useGetFirmAccountsByClassQuery, 
  useCreateFirmAccountMutation, 
  useUpdateFirmAccountMutation, 
  useSoftDeleteFirmAccountMutation, 
  useRestoreFirmAccountMutation, 
  useDeleteFirmAccountMutation, 
  useGetTrashFirmAccountsQuery, 
  useGetTrashFirmAccountsByInstituteQuery 
} = firmAccountApi;

