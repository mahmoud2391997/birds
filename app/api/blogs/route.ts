import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogPost from "@/models/BlogPost";
import dbConnect from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

// Strongly-typed wrapper for mongoose ops
const handleMongooseOperation = async <T>(operation: () => Promise<T>) => {
  try {
    return await operation();
  } catch (err) {
    console.error("Mongoose operation error:", err);
    throw err;
  }
};

async function ensureDb() {
  await dbConnect();
  console.log('Database connected:', mongoose.connection.db?.databaseName);
}

/**
 * Utility to ensure image is properly formatted for frontend
 */
function normalizeImage(doc: any) {
  const postData = { ...doc };
  
  // Since we store as base64 string, create proper data URL
  if (postData.image && typeof postData.image === 'string') {
    // Check if it's already a data URL
    if (postData.image.startsWith('data:')) {
      postData.imageUrl = postData.image;
    } else {
      // Assume it's base64 and add image/jpeg mime type
      postData.imageUrl = `data:image/jpeg;base64,${postData.image}`;
    }
  } else {
    postData.imageUrl = null;
  }
  
  return postData;
}

// -------------------- POST (Create) --------------------
export async function POST(request: NextRequest) {
  try {
    await ensureDb();

    // Auth
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const slug = (formData.get("slug") as string) || "";
    const subtitle = (formData.get("subtitle") as string) || "";
    const excerpt = (formData.get("excerpt") as string) || "";
    const content = (formData.get("content") as string) || "";
    const category = (formData.get("category") as string) || "";
    const readTime = (formData.get("readTime") as string) || "";
    const tagsString = (formData.get("tags") as string) || "";
    const statusInput = (formData.get("status") as string) || "draft";
    const featured = (formData.get("featured") as string) === "true";

    const authorName = (formData.get("authorName") as string) || "";
    const authorAvatar = (formData.get("authorAvatar") as string) || "";
    const authorBio = (formData.get("authorBio") as string) || "";

    // Validate status
    const validStatuses = ["draft", "published", "archived"];
    const status = validStatuses.includes(statusInput) ? statusInput : "draft";

    // 👇 FIXED: Image handling - convert to base64 string
    const imageFile = formData.get("image") as File | null;
    const imageUrl = (formData.get("imageUrl") as string) || "";
    let imageData: string | undefined = undefined;

    if (imageFile && imageFile.size > 0) {
      // Convert image file to base64 string
      const bytes = await imageFile.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      
      // Store as full data URL with proper mime type
      imageData = `data:${imageFile.type || 'image/jpeg'};base64,${base64}`;
    } else if (imageUrl) {
      // If URL provided, use it directly (could be base64 or external URL)
      imageData = imageUrl;
    }

    // Tags parsing
    const tags = tagsString
      ? tagsString.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [];

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate slug if missing
    let finalSlug = slug;
    if (!finalSlug && title) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .substring(0, 100);
    }

    // Ensure uniqueness
    const exists = await handleMongooseOperation(() =>
      BlogPost.findOne({ slug: finalSlug }).exec()
    );
    if (exists) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 400 });
    }

    // Create document - image is now a base64 string
    const newPost = new BlogPost({
      title: title.trim(),
      slug: finalSlug,
      subtitle: subtitle?.trim(),
      excerpt: excerpt?.trim(),
      content: content.trim(),
      image: imageData, // 👈 Now stored as base64 string
      category: category?.trim(),
      author: authorName
        ? { name: authorName.trim(), avatar: authorAvatar?.trim(), bio: authorBio?.trim() }
        : undefined,
      readTime,
      tags,
      status,
      featured,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    await handleMongooseOperation(() => newPost.save());

    const responseData = normalizeImage(newPost.toObject());

    return NextResponse.json(
      {
        message: `Blog post ${status} successfully!`,
        id: responseData._id,
        slug: responseData.slug,
        data: responseData,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// -------------------- GET (List / Single) --------------------

export async function GET() {
  await dbConnect()

  try {
    // Fetch all blog posts
    const posts = await BlogPost.find({})
    return NextResponse.json({ success: true, count: posts.length, posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog posts" }, { status: 500 })
  }
}


// -------------------- DELETE --------------------
export async function DELETE(request: NextRequest) {
  try {
    await ensureDb();

    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "Blog post ID is required" }, { status: 400 });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid blog post ID format" }, { status: 400 });
    }

    const deleted = await handleMongooseOperation(() =>
      BlogPost.findByIdAndDelete(id).exec()
    );
    if (!deleted) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}