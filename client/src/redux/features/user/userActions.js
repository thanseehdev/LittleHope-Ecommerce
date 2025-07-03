import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios';

export const registerUser=createAsyncThunk('user/register',async(userData,{rejectWithValue})=>{
    console.log('inside register user action')
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,userData)
        return res.data 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')

    }
})

export const verifyOTP=createAsyncThunk('user/verifyOTP',async(userData,{rejectWithValue})=>{
    console.log('inside verify action')
    try {
        const res= await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,userData)
        return res.data
    } catch (error) {
        return rejectWithValue(error.data.message)
    }
})