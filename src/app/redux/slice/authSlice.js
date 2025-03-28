import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
	"auth/login",
	async (formData, thunkAPI) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
						firebaseUid: formData.firebaseUid,
					}),
				}
			);
			const loginUser = await response.json();
			thunkAPI.dispatch(login(loginUser));
			return loginUser;
		} catch (error) {
			console.error(error);
		}
	}
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (formData, thunkAPI) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}auth/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: formData?.name,
						email: formData.email,
						password: formData.password,
					}),
				}
			);
			const registerUser = await response.json();
			thunkAPI.dispatch(logout(registerUser));
			return registerUser;
		} catch (error) {
			console.error(error);
		}
	}
);

//Creation of Auth Slice with initial state and reducers
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		//login  reducer that takes the previous state and updates the state in the reducer
		login: (state, action) => {
			state.user = {
				email: action.payload.user.email,
			};
			state.token = action.payload.token;
			state.isAuthenticated = true;
			localStorage.setItem("token", action.payload.token);
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			localStorage.removeItem("token");
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
