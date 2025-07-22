import { createSlice } from "@reduxjs/toolkit";
import { newArrivals, fetchSearchResults } from "./newArrivalAction";

const initialState = {
    query: "",
    results: [],
    products: [],
    loading: false,
    error: null,
}

const newArrivalSlice = createSlice({
    name: 'newArrival',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(newArrivals.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(newArrivals.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
                state.error = null
            })
            .addCase(newArrivals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { setQuery } = newArrivalSlice.actions;
export default newArrivalSlice.reducer;
