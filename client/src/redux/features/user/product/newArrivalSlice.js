import { createSlice } from "@reduxjs/toolkit";
import { newArrivals } from "./newArrivalAction";

const initialState={
    products: [],
    loading: false,
    error: null,
}

const newArrivalSlice=createSlice({
    name:'newArrival',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(newArrivals.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(newArrivals.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload
            state.error=null
        })
        .addCase(newArrivals.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default newArrivalSlice.reducer;
