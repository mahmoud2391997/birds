"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts, editPost, deletePost } from "@/features/blog/BlogSlice";
import Link from "next/link";

export default function ManagePosts() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.blog);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogPosts());
    }
  }, [status, dispatch]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (id) => {
    dispatch(editPost({ id, updates: editData }));
    setEditingId(null);
    setEditData({});
  };

  if (status === "loading") return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (status === "failed") return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>
      <Link href="/articles/create" className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create New Post
      </Link>
      {posts.length === 0 ? (
        <p className="text-center">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="border rounded-lg p-4 shadow">
              {editingId === post._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editData.title || post.title}
                    onChange={handleEditChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    name="excerpt"
                    value={editData.excerpt || post.excerpt}
                    onChange={handleEditChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                  />
                  <button
                    onClick={() => handleEditSubmit(post._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(post._id);
                        setEditData({ title: post.title, excerpt: post.excerpt });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deletePost(post._id))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}