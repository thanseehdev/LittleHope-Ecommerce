import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../../api/axios'

export const newArrivals=createAsyncThunk('newArrival/product',async(_,{rejectWithValue})=>{
    try {
        
        const res=await api.get('/user/newArrivals')
        return res.data
    } catch (error) {
        console.log('newArrival error',error);
        
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})

export const fetchSearchResults=createAsyncThunk('product/fetchSearchResult',async(query,{rejectWithValue})=>{
    
    try {
        const res=await api.get(`/user/search?q=${query}`)
        return res.data
    } catch (error) {
        return rejectWithValue(err.response.data.message || "Search failed");
    }
})