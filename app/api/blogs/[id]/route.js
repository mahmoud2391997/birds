import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  await dbConnect()
  try {
    const { id } = await params
    const blog = await BlogPost.findById(id)
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blog post", error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  await dbConnect()
  try {
    const { id } = params
    const body = await request.json()
    const updatedBlog = await BlogPost.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(updatedBlog)
  } catch (error) {
    return NextResponse.json({ message: "Error updating blog post", error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  await dbConnect()
  try {
    const { id } = params
    const deletedBlog = await BlogPost.findByIdAndDelete(id)
    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error deleting blog post", error: error.message }, { status: 500 })
  }
}
