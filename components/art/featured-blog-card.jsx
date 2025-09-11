import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export function FeaturedBlogCard({ post, href }) {
  const isValidImageUrl = (url) => url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  return (
    <Card className="relative w-full max-w-md md:max-w-lg lg:max-w-xxl h-[240px] overflow-hidden rounded-xl shadow-xl group">
      {/* Clickable Overlay */}
      <a href={href} className="absolute inset-0 z-10">
        <span className="sr-only">View {post.title}</span>
      </a>

      {/* Cover Image */}
      <Image
        src={isValidImageUrl(post.image) ? post.image : "/placeholder.svg"}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Overlay Text + Play Icon */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-5 flex flex-col justify-end">
        {post.type === "article" && (
          <div className="flex items-center gap-2 text-white text-sm mb-2">
            <span className="font-medium">Continue Reading</span>
          </div>
        )}
        <h3 className="text-2xl font-bold text-white leading-snug">{post.title}</h3>

        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
      </div>
    </Card>
  );
}
