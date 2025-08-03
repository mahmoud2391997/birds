import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { NextResponse } from "next/server"

export async function GET(request) {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const id = searchParams.get("id")

    if (slug) {
      const blog = await BlogPost.findOne({ slug })
      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 })
      }
      return NextResponse.json(blog)
    }

    if (id) {
      const blog = await BlogPost.findById(id)
      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 })
      }
      return NextResponse.json(blog)
    }

    const blogs = await BlogPost.find({})
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blogs", error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  await dbConnect()
  try {
    const body = await request.json()
    const newBlogPost = await BlogPost.create(body)
    return NextResponse.json(newBlogPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Error creating blog post", error: error.message }, { status: 500 })
  }
}
