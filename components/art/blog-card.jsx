import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

export function BlogCard({ post }) {
  return (
    <Card className="relative w-full overflow-hidden rounded-lg shadow-md group">
      <Link href={`/articles/${post._id}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View {post.title}</span>
      </Link>
      <Image
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        width={400}
        height={225}
        className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ aspectRatio: "16/9" }}
      />
      {post.type === "video" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-3 flex flex-col justify-end">
          <Play className="w-6 h-6 fill-white text-white absolute top-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <CardContent className="p-3">
        <h3 className="text-base font-semibold leading-tight mb-1">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <p className="text-xs text-gray-500 mt-2">
          {post.category || "Uncategorized"}, {post.readTime}
        </p>
      </CardContent>
    </Card>
  );
}