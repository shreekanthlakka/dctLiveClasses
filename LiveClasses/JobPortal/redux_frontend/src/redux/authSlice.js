import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createProfile,
    getCurrentLoggedInUser,
    getProfile,
    loginApi,
    logoutApi,
    updateProfile,
} from "../services/userService";

const initialState = {
    userAccount: {},
    isLoading: false,
    error: "",
    isAuthenticated: false,
    isLoggedIn: false,
    profile: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userAccount = action.payload;
                state.isLoading = false;
                state.isLoggedIn = true;
                state.error = "";
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.userAccount = {};
                state.isLoggedIn = false;
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(currentLoggedInUserDetails.pending, function (state) {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(
                currentLoggedInUserDetails.fulfilled,
                function (state, action) {
                    state.isLoading = false;
                    state.isLoggedIn = true;
                    state.userAccount = action.payload.user;
                    state.isAuthenticated = action.payload.isAuthenticated;
                }
            )
            .addCase(
                currentLoggedInUserDetails.rejected,
                function (state, action) {
                    state.isLoading = false;
                    state.error = action.payload;
                    state.userAccount = {};
                    state.isLoggedIn = false;
                    state.isAuthenticated = false;
                }
            )
            .addCase(userLogout.pending, function (state) {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(userLogout.fulfilled, function (state) {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.userAccount = {};
                state.isAuthenticated = false;
                state.error = "";
            })
            .addCase(userLogout.rejected, function (state, action) {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(userProfile.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload.data;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = "";
                state.success = false;
            })
            .addCase(createUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload.data;
                state.success = true;
            })
            .addCase(createUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = "";
                state.success = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload.data;
                state.success = true;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const userLogin = createAsyncThunk(
    "user/login",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await loginApi(formData);
            if (!res.success) {
                throw new Error("Login credials gone wrong");
            } else {
                return res.user;
            }
        } catch (error) {
            // console.log("Error in catch BLOCK==>", error);
            return rejectWithValue(error.message);
        }
    }
);

export const currentLoggedInUserDetails = createAsyncThunk(
    "user/currentLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getCurrentLoggedInUser();
            if (!res.success) {
                throw new Error("Login credentials gone wrong");
            } else {
                return {
                    user: res.data,
                    isAuthenticated: res.isAuthenticated,
                };
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userLogout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await logoutApi();
            if (!res.success) {
                throw new Error("Logout gone wrong");
            } else {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userProfile = createAsyncThunk(
    "user/profile",
    async (role, { rejectWithValue }) => {
        try {
            const res = await getProfile(role);
            if (!res.success) {
                throw new Error("failed to get profile");
            } else {
                return res;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async ({ role, formData }, { rejectWithValue }) => {
        try {
            console.log("ROLE ++==>", role, "FORMDATA UPDATE ==>", formData);
            const res = await updateProfile(role, formData);
            console.log("UPDATE PROFILE  RES ", res);
            if (!res.success) {
                throw new Error("failed to update profile");
            } else {
                return res;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createUserProfile = createAsyncThunk(
    "user/createProfile",
    async ({ role, formData }, { rejectWithValue }) => {
        try {
            const res = await createProfile(role, formData);
            if (!res.success) {
                throw new Error("failed to get profile");
            } else {
                return res;
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export default userSlice.reducer;
