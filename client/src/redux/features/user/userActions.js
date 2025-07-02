import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios';

export const registerUser=createAsyncThunk('user/register',async(userData,{rejectWithValue})=>{
    try {
        const data = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,userData)
        return res.data 
    } catch (error) {
        return rejectWithValue(error.data.message)
    }
})

export const verifyOTP=createAsyncThunk('user/verifyOTP',async(userData,{rejectWithValue})=>{
    try {
        const data= await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,userData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.data.message)
    }
})