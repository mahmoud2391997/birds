"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Portrait Photography Fundamentals",
      excerpt: "Continue Course",
      image: "/placeholder-portrait.jpg",
      date: "Completed 12/16",
      category: "Photography",
    },
    {
      id: 2,
      title: "History of Modern Art Movements",
      excerpt: "Final Quiz",
      image: "/placeholder-art.jpg",
      date: "Completed 12/16",
      category: "Art",
    },
    {
      id: 3,
      title: "Music Theory Basics",
      excerpt: "Final Quiz",
      image: "/placeholder-music.jpg",
      date: "Completed 1/30",
      category: "Music",
    },
  ];

  return (
    <section
      className="section-padding text-white animate-section bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/comingSoon.jpeg.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recent Activity
        </h2>

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
                  src={post.image || "/placeholder.svg"}
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
                  href={`/articles/${post.id}`}
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
