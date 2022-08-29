import React from "react"
import FreGroup from "../component/freGroup"
import Table from "../component/table"

export default function TableView(props) {

    return <section className="table-area">
        <FreGroup selectFre = {props.selectFre} fre={props.fre} />
        <Table tableData = {props.tableData}/>
    </section>
}