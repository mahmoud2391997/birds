// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {jwt_decode} from "jwt-decode";

const BASE_URL = "https://hires-lab.glitch.me/api/auth/login";

// signIn thunk
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, userData);
      console.log( response.data)

      const { token, user } = response.data;

      Cookies.set("token", token, { expires: 7 }); 

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);



// initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token"); 
    },
    setUser: (state, action) => {
      // state.user = jwt_decode(action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
