"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "@/features/blog/BlogSlice"; 

export default function CreateBlogPostFormRedux() {
  const dispatch = useDispatch();
  const blogStatus = useSelector((state) => state.blog.status); // e.g. 'idle'|'loading'|'succeeded'|'failed'
  const blogError = useSelector((state) => state.blog.error);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    authorName: "",
    authorAvatar: "",
    authorBio: "",
    publishedAt: "",
    readTime: "",
    tags: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Prepare payload for Redux thunk
    const payload = {
      ...formData,
      author: {
        name: formData.authorName,
        avatar: formData.authorAvatar,
        bio: formData.authorBio,
      },
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await dispatch(createArticle(payload)).unwrap();
      setMessage("Post submitted successfully!");
      setFormData({
        title: "",
        slug: "",
        subtitle: "",
        excerpt: "",
        content: "",
        image: "",
        category: "",
        authorName: "",
        authorAvatar: "",
        authorBio: "",
        publishedAt: "",
        readTime: "",
        tags: "",
      });
    } catch (err) {
      setMessage(err.message || "Error submitting post.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mt-20 py-20 mx-auto p-6 space-y-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>

      {blogError && (
        <p className="text-red-600">Error: {blogError}</p>
      )}
      {message && !blogError && (
        <p className="text-green-600">{message}</p>
      )}

      {[
        "title",
        "slug",
        "subtitle",
        "excerpt",
        "image",
        "category",
        "publishedAt",
        "readTime",
        "authorName",
        "authorAvatar",
        "authorBio",
      ].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      ))}

      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        rows={5}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
          blogStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={blogStatus === "loading"}
      >
        {blogStatus === "loading" ? "Submitting..." : "Submit Post"}
      </button>
    </form>
  );
}
