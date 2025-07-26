import { createSlice } from "@reduxjs/toolkit";
import { postOrder,getOrders,getOrderDetails,cancellOrder } from "./orderAction";


const initialState={
    orderData:[],
    orderDetail:[],
    loading:false,
    success:null,
    totalPages: 1,
    error:null,
}

const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(postOrder.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(postOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload;
            state.error=null
        })
        .addCase(postOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'create order failed'
            console.log(state.error);
            
        })


        .addCase(getOrders.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderData=action.payload;
            state.totalPages = action.payload.totalPages;
            state.error=null
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'failed to fetch orders'
        })


        .addCase(getOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetail=action.payload;
            state.error=null
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'failed to fetch order details'
        })


        .addCase(cancellOrder.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(cancellOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload||'order cancell success'
        })
        .addCase(cancellOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'cancel order failed'
        })
    }
})

export default orderSlice.reducer