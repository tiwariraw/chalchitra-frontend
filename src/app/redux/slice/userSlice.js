import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	profile: null,
	loading: false,
	error: null
};

export const fetchUserProfile = createAsyncThunk(
	"user/fetchProfile", // Unique action type
	async (_, { rejectWithValue }) => { // Use rejectWithValue for errors
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
			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}
			const json = await response.json(); // Let Redux Toolkit handle the state update
			console.log('...', json)
			return json
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateAvatar = createAsyncThunk(
	"user/updateAvatar", // Unique action type
	async (avatar, { rejectWithValue }) => { // Accept avatar directly
		try {
			const formData = new FormData();
			formData.append("avatar", avatar);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}user/updateAvatar`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: formData // Send as FormData
				}
			);
			if (!response.ok) {
				throw new Error("Avatar update failed");
			}
			return await response.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.profile = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Handle fetchUserProfile
			.addCase(fetchUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Handle updateAvatar
			.addCase(updateAvatar.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateAvatar.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = { ...state.profile, ...action.payload };
			})
			.addCase(updateAvatar.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;