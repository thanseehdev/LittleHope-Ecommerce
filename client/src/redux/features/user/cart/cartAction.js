import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/axios";
import { setSuccessMessage,setErrorMessage } from "../message";

export const addToCart = createAsyncThunk('user/addToCart', async ({ productId, quantity, size }, { rejectWithValue }) => {
    try {
        console.log('inside addToCart Action');

        const res = await api.post('/user/addToCart', { productId, quantity, size })

        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch Cart Items");
    }
})

export const getCartItems = createAsyncThunk('user/getCartItems', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/user/getCartItems')
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch Cart Items");
    }
})

export const updateQuantity = createAsyncThunk('user/updateQuantity', async ({ productId, size, quantity }, { dispatch }) => {
    try {
        const res = await api.put('/user/updateItemQuantity', { productId, size, quantity })
        dispatch(setSuccessMessage('Quantity changed'))
        return res.data
    } catch (error) {
        const msg=error.response?.data?.message || "Failed to update item Quantity"
        dispatch(setErrorMessage(msg))
    }
})

export const removeFromCart = createAsyncThunk('user/removeFromCart', async ({ productId, size }, { rejectWithValue }) => {
    console.log('inside removecart action');

    try {
        const res = await api.delete('/user/removeFromCart', {data: { productId, size }})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to remove item from cart");
    }
})