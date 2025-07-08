import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import audioSlice from "./audio/audioSlice";
import requestSlice from "./request/requestSlice";
import authSlice from "./auth/authSlice";
import subscriptionSlice from "./subscription/subscriptionSlice";

const reducers = combineReducers({
  audio:audioSlice,
  auth: authSlice,
  request :requestSlice,
  subscription: subscriptionSlice,
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
