export function ArticleContent({ post }) {
  return (
    <article className="prose prose-lg max-w-none mb-12">
      <div
        className="text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
