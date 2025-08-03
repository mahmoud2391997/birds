import mongoose from "mongoose"

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  bio: { type: String, required: true },
})

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: AuthorSchema, required: true },
  publishedAt: { type: Date, default: Date.now },
  readTime: { type: String, required: true },
  tags: { type: [String], required: true },
})

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)

export default BlogPost
