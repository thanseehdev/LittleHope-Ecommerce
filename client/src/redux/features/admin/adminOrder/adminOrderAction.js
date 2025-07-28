import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios"


export const getAllOrders=createAsyncThunk('admin/getOrders',async({page,limit},{rejectWithValue})=>{
    try {
        const res=await api.get(`/admin/getAllOrders?page=${page}&limit=${limit}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to fetch allOrders")
    }
})

export const getOrderDetails=createAsyncThunk('admin/getOrderDetails',async(id,{rejectWithValue})=>{
    try {
        const res=await api.get(`/admin/getOrderDetails/${id}`)
        return res.data
    } catch (error) {
         return rejectWithValue(error.response?.data?.message || "failed to fetch orderDetails")
    }
})

export const updateOrderStatus=createAsyncThunk('admin/updateOrderStatus',async({orderId,Ostatus},{rejectWithValue})=>{
    try {
        const res=await api.put('/admin/updateOrderStatus',{orderId,Ostatus})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to fetch orderDetails")
    }
})