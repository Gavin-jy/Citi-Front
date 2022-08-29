import React from "react"

export default function FreItem(props) {
    let cls = 'fre-item'
    if(props.active){
        cls += ' active'
    }

    return <span data-value={props.value} className={cls}>{props.label}</span>
}