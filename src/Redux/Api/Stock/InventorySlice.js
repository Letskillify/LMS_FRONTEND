import { apiSlice } from "./ApiSlice";

export const inventoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInventory: builder.query({
      query: () => `/inventory/get`,
      providesTags: ["Inventory"],
    }),
    getInventoryById: builder.query({
      query: (id) => `/inventory/get/${id}`,
      providesTags: ["Inventory"],
    }),
    createInventory: builder.mutation({
      query: (data) => ({
        url: `/inventory/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),
    updateInventory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/inventory/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `/inventory/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const { 
  useGetAllInventoryQuery, 
  useGetInventoryByIdQuery, 
  useCreateInventoryMutation, 
  useUpdateInventoryMutation, 
  useDeleteInventoryMutation 
} = inventoryApi;
