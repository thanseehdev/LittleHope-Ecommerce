import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./allProductAction";

const initialState = {
    loading: false,
    items: [],
    error: null,
    totalPages: 1,
    currentPage: 1,
}

const fetchAllproductSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.error = null;
            })

            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default fetchAllproductSlice.reducer