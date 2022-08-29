import React from 'react'

export default function TradeInput(props){
    let tradePost = props.tradePost
    let setTradePost = props.setTradePost
    function inputChange(e){
        const val = e.target.value
        switch(props.label){
            case 'Client Name':
                tradePost.clientName = val
                break
            case 'Ticker':
                tradePost.ticker = val
                break
            case 'RIC':
                tradePost.ric = val
                break
            case 'Size':
                tradePost.size = val
                break
            case 'Price':
                tradePost.price = val
                break
            case 'Currency':
                tradePost.currency = val
                break
            case 'Issue Sector':
                tradePost.sector = val
                break
            case 'Salesperson':
                tradePost.salesperson = val
                break
            case 'HT/PT':
                tradePost.hp = val
                break
            default:
                break
        }
        setTradePost(tradePost)
    }
    return <>{props.type == 'input' ?
                (<div className="trade-input-item">
                    <div className="trade-input-title">{props.label}</div>
                    <input className="trade-input" placeholder="text input" onChange={inputChange}/>
                </div>) : 
                (<div>
                    <div className="trade-input-title">{props.label}</div>
                    <select className="trade-input" onChange={inputChange}>
                        {
                            props.options.forEach(opt => <option key={opt} >{opt}</option>)
                        }
                    </select>
                </div>)}
    </>
}