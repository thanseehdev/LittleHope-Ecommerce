import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";


export const fetchAllProducts=createAsyncThunk('/products/fetchAllproduct',async({ page, limit},{rejectWithValue})=>{
    try { 
        const res=await api.get(`/user/getAllproducts?page=${page}&limit=${limit}`)

        return res.data
    } catch (error) {
        console.log('fetchAllproduct error'+error);
        
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})