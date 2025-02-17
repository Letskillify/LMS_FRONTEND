import { apiSlice } from "./ApiSlice";

export const admissionEnquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmissionEnquiries: builder.query({
      query: () => `/admission-enquiry/get`,
      providesTags: ["AdmissionEnquiry"],
    }),
    getAdmissionEnquiryById: builder.query({
      query: (id) => `/admission-enquiry/get/${id}`,
      providesTags: ["AdmissionEnquiry"],
    }),
    getAdmissionEnquiriesByInstituteId: builder.query({
      query: (id) => `/admission-enquiry/get/institute/${id}`,
      providesTags: ["AdmissionEnquiry"],
    }),
    getAdmissionEnquiriesByClassId: builder.query({
      query: (id) => `/admission-enquiry/get/class/${id}`,
      providesTags: ["AdmissionEnquiry"],
    }),
    createAdmissionEnquiry: builder.mutation({
      query: (enquiryData) => ({
        url: `/admission-enquiry/post`,
        method: "POST",
        body: enquiryData,
      }),
      invalidatesTags: ["AdmissionEnquiry"],
    }),
    updateAdmissionEnquiry: builder.mutation({
      query: ({ id, enquiryData }) => ({
        url: `/admission-enquiry/update/${id}`,
        method: "PUT",
        body: enquiryData,
      }),
      invalidatesTags: ["AdmissionEnquiry"],
    }),
    softDeleteAdmissionEnquiry: builder.mutation({
      query: (id) => ({
        url: `/admission-enquiry/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["AdmissionEnquiry"],
    }),
    restoreAdmissionEnquiry: builder.mutation({
      query: (id) => ({
        url: `/admission-enquiry/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["AdmissionEnquiry"],
    }),
    deleteAdmissionEnquiry: builder.mutation({
      query: (id) => ({
        url: `/admission-enquiry/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdmissionEnquiry"],
    }),
    getTrashAdmissionEnquiries: builder.query({
      query: () => `/admission-enquiry/get-trash`,
      providesTags: ["AdmissionEnquiry"],
    }),
    getTrashAdmissionEnquiriesByInstituteId: builder.query({
      query: (id) => `/admission-enquiry/get-trash/institute/${id}`,
      providesTags: ["AdmissionEnquiry"],
    }),
  }),
});

export const {
  useGetAllAdmissionEnquiriesQuery,
  useGetAdmissionEnquiryByIdQuery,
  useGetAdmissionEnquiriesByInstituteIdQuery,
  useGetAdmissionEnquiriesByClassIdQuery,
  useCreateAdmissionEnquiryMutation,
  useUpdateAdmissionEnquiryMutation,
  useSoftDeleteAdmissionEnquiryMutation,
  useRestoreAdmissionEnquiryMutation,
  useDeleteAdmissionEnquiryMutation,
  useGetTrashAdmissionEnquiriesQuery,
  useGetTrashAdmissionEnquiriesByInstituteIdQuery,
} = admissionEnquiryApi;
