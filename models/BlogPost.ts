import mongoose, { Schema, model, Model } from "mongoose";

export interface IBlogPost {
  _id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  content: string;
  image?: string; // Store as base64 string or URL
  category?: string;
  author?: {
    _id?: string;
    name?: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt?: Date;
  readTime?: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  featured?: boolean;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subtitle: { type: String, trim: true, maxlength: 300 },
    excerpt: { type: String, trim: true, maxlength: 500 },
    content: { type: String, required: true },

    // Store image as base64 or URL
    image: { type: String },

    category: { type: String, trim: true },
    author: {
      name: { type: String, trim: true },
      avatar: { type: String },
      bio: { type: String, trim: true, maxlength: 500 },
    },
    publishedAt: { type: Date, default: Date.now },
    readTime: { type: String },
    tags: [{ type: String, trim: true, lowercase: true }],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Use "blogposts" collection in "birds" database
const BlogPost: Model<IBlogPost> =
  (mongoose.models.BlogPost as Model<IBlogPost>) ||
  model<IBlogPost>("BlogPost", BlogPostSchema, "blogposts");

export default BlogPost;
