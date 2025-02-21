import { apiSlice } from "../ApiSlice";

export const ncertClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNcertClasses: builder.query({
      query: () => `/NCERT/class/get`,
      providesTags: ["NCERTClass"],
    }),
    getClassById: builder.query({
      query: (id) => `/NCERT/class/get/${id}`,
      providesTags: ["NCERTClass"],
    }),
    getClassesByField: builder.query({
      query: (fieldValue) => `/NCERT/class/get/class/${fieldValue}`,
      providesTags: ["NCERTClass"],
    }),
    createNcertClass: builder.mutation({
      query: (classData) => ({
        url: `/NCERT/class/post`,
        method: "POST",
        body: classData,
      }),
      invalidatesTags: ["NCERTClass"],
    }),
    UpdateNcertClass: builder.mutation({
      query: ({ id, classData }) => ({
        url: `/NCERT/class/update/${id}`,
        method: "PUT",
        body: classData,
      }),
      invalidatesTags: ["NCERTClass"],
    }),
    softDeleteClass: builder.mutation({
      query: (id) => ({
        url: `/NCERT/class/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NCERTClass"],
    }),
    restoreClass: builder.mutation({
      query: (id) => ({
        url: `/NCERT/class/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NCERTClass"],
    }),
    deleteNcertClass: builder.mutation({
      query: (id) => ({
        url: `/NCERT/class/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NCERTClass"],
    }),
    getTrash: builder.query({
      query: () => `/NCERT/class/get-trash`,
      providesTags: ["NCERTClass"],
    }),
  }),
});

export const {
  useGetAllNcertClassesQuery,
  useGetClassByIdQuery,
  useGetClassesByFieldQuery,
  useCreateNcertClassMutation,
  useUpdateNcertClassMutation,
  useSoftDeleteClassMutation,
  useRestoreClassMutation,
  useDeleteNcertClassMutation,
  useGetTrashQuery,
} = ncertClassApi;

