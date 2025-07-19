"use client";

import { useSelector } from "react-redux";
import { BlogCard } from "./Blog-card";
import { selectFilteredPosts } from "@/lib/features/blog/blogSlice";

export function BlogGrid() {
  const blogPosts = useSelector(selectFilteredPosts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {blogPosts.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          subtitle={post.subtitle}
          image={post.image}
          category={post.category}
          slug={post.slug}
        />
      ))}
    </div>
  );
}
