import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: { value: {
    date: 0,
    clientName: "",
    cilentSide: "",
    ticker: "",
    ric: "",
    size: 0,
    price: 0,
    nationalUsd: 0,
    currency: "",
    issuerSector: "",
    salesperson: "",
    type: ""
  } },
  reducers: {
    setFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterReducer.actions;

export default filterReducer.reducer;
