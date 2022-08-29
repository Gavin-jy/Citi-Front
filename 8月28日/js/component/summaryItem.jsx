import React from "react"

export default function SummaryItem(props){
    return <span>
        <label className={props.className}>{props.label}:</label>
        <span>{props.value}</span>
    </span>
}