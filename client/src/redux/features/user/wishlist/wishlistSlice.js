import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, getWishItem, removeWishItem } from "./wishlistAction";

const initialState = {
    items: [],
    loading: false,
    error: null,
    success: '',
    message:null

}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
      reducers: {
    clearMessage(state) {
      state.message = null;  // Action to clear message after showing
    }
  },
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.message=action.payload.message
                state.success = action.payload || 'item added to wishlist'
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'failed  adding to wishlist'
            })


            .addCase(getWishItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
                console.log(state.items);
                
            })

            .addCase(getWishItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'failed to fetch wishlist items'
            })


            .addCase(removeWishItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeWishItem.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload || 'item removed success'
            })
            .addCase(removeWishItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'failed to remove item from wishlist'
            })
    }
})

export const { clearMessage } = wishlistSlice.actions;
export default wishlistSlice.reducer