"use client";

import { useSelector } from "react-redux";
import { FeaturedCard } from "./Featured-card";
import { selectFeaturedContent } from "@/lib/features/blog/blogSlice";

export function RecentActivity() {
  const featuredContent = useSelector(selectFeaturedContent);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredContent.map((item) => (
          <FeaturedCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
