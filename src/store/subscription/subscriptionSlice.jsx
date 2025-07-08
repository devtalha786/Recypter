import { createSlice } from "@reduxjs/toolkit";
import { getReceipts } from "./subscriptionThunk";
import { getPapers } from "./subscriptionThunk";
import { getEmulators } from "./subscriptionThunk";

const initialState = {
  receipts: [],
  isLoading: false,
  error: null,
  papers: [],
  emulators: [],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearReceipts: (state) => {
      state.receipts = [];
      state.error = null;
      state.papers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReceipts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.receipts = action.payload;
      })
      .addCase(getReceipts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch receipts';
      })
      .addCase(getPapers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPapers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.papers = action.payload;
      })
      .addCase(getPapers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch papers';
      })
      .addCase(getEmulators.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEmulators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emulators = action.payload;
      })
      .addCase(getEmulators.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch emulators';
      })
  }
});

export const { clearReceipts } = subscriptionSlice.actions;
export default subscriptionSlice.reducer; 