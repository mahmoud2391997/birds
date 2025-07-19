import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const BASE_URL = "https://hires-lab.glitch.me/api/articles";

// Fetch all articles
export const fetchArticles = createAsyncThunk(
  "blog/fetchArticles",
  async (_, thunkAPI) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(BASE_URL, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fetch articles failed:", {
          status: res.status,
          statusText: res.statusText,
          responseText: errorText,
        });
        throw new Error(
          `Failed to fetch articles: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Fetched articles:", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch a single article by ID
export const fetchSingleArticle = createAsyncThunk(
  "blog/fetchSingleArticle",
  async (id, thunkAPI) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`${BASE_URL}/${id}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fetch single article failed:", {
          status: res.status,
          statusText: res.statusText,
          responseText: errorText,
        });
        throw new Error(
          `Failed to fetch article: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Fetched single article:", data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching single article:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a new article
export const createArticle = createAsyncThunk(
  "blog/createArticle",
  async (formData, thunkAPI) => {
    try {
      const token = Cookies.get("token");

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Create article failed:", {
          status: res.status,
          statusText: res.statusText,
          responseText: errorText,
        });
        throw new Error(
          `Failed to create article: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Created article:", data.data);
      return data.data;
    } catch (error) {
      console.error("Error creating article:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update an existing article
export const updateArticle = createAsyncThunk(
  "blog/updateArticle",
  async ({ id, articleData }, thunkAPI) => {
    try {
      const token = Cookies.get("token");

      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Update article failed:", {
          status: res.status,
          statusText: res.statusText,
          responseText: errorText,
        });
        throw new Error(
          `Failed to update article: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Updated article:", data.data);
      return { id, updatedArticle: data.data };
    } catch (error) {
      console.error("Error updating article:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete an article
export const deleteArticle = createAsyncThunk(
  "blog/deleteArticle",
  async (id, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Delete article failed:", {
          status: res.status,
          statusText: res.statusText,
          responseText: errorText,
        });
        throw new Error(
          `Failed to delete article: ${res.status} ${res.statusText}`
        );
      }

      console.log("Deleted article:", id);
      return id;
    } catch (error) {
      console.error("Error deleting article:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch dynamic categories
export const fetchCategories = createAsyncThunk(
  "blog/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let articles = state.blog.articles;
      if (articles.length === 0) {
        const result = await thunkAPI.dispatch(fetchArticles()).unwrap();
        articles = result;
      }
      const categories = [
        ...new Set(articles.map((article) => article.category).filter(Boolean)),
      ];
      console.log("Fetched categories:", categories);
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch dynamic tags
export const fetchTags = createAsyncThunk(
  "blog/fetchTags",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let articles = state.blog.articles;
      if (articles.length === 0) {
        const result = await thunkAPI.dispatch(fetchArticles()).unwrap();
        articles = result;
      }
      const tags = [
        ...new Set(
          articles.flatMap((article) => article.tags || []).filter(Boolean)
        ),
      ];
      console.log("Fetched tags:", tags);
      return tags;
    } catch (error) {
      console.error("Error fetching tags:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch dynamic authors
export const fetchAuthors = createAsyncThunk(
  "blog/fetchAuthors",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let articles = state.blog.articles;
      if (articles.length === 0) {
        const result = await thunkAPI.dispatch(fetchArticles()).unwrap();
        articles = result;
      }
      const uniqueAuthors = [];
      const seen = new Set();
      for (const article of articles) {
        if (article.writer?.name) {
          const writer = {
            name: article.writer.name.trim(),
            image:
              article.writer.image || "/placeholder.svg?height=100&width=100",
            about: article.writer.about || "No bio available",
          };
          const writerKey = JSON.stringify(writer);
          if (!seen.has(writerKey)) {
            seen.add(writerKey);
            uniqueAuthors.push(writer);
          } else {
            console.warn(`Duplicate author detected: ${writer.name}`, writer);
          }
        }
      }
      console.log("Fetched authors:", uniqueAuthors);
      return uniqueAuthors;
    } catch (error) {
      console.error("Error fetching authors:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  articles: [],
  singleArticle: null,
  categories: [],
  tags: [],
  authors: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearSingleArticle: (state) => {
      state.singleArticle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Articles
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Article
      .addCase(fetchSingleArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleArticle = null;
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.singleArticle = action.payload;
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Article
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.push(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Article
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedArticle } = action.payload;
        const index = state.articles.findIndex((article) => article._id === id);
        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }
        if (state.singleArticle && state.singleArticle._id === id) {
          state.singleArticle = updatedArticle;
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Article
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.articles = state.articles.filter((article) => article._id !== id);
        if (state.singleArticle && state.singleArticle._id === id) {
          state.singleArticle = null;
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Authors
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSingleArticle } = blogSlice.actions;
export default blogSlice.reducer;
