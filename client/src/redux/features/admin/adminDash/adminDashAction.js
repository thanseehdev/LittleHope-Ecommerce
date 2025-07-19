import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../../api/axios'

export const getDashData=createAsyncThunk('admin/getDashData',async(_,{rejectWithValue})=>{
    try {
        const res=await api.get('/admin/getDashData')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to fetch Dash Data")
    }
})