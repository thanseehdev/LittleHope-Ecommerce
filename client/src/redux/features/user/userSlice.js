import { createSlice } from "@reduxjs/toolkit";
import { registerUser, verifyOTP, login,loadUser } from "./userActions";

const initialState = {
  loading: false,
  user: null,
  emailForOTP: null,
  error: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.emailForOTP = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
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
//---------------------------------------------------------------
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.emailForOTP = null;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
//---------------------------------------------------------------
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true
        state.user = action.payload.user;
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
//---------------------------------------------------------------
      .addCase(loadUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(loadUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload
        state.isAuthenticated=true
      })
      .addCase(loadUser.rejected,(state,action)=>{
        state.loading=false;
        state.user=null;
        state.isAuthenticated=false;
        state.error=action.payload
      })
  }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;