import { createSlice } from "@reduxjs/toolkit";
import { registerUser,verifyOTP,login } from "./userActions";

const initialState = {
  loading: false,
  user: null,
  emailForOTP: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.emailForOTP = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.emailForOTP = action.payload.email;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(verifyOTP.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.emailForOTP=null;
        state.error=null;
      })
      .addCase(verifyOTP.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(login.pending,(state)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(login.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.error=null
      })
      .addCase(login.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
  }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;