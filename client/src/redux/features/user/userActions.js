import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/axios'
import { setSuccessMessage,setErrorMessage } from './message'

export const registerUser=createAsyncThunk('auth/register',async(userData,{dispatch,rejectWithValue})=>{
    console.log('inside register user action')
    try {
        const res = await api.post('/user/register',userData)
        dispatch(setSuccessMessage('Please wait, redirecting to OTP'))
        return res.data 
    } catch (error) {
         const msg = error.response?.data?.message || "Registration failed";
         dispatch(setErrorMessage(msg));
          return rejectWithValue(msg);
    }
})

export const verifyOTP=createAsyncThunk('auth/verifyOTP',async(userData,{dispatch,rejectWithValue})=>{
    console.log('inside verify action')
    try {
        const res= await api.post("/user/verify-otp",userData)
        dispatch(setSuccessMessage('Registration successful. Welcome'))
        return res.data.user
    } catch (error) {
         const msg = error.response?.data?.message || "Registration failed";
         dispatch(setErrorMessage(msg));
         return rejectWithValue(msg);
    }
})

export const login=createAsyncThunk('auth/login',async(userData,{dispatch,rejectWithValue})=>{
    console.log('inside login action');
    try {
        const res=await api.post("/user/login",userData)
        dispatch(setSuccessMessage('You’ve successfully logged in.'))
        return res.data.user
    } catch (error) {
        const msg = error.response?.data?.message || "Login failed";
         dispatch(setErrorMessage(msg));
         return rejectWithValue(msg);
    }
    
})

export const loadUser=createAsyncThunk('user/loadUser',async(_,{dispatch,rejectWithValue})=>{
    try {
        const res=await api.get("/user/me")
        dispatch(setSuccessMessage('Welcome Back'))
        return res.data.user
    } catch (error) {
         const msg = error.response?.data?.message
         dispatch(setErrorMessage(msg));
         return rejectWithValue();
    }
})

export const FPEmailOtp=createAsyncThunk('user/FPEmailOtp',async(userData,{dispatch,rejectWithValue})=>{
    try {
        const res=await api.post('/user/FPEmailOtp',userData)
        dispatch(setSuccessMessage('An OTP has been sent to your email.'))
    } catch (error) {
        const msg = error.response?.data?.message || "Failed To Send Otp";
        console.log('FB'+msg);
        
         dispatch(setErrorMessage(msg));
         return rejectWithValue(msg);
    }
})

export const verifyFPOTP=createAsyncThunk('user/verifyFPOTP',async(userData,{dispatch,rejectWithValue})=>{
    try {
        const res=await api.post('/user/verifyFPOTP',userData)
        dispatch(setSuccessMessage('OTP verified successfully'))
    } catch (error) {
         const msg = error.response?.data?.message || "Otp Verification Failed";
         dispatch(setErrorMessage(msg));
         return rejectWithValue(msg);
    }
})

export const conFirmForgetPassword=createAsyncThunk('user/conFirmForgetPassword',async(userData,{dispatch,rejectWithValue})=>{
    try {
        const res=await api.post('/user/conFirmForgetPassword',userData)
        dispatch(setSuccessMessage('You’ve successfully updated your password.'))
    } catch (error) {
        const msg = error.response?.data?.message || "Failed to change Password";
        dispatch(setErrorMessage(msg));
        return rejectWithValue(msg);
    }
})

export const logoutUser=createAsyncThunk('user/logoutUser',async(_,{dispatch,rejectWithValue})=>{
    try {
        const res=await api.get('/user/logout')
        dispatch(setSuccessMessage('Logout Successful'))
    } catch (error) {
         const msg = error.response?.data?.message || "Failed ";
        dispatch(setErrorMessage(msg));
        return rejectWithValue(msg);
    }
})