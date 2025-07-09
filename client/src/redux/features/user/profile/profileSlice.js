import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./profileAction";

const initialState={
    profileUser:null,
    loading:false,
    error:null
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProfile.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.profileUser=action.payload
            state.error=null
        })
        .addCase(getProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default profileSlice.reducer