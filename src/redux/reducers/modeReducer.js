import { createSlice } from "@reduxjs/toolkit";

const modeReducer = createSlice({
  name: "mode",
  initialState: { value: 0 },
  reducers: {
    setMode(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setMode } = modeReducer.actions;

export default modeReducer.reducer;
