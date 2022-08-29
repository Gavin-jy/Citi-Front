import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import api from "../../api/api";

export const fetchChartData = createAsyncThunk(
  "chart/fetch",
  async (fre, { dispatch }) => {
    // 发请求
    let data = { dateList: [], buySeries: [], sellSeries: [] };
    try {
      const res = await api.getChartData();
      data = { ...res };
    } catch (error) {
      message.error("获取失败");
      console.log(error);
    }
    return data;
  }
);

const tableReducer = createSlice({
  name: "table",
  initialState: {
    data: { dateList: [], buySeries: [], sellSeries: [] },
    loading: false,
  },
  reducers: {
    setChartData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChartData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setChartData } = tableReducer.actions;

export default tableReducer.reducer;
