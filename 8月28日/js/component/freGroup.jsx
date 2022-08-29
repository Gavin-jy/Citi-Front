import React,{useState} from "react";
import FreItem from "./freItem";

const ITEMS = [
    {value :'1D',label :'1D',active : true},
    {value :'1W',label :'1W',active : false},
    {value :'2W',label :'2W',active : false},
    {value :'1M',label :'1M',active : false},
    {value :'3M',label :'3M',active : false},
    {value :'6M',label :'6M',active : false},
    {value :'1Y',label :'1Y',active : false},
    {value :'YTD',label :'YTD',active : false}]

export default function FreGroup(props){

    const {selectFre} = props
    const [list, setList] = useState(ITEMS)

    function onClickHandler(evt) {
        const freE1 = evt.target

        const selectedVal = freE1.dataset.value

        ITEMS.forEach(item => {
            item.active =false
            if(item.value === selectedVal){
                item.active = true
            }
        })
        setList(JSON.parse(JSON.stringify(ITEMS)))
        /*这一句 */
        if(selectFre){
            selectFre(selectedVal)
        }
    }

    return <div className="fre-group" onClick={onClickHandler}>
        {
            list.map(item => {
                return <FreItem key={item.value} {...item}/>
            })
        }
    </div>

}