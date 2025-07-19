import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://hires-lab.glitch.me/api/review"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://hires-lab.glitch.me/api/review",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review"
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        `https://hires-lab.glitch.me/api/review/${id}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`https://hires-lab.glitch.me/api/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      console.error(error); // فقط أثناء التطوير
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      });
  },
});

export const { clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
