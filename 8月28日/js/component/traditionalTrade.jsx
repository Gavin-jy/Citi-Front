import React, { useEffect, useState } from "react"
import TradeInput from "./tradeInput"

export default function TraditionalTrade(props){
    //传输数据
    const [tradePost,setTradePost] = useState(
        {
            'clientName' : '',
            'ticker' : '',
            'ric' : '',
            'size' : '',
            'price' : '',
            'currency' : '',
            'sector' : '',
            'salesperson' : '',
            'hp' : 'HT',
            'flag' : ''
        }
    )


    function onClickHandler(evt) {
        const tradeE1 = evt.target.className
        //0买1卖
        if(tradeE1 === "trade-btn trade-buy") tradePost.flag = 0
        else if(tradeE1 === "trade-btn trade-sell") tradePost.flag = 1
        console.log("tradePost",tradePost)
        fetch(``,{
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(tradePost)
    }).then(res => {
        if(res.ok){
            return res.json()
        }
        return {value:[]}
    }).then(data => {
        alert(data.result)
    })
    }

    return <div className="trade-traditional">
        <div className="trade-input-items">
            <TradeInput type="input" label="Client Name" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="Ticker" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="RIC" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="Size" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="Price" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="Currency" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="Issue Sector" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="input" label="Salesperson" tradePost={tradePost} setTradePost={setTradePost}/>
            <TradeInput type="select" label="HT/PT" options={["HT","PT"]} tradePost={tradePost} setTradePost={setTradePost}/>
        </div>
        <div className="trade-submit-btns">
            <button className="trade-btn trade-buy" onClick={onClickHandler}>Buy</button>
            <button className="trade-btn trade-sell" onClick={onClickHandler}>Sell</button>
        </div>
    </div>
}