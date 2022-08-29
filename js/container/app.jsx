import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import TradeView from "./tradeView"
import TableView from "./tableView"
import ChartView from "./chartView"
import { setFrequency } from "../reducer/freReducer"
import { fetchTableData } from "../reducer/tableReducer"
import { fetchChartData } from "../reducer/chartReducer"

export default function App(props){

    /*用dispatch传值 */
    const dispatch=useDispatch()
    /*从store中取数据，然后将数据传入对应的组件中 */
    const fre=useSelector(state=>state.frequency.value)
    const tableData=useSelector(state=>state.table.data)

    useEffect(()=>{
        selectFre(fre)
    },[])

    function selectFre(fre){
        dispatch(setFrequency(fre))
        dispatch(fetchTableData(fre))
        dispatch(fetchChartData(fre))
    }

    return <>
        <TradeView /> 
        <TableView fre={fre} selectFre={selectFre} tableData={tableData}/>
        <ChartView />
    </>
}