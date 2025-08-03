import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { setSuccessMessage,setErrorMessage } from "../message";

export const addToWishlist=createAsyncThunk('user/addToWishlist',async(ProductId,{rejectWithValue,dispatch})=>{
    try {
        const res = await api.post(`/user/addToWishlist/${ProductId.ProductId}`);
        dispatch(setSuccessMessage('Added to wishlist successfully.'))
        return res.data
    } catch (error) {
         const msg = error.response?.data?.message || " Please try again";
        dispatch(setErrorMessage(msg))
        return rejectWithValue(msg)
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
  
    try {
        const res=await api.delete(`/user/removeWishItem/${ProductId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to remove item from wishlist");
    }
})