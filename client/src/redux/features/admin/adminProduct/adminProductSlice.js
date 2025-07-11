import { createSlice } from "@reduxjs/toolkit";
import { createProduct,fetchAllProducts,getEditProduct } from "./adminProductAction"

const initialState = {
    loading: false,
    products: [],
    product:null,
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
            state.loading=false;
            state.products=action.payload
            state.error=null
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })

        .addCase(fetchAllProducts.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
            state.error=null
        })
        .addCase(fetchAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        .addCase(getEditProduct.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getEditProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
            state.error=null
        })
        .addCase(getEditProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default adminProductSlice.reducer;