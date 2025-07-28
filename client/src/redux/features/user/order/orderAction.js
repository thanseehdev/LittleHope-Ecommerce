import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { setSuccessMessage,setErrorMessage } from "../message";


export const postOrder=createAsyncThunk('user/postOrder',async(orderData,{rejectWithValue,dispatch})=>{
    try {
        console.log('inside postOrder action');
        const res=await api.post('/user/createOrder',orderData)
        return res.data
    } catch (error) {
        const msg=error.response?.data?.message || "Failed to Create Order"
        dispatch(setErrorMessage(msg))
        return rejectWithValue()
    }
})

export const getOrders=createAsyncThunk('user/getOrders',async({ page, limit },{rejectWithValue})=>{
    try {
        console.log('inside get Orders')
        const res=await api.get(`/user/getOrders?page=${page}&limit=${limit}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch Orders");
    }
})

export const getOrderDetails=createAsyncThunk('user/getOrderDetails',async(orderId,{rejectWithValue})=>{
    try {
        console.log('inside get OrderDetails action')
        const res=await api.get(`/user/orderDetails/${orderId}`)
        return res.data
        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to get order details");
    }
})

export const cancellOrder=createAsyncThunk('user/cancellOrder',async(orderId,{rejectWithValue})=>{
    try {
        console.log('inside cancellOrder action')
        const res=await api.put(`/user/cancellOrder/${orderId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to cancell order");
    }
})