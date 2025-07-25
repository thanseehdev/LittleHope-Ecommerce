import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/axios'
import { setSuccessMessage,setErrorMessage } from './message'

export const registerUser=createAsyncThunk('auth/register',async(userData,{dispatch})=>{
    console.log('inside register user action')
    try {
        const res = await api.post('/user/register',userData)
        dispatch(setSuccessMessage('Registration successful!'))
        return res.data 
    } catch (error) {
         const msg = error.response?.data?.message || "Registration failed";
         dispatch(setErrorMessage(msg));
    }
})

export const verifyOTP=createAsyncThunk('auth/verifyOTP',async(userData,{rejectWithValue})=>{
    console.log('inside verify action')
    try {
        const res= await api.post("/user/verify-otp",userData)
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const login=createAsyncThunk('auth/login',async(userData,{dispatch})=>{
    console.log('inside login action');
    try {
        const res=await api.post("/user/login",userData)
        dispatch(setSuccessMessage('Login successful!'))
        return res.data.user
    } catch (error) {
        const msg = error.response?.data?.message || "Login failed";
         dispatch(setErrorMessage(msg));
    }
    
})

export const loadUser=createAsyncThunk('user/loadUser',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get("/user/me")
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'Something went wrong')
    }
})

export const FPEmailOtp=createAsyncThunk('user/FPEmailOtp',async(userData,{rejectWithValue})=>{
    try {
        const res=await api.post('/user/FPEmailOtp',userData)
        return res.data.message
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'FPEmailOtp action failed')
    }
})

export const verifyFPOTP=createAsyncThunk('user/verifyFPOTP',async(userData,{rejectWithValue})=>{
    try {
        const res=await api.post('/user/verifyFPOTP',userData)
        return res.data.message
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'verifyFPOTP action failed')
    }
})

export const conFirmForgetPassword=createAsyncThunk('user/conFirmForgetPassword',async(userData,{rejectWithValue})=>{
    try {
        const res=await api.post('/user/conFirmForgetPassword',userData)
        return res.data.message
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'verifyFPOTP action failed')
    }
})

export const logoutUser=createAsyncThunk('user/logoutUser',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/logout')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message||'logout failed')
    }
})