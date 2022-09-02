import React from "react";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import util from "../../utils/util";
import { CHART_OPTIONS } from "../../utils/chartOptions";
import "./index.css";
import Charts from "../../component/Charts";

export default function Chart() {
  const chartData = useSelector((state) => state.chart.data);
  const { dateList = [], buySeries = [], sellSeries = [] } = chartData;

  const chartOptions = CHART_OPTIONS(
    dateList.map((item) => {
      return util.formatTime(item);
    }),
    buySeries,
    sellSeries
  );

  return (
    <div>
      <div className="flow-analysis">
        <div className="flow-tip">Flow Analysis</div>
        {dateList.length === 0 ? (
          <Empty
            className="empty-chart"
            description="Sorry, no chart data !"
          />
        ) : (
          <Charts chartOptions={chartOptions}></Charts>
        )}
      </div>
    </div>
  );
}
