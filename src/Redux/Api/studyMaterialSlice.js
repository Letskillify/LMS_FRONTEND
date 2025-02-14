import { apiSlice } from "./ApiSlice";

export const studyMaterialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudyMaterials: builder.query({
      query: () => `/study-material/get`,
      providesTags: ["StudyMaterial"],
    }),
    getStudyMaterialById: builder.query({
      query: (id) => `/study-material/get/${id}`,
      providesTags: ["StudyMaterial"],
    }),
    getStudyMaterialsByInstituteId: builder.query({
      query: (id) => `/study-material/get/institute/${id}`,
      providesTags: ["StudyMaterial"],
    }),
    createStudyMaterial: builder.mutation({
      query: (studyMaterialData) => ({
        url: `/study-material/post`,
        method: "POST",
        body: studyMaterialData,
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
    updateStudyMaterial: builder.mutation({
      query: ({ id, studyMaterialData }) => ({
        url: `/study-material/update/${id}`,
        method: "PUT",
        body: studyMaterialData,
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
    softDeleteStudyMaterial: builder.mutation({
      query: (id) => ({
        url: `/study-material/trash/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
    restoreStudyMaterial: builder.mutation({
      query: (id) => ({
        url: `/study-material/restore/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
    deleteStudyMaterial: builder.mutation({
      query: (id) => ({
        url: `/study-material/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
    getTrashedStudyMaterials: builder.query({
      query: () => `/study-material/get-trash`,
      providesTags: ["StudyMaterial"],
    }),
    getTrashedStudyMaterialsByInstituteId: builder.query({
      query: (id) => `/study-material/get-trash/institute/${id}`,
      providesTags: ["StudyMaterial"],
    }),
  }),
});

export const {
  useGetAllStudyMaterialsQuery,
  useGetStudyMaterialByIdQuery,
  useGetStudyMaterialsByInstituteIdQuery,
  useCreateStudyMaterialMutation,
  useUpdateStudyMaterialMutation,
  useSoftDeleteStudyMaterialMutation,
  useRestoreStudyMaterialMutation,
  useDeleteStudyMaterialMutation,
  useGetTrashedStudyMaterialsQuery,
  useGetTrashedStudyMaterialsByInstituteIdQuery,
} = studyMaterialApi;
