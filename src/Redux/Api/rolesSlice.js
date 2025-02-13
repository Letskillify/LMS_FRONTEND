import { apiSlice } from "./ApiSlice";

export const employeeRoleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => `/define-role/get`,
      providesTags: ["EmployeeRole"],
    }),
    getRoleById: builder.query({
      query: (roleId) => `/define-role/get/${roleId}`,
      providesTags: ["EmployeeRole"],
    }),
    getRolesByInstituteId: builder.query({
      query: (instituteId) => `/define-role/get/institute/${instituteId}`,
      providesTags: ["EmployeeRole"],
    }),
    createRole: builder.mutation({
      query: (roleData) => ({
        url: `/define-role/post`,
        method: "POST",
        body: roleData,
      }),
      invalidatesTags: ["EmployeeRole"],
    }),
    updateRole: builder.mutation({
      query: ({ roleId, roleData }) => ({
        url: `/define-role/update/${roleId}`,
        method: "PUT",
        body: roleData,
      }),
      invalidatesTags: ["EmployeeRole"],
    }),
    deleteRole: builder.mutation({
      query: (roleId) => ({
        url: `/define-role/delete/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeeRole"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useGetRolesByInstituteIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = employeeRoleApi;
