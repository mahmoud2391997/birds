"use client";

import { useState } from "react";

export default function CreateBlogPostForm() {
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

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          author: {
            name: formData.authorName,
            avatar: formData.authorAvatar,
            bio: formData.authorBio,
          },
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit post");

      setStatus("success");
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
      setStatus("error");
      setMessage(err.message || "Error submitting post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mt-20 py-20 space-y-20 mx-auto p-6 space-8 mt-20 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>

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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting..." : "Submit Post"}
      </button>

      {status === "success" && <p className="text-green-600">{message}</p>}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </form>
  );
}
