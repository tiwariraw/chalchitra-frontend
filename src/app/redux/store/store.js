"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";
import movieReducer from "../slice/movieSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		movie: movieReducer
	}
});