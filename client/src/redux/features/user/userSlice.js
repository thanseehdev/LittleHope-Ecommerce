
import { createSlice } from "@reduxjs/toolkit";
import { registerUser, verifyOTP, resendOtp, login, loadUser, FPEmailOtp, verifyFPOTP, conFirmForgetPassword, logoutUser } from "./userActions";

const initialState = {
  loading: false,
  user: null,
  emailForOTP: null,
  isAuthenticated: false,
  success: false,

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

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.emailForOTP = action.payload.email;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.user = null
      })
      //---------------------------------------------------------------
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isAuthenticated = true;
        state.emailForOTP = null;
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.loading = false;
      })
      //---------------------------------------------------------------

      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state) => {
        state.loading = false;
        state.user = null
      })
      //---------------------------------------------------------------      
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      //---------------------------------------------------------------
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(FPEmailOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(FPEmailOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(FPEmailOtp.rejected, (state) => {
        state.loading = false;
      })


      .addCase(verifyFPOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyFPOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyFPOTP.rejected, (state) => {
        state.loading = false;
      })


      .addCase(conFirmForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(conFirmForgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(conFirmForgetPassword.rejected, (state) => {
        state.loading = false;
      })


      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;

      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer;