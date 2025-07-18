import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails,getAllOrders } from "./adminOrderAction";


const initialState={
    orders:[],
    orderDetail: null,
    error:null,
    loading:false,
    success:null
}

const orderSlice=createSlice({
    name:'adminOrder',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
            state.error=null
        })
        .addCase(getAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'fetching admin side order failed'
        })


        .addCase(getOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetail=action.payload;
            state.error=null
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'fetching admin side order details failed'
        })
    }
})

export default orderSlice.reducer