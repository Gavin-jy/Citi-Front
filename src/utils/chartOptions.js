export const CHART_OPTIONS = (dateSeries, buySeries, sellSeries) => {
  // 计算折线图数据
  let cumulationSeries = Array.from(buySeries);
  for (let i = 0; i < buySeries.length; i++) {
    cumulationSeries[i] += sellSeries[i];
  }
  return {
    chart: {
      zoomType: "xy",
      backgroundColor: "#17202a",
    },
    title: {
      text: "买入与卖出统计",
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    // 标签
    labels: {
      items: [
        {
          html: "Buy",
          style: {
            left: `10px`,
            top: `20px`,
            color: "white",
          },
        },
        {
          html: "Sell",
          style: {
            left: `10px`,
            top: `280px`,
            color: "white",
          },
        },
      ],
    },
    xAxis: [
      {
        lineWidth: 1,
        lineColor: "#243343",
        gridLineWidth: 1,
        gridLineColor: "#243343",
        labels: {
          align: "center",
          step: 4,
          style: {
            color: "#97afc6",
          },
        },
        title: {
          enabled: false,
        },
        tickmarkPlacement: "on",
        categories: dateSeries,
      },
    ],
    yAxis: [
      {
        lineWidth: 1,
        lineColor: "#243343",
        gridLineWidth: 1,
        gridLineColor: "#243343",
        // Primary yAxis
        labels: {
          format: "{value}$",
          style: {
            color: "#97afc6",
          },
        },
        title: {
          enabled: false,
        },
      },
      {
        // 显示在下侧的镜像 yAxis （通过 linkedTo 与第一个 yAxis 关联）
        lineWidth: 1,
        lineColor: "#243343",
        gridLineWidth: 1,
        gridLineColor: "#243343",
        opposite: true,
        reversed: false,
        linkedTo: 0,
        labels: {
          enabled: false,
        },
        title: {
          enabled: false,
        },
      },
      {
        lineWidth: 0,
        lineColor: "#243343",
        gridLineWidth: 0,
        gridLineColor: "#243343",
        labels: {
          enabled: false,
        },
        title: {
          enabled: false,
        },
      },
    ],

    // 绘图参数
    plotOptions: {
      column: {
        showInLegend: false,
        stacking: "normal",
        color: "#00B0B9",
        borderColor: "#00b0b9",
        states: {
          hover: {
            brightness: 0.3,
          },
        },
      },
      // series: {
      //   borderWidth: "0",
      //   stacking: "normal",
      // },
    },
    // 数据提示框
    tooltip: {
      shared: true,
      backgroundColor: "#ffffff",
    },
    // 浮窗
    legend: {
      layout: "vertical",
      align: "right",
      x: 0,
      verticalAlign: "top",
      y: 60,
      floating: true,
      itemStyle: {
        color: "#FFFFFF",
        fontSize: "12px",
      },
      itemHoverStyle: {
        color: "#FFFFFF",
      },
      backgroundColor: "transparent",
    },
    // 数据
    series: [
      {
        name: "Buy",
        color: "#00b0b9",
        type: "column",
        data: buySeries,
      },
      {
        name: "Sell",
        type: "column",
        color: "#06848d",
        borderColor: "rgba(0,176,185,0.7)",
        data: sellSeries,
      },
      {
        name: "Cumulative Net",
        type: "spline",
        color: "#ed8b00",
        lineWidth: 1,
        data: cumulationSeries,
        marker: {
          Symbol: "square",
          lineWidth: 1,
          lineColor: "ed8b00",
          fillColor: "#87a2bd",
        },
      },
    ],
  };
};
