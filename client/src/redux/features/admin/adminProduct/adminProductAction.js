import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios"

export const createProduct = createAsyncThunk('product/create', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        }
        const res = await api.post('/admin/addProduct', formData, config)
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Product creation failed"
        )
    }
})

export const fetchAllProducts=createAsyncThunk('admin/fetchAllProducts',async(_,{rejectWithValue})=>{
    try {
        console.log('inside admin fetch product action');
        
        const res=await api.get('/admin/fetchAllProducts')
        return res.data.products
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Product fetch failed"
        )
    }
})

export const getEditProduct=createAsyncThunk('admin/getEditProduct',async(pId,{rejectWithValue})=>{
    try {
        console.log('inside getEditProduct action');
        
        const res=await api.get(`/admin/getEditProduct/${pId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "get editProduct failed"
        )
    }
})

export const updateProduct=createAsyncThunk('admin/updateProduct',async({id,formData},{rejectWithValue})=>{
    try {
        console.log('inside updateProduct',id);
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        }
        const res=await api.put(`/admin/updateProduct/${id}`,formData,config)
        return res.data
        
    } catch (error) {
        return rejectWithValue({ message: "Update failed due to X reason" });
    }
})