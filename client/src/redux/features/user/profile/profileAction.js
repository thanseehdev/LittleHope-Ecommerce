import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";


export const getProfile=createAsyncThunk('user/getProfile',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/profile')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const getCoupon=createAsyncThunk('user/getCoupon',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/coupon')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const addAddress=createAsyncThunk('user/addAddress',async(formData,{rejectWithValue})=>{
    try {
        const res=await api.post('/user/addAddress',formData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const getAddress=createAsyncThunk('user/getAddress',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/getAddress')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const deleteAddress=createAsyncThunk('user/deleteAddress',async(addressId,{rejectWithValue})=>{
    try {
        
        const res=await api.delete(`/user/deleteAddress/${addressId}`)
        return {addressId}
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})