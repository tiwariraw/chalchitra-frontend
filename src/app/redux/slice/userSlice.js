import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	profile: null,
};

export const fetchUserProfile = createAsyncThunk(
	"user/profile",
	async (arg, { dispatch }) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}user/profile`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			const userDetails = await response.json();
			dispatch(setUser(userDetails));
			console.log(userDetails, "userDetails");
			// const data = await response.json()
			// console.log(data,"data")
			return userDetails;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateProfile = createAsyncThunk(
	"user/profile",
	async (arg, { dispatch }) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}user/updateProfile`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON?.stringify({ name: arg.name, email: arg.email })
				}
			);
			const userDetails = await response.json();
			dispatch(setUser(userDetails));
			console.log(userDetails, "userDetails");
			// const data = await response.json()
			// console.log(data,"data")
			return userDetails;
		} catch (error) {
			console.log(error);
		}
	}
);

//Creation of Auth Slice with initial state and reducers
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.profile = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;