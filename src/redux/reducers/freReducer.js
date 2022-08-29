import { createSlice } from "@reduxjs/toolkit";

const freReducer = createSlice({
  name: "frequency",
  initialState: { value: 0 },
  reducers: {
    setFrequency(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setFrequency } = freReducer.actions;

export default freReducer.reducer;
