import React, { useEffect } from "react";
import { setFrequency } from "./tickerTrade/redux/reducers/freReducer";
import { fetchChartData } from "./tickerTrade/redux/reducers/chartReducer";
import { useDispatch, useSelector } from "react-redux";
import Trade from "./tickerTrade/container/Trade";
import Table from "./tickerTrade/container/Table";
import Chart from "./tickerTrade/container/Chart";

export default function App() {
  const dispatch = useDispatch();
  const fre = useSelector((state) => state.frequency.value);

  useEffect(() => {
    selectFre(fre);
  });

  function selectFre(fre) {
    dispatch(setFrequency(fre));
    dispatch(fetchChartData(fre));
  }

  return (
    <div>
      <Trade></Trade>
      <Table fre={fre} selectFre={selectFre}></Table>
      <Chart></Chart>
    </div>
  );
}
