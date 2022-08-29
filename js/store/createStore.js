import { configureStore } from "@reduxjs/toolkit";
import {logger} from 'redux-logger'
import freReducer from '../reducer/freReducer'
import tableReducer from '../reducer/tableReducer'
import chartReducer from '../reducer/chartReducer'

export default function createStore(){
    const store=configureStore({
        reducer:{
            frequency:freReducer,
            table:tableReducer,
            chart:chartReducer
        },
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([logger]),
    })
    return store
}