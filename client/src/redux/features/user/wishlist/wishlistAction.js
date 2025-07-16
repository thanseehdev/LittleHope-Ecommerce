import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";

export const addToWishlist=createAsyncThunk('user/addToWishlist',async(ProductId,{rejectWithValue})=>{
    try {
        console.log(ProductId.ProductId);
        
        const res = await api.post(`/user/addToWishlist/${ProductId.ProductId}`);

        return res.data
    } catch (error) {
         return rejectWithValue(error.response?.data?.message || "added to wishlist failed");
    }
})

export const getWishItem=createAsyncThunk('user/getWishItem',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/getWishItem')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to fetch wishlist item");
    }
})

export const removeWishItem=createAsyncThunk('user/removeWishItem',async(ProductId,{rejectWithValue})=>{
    console.log('inside remove wish action');
    
    try {
        const res=await api.delete(`/user/removeWishItem/${ProductId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to remove item from wishlist");
    }
})