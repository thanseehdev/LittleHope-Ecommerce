import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, blockUser, deleteUser } from "./adminUserAction";

const initialState = {
    users: [],
    loading: false,
    error: null,
    successMessage: null
}

const adminUserSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetchUser
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null;
                state.successMessage = action.payload.successMessage
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //blockUser
            .addCase(blockUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.loading = false;
                const user = state.users.find(u => u._id === action.payload.userId);
                if (user) user.isBlocked = true;
            })

            .addCase(blockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export default adminUserSlice.reducer;