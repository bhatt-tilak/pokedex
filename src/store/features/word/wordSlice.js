import { createSlice } from "@reduxjs/toolkit";

export const wordSlice = createSlice({
  name: "auth",
  initialState: {},

  reducers: {},
});

export const {} = wordSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default wordSlice.reducer;
