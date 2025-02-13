import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mainReducer from "./Slices/MainSlice";
import { apiSlice } from "./Api/ApiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["main"],
};

const rootReducer = combineReducers({
  main: persistReducer(persistConfig, mainReducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
