import { createSlice } from "@reduxjs/toolkit";
import { getDashData } from "./adminDashAction";


const initialState={
    data:{},
    error:null,
    loading:false
}

const dashSlice=createSlice({
    name:'adminDash',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getDashData.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getDashData.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
            state.error=null
        })
        .addCase(getDashData.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.message||'some error while fetching Dashdata'
        })
    }
})

export default dashSlice.reducer