import { createSlice } from "@reduxjs/toolkit";
import { createProduct } from "./adminProductAction"

const initialState = {
    loading: false,
    product: null,
    error: null,
}

const adminProductSlice=createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createProduct.pending,(state)=>{
            state.loading=true;
            state.error=false
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading=true;
            state.product=action.payload
            state.error=null
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default adminProductSlice.reducer;