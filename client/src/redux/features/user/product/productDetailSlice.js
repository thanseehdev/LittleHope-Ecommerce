import { createSlice } from "@reduxjs/toolkit";
import { productDetail } from "./productDetailAction";

const initialState={
    loading:false,
    product:null,
    similarProducts:[],
    error:null
}

const productDetailSlice=createSlice({
    name:'productDetail',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(productDetail.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(productDetail.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload.product
            state.similarProducts=action.payload.similarProducts
            state.error=null
        })
        .addCase(productDetail.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})
export default productDetailSlice.reducer;