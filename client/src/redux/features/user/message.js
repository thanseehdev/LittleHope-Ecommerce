import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      state.message = action.payload;
      state.error = null;
    },
    setErrorMessage: (state, action) => {
      state.error = action.payload;
      state.message = null;
    },
    clearMessages: (state) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const { setSuccessMessage, setErrorMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;

