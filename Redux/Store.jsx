import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counterSlice"; // Apne reducer ko import karo
import sliceReducer from "./Slice";

export const store = configureStore({
  reducer: {
    counter: sliceReducer, // Reducer ko store me add karo
  },
});
