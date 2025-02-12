import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./Slices/MainSlice";
import { apiSlice } from "./Api/ApiSlice";
import fileUploadApi from "./Api/fileUpload";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(fileUploadApi.middleware),
  devTools: true,
});
