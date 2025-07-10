import { createSlice } from "@reduxjs/toolkit";
import { addCoupon,fetchCoupon } from "./couponAction";

const initialState={
    coupons:[],
    loading:false,
    error:null,
    success:null
}

const couponSlice=createSlice({
    name:'coupons',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addCoupon.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addCoupon.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload;
            state.error=null
        })
        .addCase(addCoupon.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })


        .addCase(fetchCoupon.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCoupon.fulfilled,(state,action)=>{
            state.loading=false;
            state.coupons=action.payload;
            state.error=null;
        })
        .addCase(fetchCoupon.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

    }
})

export default couponSlice.reducer