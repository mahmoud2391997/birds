import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const subscribeToNewsletter = createAsyncThunk(
  "newsletter/subscribeToNewsletter",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://hires-lab.glitch.me/api/subscribe",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to subscribe to newsletter"
      );
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    status: "idle",
    error: null,
    subscribedEmail: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSubscription: (state) => {
      state.status = "idle";
      state.error = null;
      state.subscribedEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subscribedEmail = action.payload.email || action.payload;
        state.error = null;
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, resetSubscription } = newsletterSlice.actions;
export default newsletterSlice.reducer;
