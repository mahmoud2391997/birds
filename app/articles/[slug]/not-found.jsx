import Link from "next/link";
import { ArrowLeft, FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been moved. It
            might have been deleted or the URL might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          <div className="text-sm text-gray-500">
            <p>Or try searching for what you need from our blog homepage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
