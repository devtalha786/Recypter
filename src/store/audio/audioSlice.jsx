import { createSlice } from "@reduxjs/toolkit";
import { fetchAudio, fetchVideos } from "./audioThunk";

const initialState = {
  items: [],
  videoItems:[],
  loader: false, 
  vidloader:false,
  error: null
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch audio
      .addCase(fetchAudio.pending, (state) => {
        state.loader = true
        state.error = null;
      })
      .addCase(fetchAudio.fulfilled, (state, action) => {
        state.loader = false;
        state.items = action.payload;
      })
      .addCase(fetchAudio.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload || 'Failed to fetch audio';
      })
      .addCase(fetchVideos.pending, (state) => {
        state.vidloader = true; // Set loader to true while fetching
        state.error = null;  // Clear any previous errors
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.vidloader = false; // Set loader to false when fetching is complete
        state.videoItems = action.payload; // Store the fetched video data in 'items'
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.vidloader = false; // Set loader to false when there is an error
        state.error = action.payload || 'Failed to fetch videos'; // Set error message
      });
     
  }
});

export default audioSlice.reducer;