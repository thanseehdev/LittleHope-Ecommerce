import { createSlice } from "@reduxjs/toolkit";
import { addToCart,getCartItems,updateQuantity } from "./cartAction";

const initialState={
    items:[],
    status:null,
    loading:null,
    error:null
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending,(state)=>{
            state.status = "loading";
            state.loading=true;
            state.error=null
        })
        .addCase(addToCart.fulfilled,(state)=>{
            state.status = "succeeded";
            state.loading=false;
            state.error=null
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.status = "failed";
            state.loading=false;
            state.error=action.payload||'something went wrong'
        })

        .addCase(getCartItems.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getCartItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.items=action.payload.items;
            state.error=null
        })
        .addCase(getCartItems.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'something went wrong'
        })


        .addCase(updateQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(updateQuantity.fulfilled,(state)=>{
            state.loading=false;
            state.error=null
        })
        .addCase(updateQuantity.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'something went wrong'
        })

    }
})

export default cartSlice.reducer