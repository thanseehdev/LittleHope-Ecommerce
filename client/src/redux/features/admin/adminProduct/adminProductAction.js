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