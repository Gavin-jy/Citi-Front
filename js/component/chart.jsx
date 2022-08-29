import React from "react"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function Chart(props){
    return <HighchartsReact
        highcharts={Highcharts}
        options={props.chartOptions}
        allowChartUpdate={true}
        immutable={true}
        containerProps={{className:'chart'}}
    />
}
