"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DOMPurify from "dompurify";

export default function ArticleClient({ post,className="" }) {
  if (!post) {
    return (
      <div className=" mt-20 mx-auto px-4 py-8 text-center text-red-500">
        Article not found
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
<div className={`container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-3xl ${className}`}>
      <Link href="/articles" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Blog
      </Link>
      <article className="prose prose-gray dark:prose-invert mx-auto">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.subtitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Avatar className="w-10 h-10 border">
              <AvatarImage
                src={post.author?.avatar || "/placeholder.svg"}
                alt={post.author?.name || "Author"}
              />
              <AvatarFallback>{post.author?.name?.charAt(0) || "A"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {post.author?.name || "Unknown Author"}
              </p>
              <p>
                {new Date(post.publishedAt).toLocaleDateString()} &bull; {post.readTime}
              </p>
            </div>
          </div>
        </div>

        <figure className="mb-8">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover rounded-lg shadow-md"
            style={{ aspectRatio: "16/9" }}
            priority
          />
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {post.excerpt}
          </figcaption>
        </figure>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">About the Author</h3>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border">
              <AvatarImage
                src={post.author?.avatar || "/placeholder.svg"}
                alt={post.author?.name || "Author"}
              />
              <AvatarFallback>{post.author?.name?.charAt(0) || "A"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-lg">{post.author?.name || "Unknown Author"}</p>
              <p className="text-muted-foreground">{post.author?.bio || "No bio available."}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}