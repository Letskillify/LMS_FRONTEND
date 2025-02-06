import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0, // Counter ki initial value 0 hogi
};

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Value ko 1 se badhao
    },
    decrement: (state) => {
      state.value -= 1; // Value ko 1 se ghatao
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Custom value se badhao
    },
  },
});

// Actions ko export karo taki components me use kar sakein
export const { increment, decrement, incrementByAmount } = slice.actions;

// Reducer ko export karo taki store me use kar sakein
export default slice.reducer;
