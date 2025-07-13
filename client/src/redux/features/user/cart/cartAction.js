import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";

export const addToCart=createAsyncThunk('user/addToCart',async({ productId, quantity,size },{rejectWithValue})=>{
    try {
        console.log('inside addToCart Action');
        
        const res=await api.post('/user/addToCart',{productId,quantity,size})
        
        return res.data
    } catch (error) {
         return rejectWithValue(error.response?.data?.message || "Failed to fetch Cart Items");
    }
})

export const getCartItems=createAsyncThunk('user/getCartItems',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/getCartItems')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch Cart Items");
    }
})

export const updateQuantity=createAsyncThunk('user/updateQuantity',async({productId,size,quantity},{rejectWithValue})=>{
    try {
        const res=await api.put('/user/updateItemQuantity',{productId,size,quantity})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update item Quantity");
    }
})