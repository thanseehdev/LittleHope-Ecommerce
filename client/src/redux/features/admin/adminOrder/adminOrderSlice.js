import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails,getAllOrders,updateOrderStatus } from "./adminOrderAction";


const initialState={
    orders:[],
    orderDetail: null,
    error:null,
    loading:false,
    success:null,
    message:null,
    totalPages: 1,
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
            state.orders=action.payload.order;
            state.totalPages = action.payload.totalPages;
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


        .addCase(updateOrderStatus.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message
            state.error=null
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'fetching admin side order details failed'
        })
    }
})

export default orderSlice.reducer