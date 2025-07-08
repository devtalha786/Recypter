import { createSlice } from "@reduxjs/toolkit";
import { loginWithGoogle, loginWithDiscord, addUser } from "./authThunk";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const initialState = {
  user: null,
  isLoading: false,
  error: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
  
      state.error = null;
      deleteCookie("user");
     
    },
    setUser: (state, action) => {
      const isUser = getCookie("user");
       let  user = isUser ? JSON.parse(isUser) : null;
      state.user = user ? user : null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        setCookie("user", action.payload);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to login with Google';
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload;
        // setCookie("user", action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to Add User';
      })
    
      .addCase(loginWithDiscord.fulfilled, (state, action) => {
        state.user = action.payload;
      
        setCookie("user", action.payload);
      })

      
  }
});

export const { logout,setUser } = authSlice.actions;
export default authSlice.reducer; 