import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import api from "../../api/api";

export const fetchTableData = createAsyncThunk(
  "table/fetch",
  async (params, { dispatch }) => {
    // 发请求
    let data = { dataList: [] };
    try {
      data = await api.getTableData(params);
    } catch (error) {
      message.error("获取失败");
      console.log(error);
    }
    return data;
  }
);

const tableReducer = createSlice({
  name: "table",
  initialState: { data: { dataList: [] }, loading: false },
  reducers: {
    setTableData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTableData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setTableData } = tableReducer.actions;

export default tableReducer.reducer;
