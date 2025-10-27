import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "../../functions/urls/backendAPI";
import { imagesURL } from "../../functions/urls/cloudinary";

const initialState = {
  loggedIn: false,
  user: null,
  token: null,
  updateProfileDiv: false,
};

const fetchLoginStatus = createAsyncThunk("fetchLoginStatus", async () => {
  const response = await fetch(`${usersURL}/auth`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  if (data.success) {
    return {
      success: true,
      user: { ...data.user, profilePic: `${imagesURL}/${data.user._id}` },
      token: data.token,
    };
  } else
    return {
      success: false,
      user: null,
      token: null,
    };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfilePic: (state, action) => {
      state.user.profilePic = action.payload;
      state.updateProfileDiv = false;
    },
    setAuth: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
    },
    setUpdateProfileDiv: (state, action) => {
      state.updateProfileDiv = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginStatus.fulfilled, (state, action) => {
      state.loggedIn = action.payload.success;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

const authSelector = (state) => state.auth;

export { authActions, authReducer, authSelector, fetchLoginStatus };
