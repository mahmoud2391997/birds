import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const subscribe = createAsyncThunk(
  "subscribe/postNewsletter",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch("https://hires-lab.glitch.me/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
        
      });
      // console.log(JSON.stringify({email:`${emailData}`}));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed");
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const subScribeSlice = createSlice({
  name: "subscribe",
  //stata
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
  resetSubscribeState: (state) => {
    state.loading = false;
    state.success = false;
    state.error = null;
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});
export const { resetSubscribeState } = subScribeSlice.actions;
export default subScribeSlice.reducer;
