import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTableData=createAsyncThunk('table/fetch',async(fre,{dispatch})=>{
    const response=await fetch(`url`)
    let data={value:[],chart:{}}
    if(response.ok){
        data=await response.json()
    }
    return data
})

const tableReducer = createSlice({
    name: 'table',
    initialState: { data:{value:[]},loading:false },
    reducers: {
        setTableData(state, action) {
            state.data = action.payload
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchTableData.pending,(state,action)=>{
                state.loading=true
            })
            .addCase(fetchTableData.fulfilled,(state,action)=>{
                state.loading=false
                state.data=action.payload
            })
            .addCase(fetchTableData.rejected,(state,action)=>{
                state.loading=false
            })
    }
})

export const {setTableData} = tableReducer.actions

export default tableReducer.reducer