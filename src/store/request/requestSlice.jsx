import { createSlice } from "@reduxjs/toolkit";
import { createFormSubmission } from "./requestThunk";

const initialState = {
  submissions: [],
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFormSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFormSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions.push(action.payload);
      })
      .addCase(createFormSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestSlice.reducer;