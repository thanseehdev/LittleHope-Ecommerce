import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./userActions";

const initialState = {
    loading: false,
    user: null,
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
        state.user = null
        state.emailForOTP = action.payload.user.email;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;