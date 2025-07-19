import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";

export function ArticleHeader({ post }) {
  return (
    <header className="mb-8">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{post.author?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {post.author && (
        <div className="flex items-center space-x-4 mb-8">
          <Image
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-600">{post.author.bio}</p>
          </div>
        </div>
      )}
    </header>
  );
}
