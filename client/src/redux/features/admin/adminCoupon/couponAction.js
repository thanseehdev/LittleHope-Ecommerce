import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios"


export const addCoupon = createAsyncThunk('admin/addCoupon/', async (FormData, { rejectWithValue }) => {
    try {
        console.log('inside addCoupon action');
        
        const res = await api.post('/admin/addCoupon', FormData)
        return res.data
    } catch (error) {
        console.log('addCoupon action error'+error)
        return rejectWithValue(error.response?.data?.message || "Coupon creation failed")
    }
})

export const fetchCoupon = createAsyncThunk('admin/fetchCoupons', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/admin/getCoupon')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Fetch Coupon failed")
    }
})