import React from "react"

export default function NLPTrade(props){

    return <div className="trade-nlp" style={{display: 'none'}}>
        <div className="trade-input-item">
            <div className="trade-input-title">NLP Trade</div>
            <input className="trade-input trade-nlp-input" placeholder="text input"/>
        </div>
        <div className="trade-submit-btns">
            <button className="trade-btn trade-go">Go</button>
        </div>
    </div>
}

