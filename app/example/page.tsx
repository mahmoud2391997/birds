"use client";

import { useState, useEffect } from "react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  category?: string;
  author?: {
    name?: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  readTime?: string;
  tags: string[];
  status: string;
  featured: boolean;
  views: number;
  imageUrl?: string;
  image?:string;
}

interface User {
  email: string;
  role: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export default function BlogForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setShowAuthPopup(false);
      fetchBlogs();
    } else {
      setShowAuthPopup(true);
    }
  }, []);

  async function fetchBlogs() {
    try {
      setLoadingBlogs(true);
      const token = localStorage.getItem("authToken");
      
      const res = await fetch("/api/blogs", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          // Token expired or invalid
          handleLogout();
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Blogs data:", data);
      
      // Process blogs to handle base64 images
      const processedBlogs = (data.posts || data || []).map((blog: Blog) => ({
        ...blog,
        imageUrl: blog.image
          
      }));
      
      setBlogs(processedBlogs);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setMessage("❌ Failed to load blogs");
    } finally {
      setLoadingBlogs(false);
    }
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setMessage("");

    try {
      const endpoint = isLogin ? "/api/authentication/signin" : "/api/authentication/signup";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const data: AuthResponse = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Save token and user data to localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      
      setUser(data.user);
      setShowAuthPopup(false);
      setMessage(`✅ ${data.message}`);
      
      // Fetch blogs after successful authentication
      fetchBlogs();
      
      // Reset form
      setAuthData({ email: "", password: "", name: "" });
    } catch (err: any) {
      setMessage("❌ " + (err.message || "Authentication failed"));
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setShowAuthPopup(true);
    setBlogs([]);
    setMessage("✅ Logged out successfully");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ Please login first");
      setLoading(false);
      setShowAuthPopup(true);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      setMessage("✅ Blog posted successfully!");
      form.reset();
      
      // Refresh the blogs list after successful submission
      fetchBlogs();
    } catch (err: any) {
      setMessage("❌ " + (err.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ Please login first");
      setShowAuthPopup(true);
      return;
    }

    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setMessage("✅ Blog deleted successfully!");
      // Refresh the blogs list after deletion
      fetchBlogs();
    } catch (err: any) {
      setMessage("❌ " + (err.message || "Failed to delete blog"));
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Auth Popup Component
  if (showAuthPopup) {
    return (
      <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>
          
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={authData.name}
                onChange={(e) => setAuthData({...authData, name: e.target.value})}
                className="border p-3 rounded"
                required={!isLogin}
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={authData.email}
              onChange={(e) => setAuthData({...authData, email: e.target.value})}
              className="border p-3 rounded"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) => setAuthData({...authData, password: e.target.value})}
              className="border p-3 rounded"
              required
            />

            <button
              type="submit"
              disabled={authLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-blue-400 hover:bg-blue-700 transition-colors"
            >
              {authLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          {message && (
            <p className={`mt-4 p-3 rounded ${
              message.includes("✅") ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-[100px] ">
      {/* Header with user info */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Welcome, {user?.email} ({user?.role})
          </span>
          <button
            onClick={handleLogout}
            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Blog Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Create New Blog Post</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" placeholder="Title" className="border p-2 rounded" required />
            <input name="slug" placeholder="Slug" className="border p-2 rounded" required />
          </div>
          
          <input name="subtitle" placeholder="Subtitle" className="border p-2 rounded" />
          <textarea name="excerpt" placeholder="Excerpt" className="border p-2 rounded" rows={2} />
          <textarea name="content" placeholder="Content" className="border p-2 rounded" rows={4} required />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="category" placeholder="Category" className="border p-2 rounded" />
            <input name="readTime" placeholder="Read Time (e.g., 5 min)" className="border p-2 rounded" />
            <input name="tags" placeholder='Tags (comma-separated)' className="border p-2 rounded" />
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Author Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="authorName" placeholder="Author Name" className="border p-2 rounded" required />
              <input name="authorAvatar" placeholder="Author Avatar URL" className="border p-2 rounded" />
              <input name="authorBio" placeholder="Author Bio" className="border p-2 rounded" />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Featured Image</label>
            <input type="file" name="image" accept="image/*" className="border p-2 rounded w-full" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-blue-400 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Posting..." : "Create Blog Post"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 p-3 rounded ${
            message.includes("✅") ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"
          }`}>
            {message}
          </p>
        )}
      </div>

      {/* Blogs List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Existing Blog Posts</h3>
          <button 
            onClick={fetchBlogs}
            className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
        </div>

        {loadingBlogs ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No blog posts found. Create your first blog post above!
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow flex gap-4"
              >
                {/* Blog Image - Now handles base64 images */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-32 h-24 object-cover rounded"
                  />

                {/* Blog Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{blog.title}</h4>
                    {blog.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-800"
                          : blog.status === "draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>

                  {blog.subtitle && (
                    <p className="text-gray-600 mb-2">{blog.subtitle}</p>
                  )}

                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
                    <span>Slug: {blog.slug}</span>
                    <span>•</span>
                    <span>Category: {blog.category || "Uncategorized"}</span>
                    <span>•</span>
                    <span>Views: {blog.views}</span>
                    <span>•</span>
                    <span>Published: {formatDate(blog.publishedAt)}</span>
                  </div>

                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {blog.author?.name && (
                    <p className="text-sm text-gray-600">By {blog.author.name}</p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}