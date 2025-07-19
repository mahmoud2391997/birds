"use client";

import { useDispatch, useSelector } from "react-redux";
import { setFilter, selectFilters } from "@/lib/features/blog/blogSlice";

const navItems = ["All", "Psychology", "Health", "Leadership", "Lifestyle"];

export function BlogNavigation() {
  const dispatch = useDispatch();
  const { category } = useSelector(selectFilters);

  return (
    <div className="flex items-center justify-between mb-8">
      <nav className="flex space-x-8">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => dispatch(setFilter({ category: item }))}
            className={`text-lg font-medium transition-colors ${
              category === item
                ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="text-gray-500 font-medium">Content</div>
    </div>
  );
}
