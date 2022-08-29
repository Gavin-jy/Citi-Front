import React,{useState} from "react"
import TradeItem from "./tradeItem"

const ITEMS = [
    {value : 'traditional',label : 'Traditional Trade',active: true},
    {value : 'nlp',label : 'NLP Trade',active: false},
]

export default function TradeType(props){
    const {selectType} = props
    const [list, setList] = useState(ITEMS)

    function onClickHandler(evt){
        const tradeE1 = evt.target
        const cur = tradeE1.dataset.value
        ITEMS.forEach(item => {
            item.active = false
            if(item.value === cur){
                item.active = true
            }
        })
        setList(JSON.parse(JSON.stringify(ITEMS)))
        let pre = ""
        if(ITEMS[0].value === cur) pre = ITEMS[1].value
        else pre = ITEMS[0].value   
        /**下面这一句是干啥的 */  
        if(selectType){
            selectType(pre,cur)
        }
    }

    return <div className = "trade-type" onClick={onClickHandler}>
        {
            list.map(item => {
                return <TradeItem key={item.value} {...item}/>
            })
        }
    </div>
}