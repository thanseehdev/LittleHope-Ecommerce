import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../../api/axios"

export const fetchAllUsers=createAsyncThunk("admin/fetchAllUsers",async({page,limit},{rejectWithValue})=>{
    try {
        const res=await api.get(`/admin/getUsers?page=${page}&limit=${limit}`)
        return res.data
    } catch (error) {
         return rejectWithValue(error.response?.data?.message || "Error loading users");
    }
})

export const deleteUser=createAsyncThunk('admin/deleteUser',async(userId,{rejectWithValue})=>{
    try {
        const res=await api.delete(`/admin/user/${userId}`)
        return {userId,message:res.data.message}
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
})

export const blockUser=createAsyncThunk('admin/blockUser',async(userId,{rejectWithValue})=>{
    try {
        const res=await api.put(`/admin/user/${userId}/block`)
        return {userId,message:res.data.message}
    } catch (error) {
         return rejectWithValue(error.response?.data?.message || "Block failed");
    }
})

export const unblockUser=createAsyncThunk('admin/unblockUser',async(userId,{rejectWithValue})=>{
    try {
        const res=await api.put(`/admin/user/${userId}/unBlock`)
        return {userId,message:res.data.message}
    } catch (error) {
         return rejectWithValue(error.response?.data?.message || "UnBlock failed");
    }
})