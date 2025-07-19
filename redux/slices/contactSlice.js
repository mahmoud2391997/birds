import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to submit contact form
export const submitContact = createAsyncThunk(
  "contact/submitContact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://hires-lab.glitch.me/api/contacts/",
        {
          method: "POST",
          body: formData, // Send FormData directly
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
