"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBlogPosts } from "@/features/blog/BlogSlice"; // Corrected import path
import { FeaturedBlogCard } from "@/components/art/featured-blog-card";
import { BlogCard } from "@/components/art/blog-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BlogHero } from "@/components/art/Blog-Hero";

export default function HomePageClient() {
  const dispatch = useAppDispatch();
  const { posts, status, error } = useAppSelector((state) => state.blog);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogPosts());
    }
  }, [status, dispatch]);

  // Debug: Log posts and check for specific ID
  useEffect(() => {
    console.log("Posts loaded:", posts);
    // Example: const targetPost = posts.find((post) => post._id === "688f772062b52ce3ddca30b5");
    // console.log("Target post (articles/688f772062b52ce3ddca30b5):", targetPost || "Not found");
  }, [posts]);

  // Dynamically get unique categories from fetched posts
  const uniqueCategories = Array.from(new Set(posts.map((post) => post.category))).sort();
  const filterOptions = ["All", ...uniqueCategories];

  if (status === "loading" || status === "idle") {
    return (
      <div className="min-h-screen">
        <div className="px-4 py-8">
          <div className="bg-white shadow rounded-lg mt-20 p-6 mb-8 animate-pulse">
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <h2 className="text-2xl font-bold mb-6">Recent activity</h2>
            <div className="flex space-x-4 mb-10 overflow-hidden">
              <div className="w-[400px] h-[200px] bg-gray-200 rounded flex-shrink-0"></div>
              <div className="w-[300px] h-[200px] bg-gray-200 rounded flex-shrink-0"></div>
              <div className="w-[300px] h-[200px] bg-gray-200 rounded flex-shrink-0"></div>
            </div>
            <h2 className="text-2xl font-bold mb-6">All Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[250px] bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <div className="h-20 md:h-24" />
        <p className="text-red-400 text-lg mb-4">
          Error: {error || "Failed to load posts. Please check the API at /api/blogs."}
        </p>
        <button
          onClick={() => dispatch(fetchBlogPosts())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const mainFeaturedPost = posts.length > 0 ? posts[0] : null;
  const sideFeaturedPosts = posts.length > 1 ? posts.slice(1, Math.min(3, posts.length)) : [];
  // Use full posts array for filtering instead of slice(3)
  const filteredPosts = filter === "All" ? posts : posts.filter((post) => post.category === filter);

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg mt-20 p-6 mb-8">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Recent activity</h2>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex space-x-4">
                {mainFeaturedPost && (
                  <div className="inline-block w-[400px] md:w-[400px] lg:w-[500px] flex-shrink-0">
                    <Link href={`/articles/${mainFeaturedPost._id}`} prefetch={false} passHref>
                      <FeaturedBlogCard post={mainFeaturedPost} />
                    </Link>
                  </div>
                )}
                {sideFeaturedPosts.map((post) => (
                  <div key={post._id} className="inline-block w-[300px] md:w-[350px] lg:w-[350px] flex-shrink-0">
                    <Link href={`/articles/${post._id}`} prefetch={false} passHref>
                      <BlogCard post={post} />
                    </Link>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Articles</h2>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                {filterOptions.map((category) => (
                  <span
                    key={category}
                    className={`cursor-pointer ${filter === category ? "font-semibold text-primary" : ""}`}
                    onClick={() => setFilter(category)}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post._id} href={`/articles/${post._id}`} prefetch={false}>
                  <BlogCard post={post} />
                </Link>
              ))}
              {filteredPosts.length === 0 && (
                <p className="text-center text-muted-foreground col-span-full">No posts found for this category.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}