import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "../../functions/urls/backendAPI";

const initialState = {
  loggedIn: false,
  user: null,
};

const fetchLoginStatus = createAsyncThunk("fetchLoginStatus", async () => {
  const response = await fetch(`${usersURL}/auth`);
  const data = await response.json();

  if (data.success) {
    return {
      success: true,
      user: data.user,
    };
  } else
    return {
      success: false,
      user: null,
    };
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginStatus.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.user = action.payload.user; // ✅ assign data
    });
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

const authSelector = (state) => state.auth;

export { authActions, authReducer, authSelector, fetchLoginStatus };
