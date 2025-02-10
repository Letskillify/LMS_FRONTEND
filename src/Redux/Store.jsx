import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./Slices/MainSlice";
import { apiSlice } from "./Api/ApiSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
