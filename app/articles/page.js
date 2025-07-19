"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogNavigation } from "@/components/blog/Blog-navigation";
import { BlogGrid } from "@/components/blog/Blog-gird";
import { RecentActivity } from "@/components/blog/Recent-activity";
import {
  fetchArticles,
  fetchFeaturedContent,
  selectLoading,
  selectError,
} from "@/lib/features/blog/blogSlice";

export default function BlogPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchFeaturedContent());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              dispatch(fetchBlogPosts());
              dispatch(fetchFeaturedContent());
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RecentActivity />
        <div className="mt-12">
          <BlogNavigation />
          <BlogGrid />
        </div>
      </div>
    </div>
  );
}
