import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../../api/axios'

export const productDetail=createAsyncThunk('product/detail',async(id,{rejectWithValue})=>{
    try {
        
        const res=await api.get(`/user/productDetail/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "fetching product detail failed");
    }
})