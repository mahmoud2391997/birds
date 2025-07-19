"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { ArticleHeader } from "@/components/blog/Article-header";
import { ArticleContent } from "@/components/blog/Article-content";
import { RelatedArticles } from "@/components/blog/Related-articles";
import {
  fetchBlogPost,
  fetchRelatedPosts,
  selectCurrentPost,
  selectLoading,
  selectError,
  clearCurrentPost,
} from "@/lib/features/blog/blogSlice";

export default function BlogPostPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectCurrentPost);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (params.slug) {
      dispatch(clearCurrentPost());
      dispatch(fetchBlogPost(params.slug));
      dispatch(fetchRelatedPosts(params.slug));
    }
  }, [dispatch, params.slug]);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-4">Article not found</p>
          <a
            href="/blog"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ArticleHeader post={post} />
        <ArticleContent post={post} />
        <RelatedArticles />
      </div>
    </div>
  );
}
