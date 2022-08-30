import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Charts(props) {
  const { chartOptions } = props;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      allowChartUpdate={true}
      immutable={true}
    />
  );
}
