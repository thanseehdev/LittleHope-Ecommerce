import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../../api/axios'

export const newArrivals=createAsyncThunk('newArrival/product',async(_,{rejectWithValue})=>{
    try {
        console.log('inside new arrival action');
        
        const res=await api.get('/user/newArrivals')
        return res.data
    } catch (error) {
        console.log('newArrival error',error);
        
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})