"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch("/api/blogs?limit=3&sort=latest", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await res.json();
        // Map data to match the expected structure
        const formattedPosts = data.map((post) => ({
          id: post._id,
          title: post.title,
          excerpt: post.excerpt || "Continue Reading",
          image: post.image || "/placeholder.svg",
          date: new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          category: post.category || "General",
          slug: post.slug,
        }));
        setBlogPosts(formattedPosts);
      } catch (err) {
        setError(err.message || "Error fetching blog posts");
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section
      className="section-padding text-white animate-section bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/comingSoon.jpeg.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recent Activity
        </h2>

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {!error && blogPosts.length === 0 && (
          <p className="text-gray-500 text-center">No recent blog posts available.</p>
        )}

        <div className="flex justify-center gap-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-black rounded-lg overflow-hidden flex-1 min-w-[300px] max-w-[300px]"
              initial={{ opacity: 0, y: 30, scale: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              animate={{
                flex: hoveredIndex === index ? 2 : 1,
                minWidth: hoveredIndex === index ? "600px" : "300px",
                maxWidth: hoveredIndex === index ? "600px" : "300px",
                scale: hoveredIndex === index ? 1.1 : 1,
                zIndex: hoveredIndex === index ? 10 : 1,
                transition: { duration: 0.3 },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0373fb] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6 text-center">
                <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/articles/${post.slug}`}
                  className="inline-flex items-center justify-center text-[#0373fb] font-medium hover:text-[#0d60fa] transition-colors"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Continue
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/articles" className="btn btn-secondary">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}