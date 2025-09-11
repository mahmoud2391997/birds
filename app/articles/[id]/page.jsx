import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const response = await fetch(`${baseUrl}/api/blogs/${id}`, { cache: "no-store" });

    if (!response.ok) return { title: "Article Not Found" };

    const post = await response.json();
    return {
      title: post.title || "Article",
      description: post.excerpt || "Read this article",
      openGraph: {
        images: [post.image || "/placeholder.svg"],
        title: post.title || "Article",
        description: post.excerpt || "Read this article",
      },
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function ArticlePage({ params }) {
  const { id } = params;
  const response = await fetch(`${baseUrl}/api/blogs/${id}`, { cache: "no-store" });

  if (!response.ok) notFound();
  const post = await response.json();

  return <ArticleClient className="mt-20" post={post} />;
}
