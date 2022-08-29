import React from "react"
import {render} from "react-dom"
import App from './js/container/app'
import { Provider } from "react-redux"
import  createStore from "./js/store/createStore"
import './css/style.css'

function init(){
    const store=createStore()
    const container = document.querySelector('#container')
    render(<Provider store={store}><App/></Provider>,container)
}

init()

if(module.hot){
    module.hot.accept()
}