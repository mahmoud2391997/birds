"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { selectRelatedPosts } from "@/lib/features/blog/blogSlice";

export function RelatedArticles() {
  const relatedPosts = useSelector(selectRelatedPosts);

  if (!relatedPosts.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-40">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-blue-600 font-medium">
                {post.category}
              </span>
              <h4 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 leading-tight">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600">{post.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
