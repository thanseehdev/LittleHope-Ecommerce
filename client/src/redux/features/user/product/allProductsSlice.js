import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./allProductAction";

const initialState={
    loading:false,
    items:[],
    error:null
}

const fetchAllproductSlice=createSlice({
    name:'allProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.items=action.payload;
            state.error=null
        })
        .addCase(fetchAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export default fetchAllproductSlice.reducer