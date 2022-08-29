import React from "react"
import {render} from "react-dom"
import {Provider} from 'react-redux'
import createStore from "./store/createStore"
import App from './container/app'
import './css/pratice.css'

function init(){
    const store = createStore()
    const container = document.querySelector('#container')
    render(<Provider store={store}><App /></Provider>, container)
}

init()

if(module.hot){
    module.hot.accept()
}