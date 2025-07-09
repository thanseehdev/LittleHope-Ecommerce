import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";


export const getProfile=createAsyncThunk('getProfile/',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/profile')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})