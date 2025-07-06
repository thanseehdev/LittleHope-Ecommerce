import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import api from '../../../api/axios'

export const registerUser=createAsyncThunk('auth/register',async(userData,{rejectWithValue})=>{
    console.log('inside register user action')
    try {
        const res = await api.post('/auth/register',userData)
        return res.data 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')

    }
})

export const verifyOTP=createAsyncThunk('auth/verifyOTP',async(userData,{rejectWithValue})=>{
    console.log('inside verify action')
    try {
        const res= await api.post("/auth/verify-otp",userData)
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const login=createAsyncThunk('auth/login',async(userData,{rejectWithValue})=>{
    console.log('inside login action');
    try {
        const res=await api.post("/auth/login",userData)
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'Something went wrong')
    }
    
})

export const loadUser=createAsyncThunk('auth/loadUser',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get("/auth/me")
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'Something went wrong')
    }
})