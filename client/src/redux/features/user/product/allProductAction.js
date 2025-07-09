import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";


export const fetchAllProducts=createAsyncThunk('/products/fetchAllproduct',async(_,{rejectWithValue})=>{
    try { 
        const res=await api.get('/user/getAllproducts')

        return res.data
    } catch (error) {
        console.log('fetchAllproduct error'+error);
        
        return rejectWithValue(error.response?.data?.message || 'Something went wrong')
    }
})