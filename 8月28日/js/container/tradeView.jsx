import React from "react"
import TradeType from "../component/tradeType"
import TraditionalTrade from "../component/traditionalTrade"
import NLPTrade from "../component/nlpTrade"

export default function TradeView(props) {
    function switchType(pre, cur) {
        if (pre) {
            document.querySelector(`.trade-${pre}`).style.display = 'none'
        }

        document.querySelector(`.trade-${cur}`).style.display = 'flex'

        if (props.selectType) {
            props.selectType(pre, cur)
        }
    }

    return <div>
        <TradeType selectType={switchType} />
        <TraditionalTrade />
        <NLPTrade />
        <div className="sperate-line"></div>
    </div>
}