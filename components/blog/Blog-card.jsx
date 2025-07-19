import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({ title, subtitle, image, category, slug }) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <div className="relative h-40">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-gray-500 font-medium">
              {category}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
