// src/redux/slices/resetPasswordSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://hires-lab.glitch.me/api/auth/reset-password';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword', 
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}`, { email });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
