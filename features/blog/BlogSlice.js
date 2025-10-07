import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPost: null,
  status: "idle",
  error: null,
};

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/blogs", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "blog/createArticle",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const fetchBlogPostById = createAsyncThunk(
  "blog/fetchBlogPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "blog/editPost",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updates,
          author: {
            name: updates.authorName,
            avatar: updates.authorAvatar,
            bio: updates.authorBio,
          },
          tags: updates.tags.split(",").map((tag) => tag.trim()),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return id; // Return the deleted post ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch blog posts";
      })
      .addCase(createArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create article";
      })
      .addCase(fetchBlogPostById.pending, (state) => {
        state.status = "loading";
        state.currentPost = null;
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch blog post";
        state.currentPost = null;
      })
      .addCase(editPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to edit post";
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete post";
      });
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;