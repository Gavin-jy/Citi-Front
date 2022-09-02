import React, { useEffect } from "react";
import { setFrequency } from "../../redux/reducers/freReducer";
import { fetchChartData } from "../../redux/reducers/chartReducer";
import { setFilter } from "../../redux/reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";
import Trade from "../../container/Trade";
import Table from "../../container/Table";
import Chart from "../../container/Chart";
import Header from "../../container/Header";
import "./index.css";

export default function Home() {
  const dispatch = useDispatch();
  const fre = useSelector((state) => state.frequency.value);

  useEffect(() => {
    selectFre(fre);
  }, []);

  function selectFre(fre) {
    dispatch(setFrequency(fre));
    dispatch(
      setFilter({
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
        type: "",
      })
    );
    dispatch(fetchChartData(fre));
  }

  return (
    <div>
      <Header></Header>
      <div className="main">
        <Trade></Trade>
        <Table fre={fre} selectFre={selectFre}></Table>
        <Chart></Chart>
      </div>
    </div>
  );
}
