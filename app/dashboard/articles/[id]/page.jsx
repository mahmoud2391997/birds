"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Save,
  X,
  ImageIcon,
  Link as LinkIcon,
  Palette,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  createArticle,
  updateArticle,
  fetchSingleArticle,
  fetchCategories,
  fetchTags,
  fetchAuthors,
} from "@/redux/slices/blogSlice";

// Utility to generate a unique hash for an object
const generateHash = (obj) => {
  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Estimate reading time based on content
const estimateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Strip HTML and truncate for excerpt
const stripHtmlAndTruncate = (html, maxLength = 100) => {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Validate image URL
const isValidImageUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname !== "www.google.com" &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(parsedUrl.pathname)
    );
  } catch {
    return false;
  }
};

// Toolbar component for Tiptap editor
const Toolbar = ({ editor }) => {
  const linkInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  if (!editor) return null;

  const setLink = () => {
    const url = prompt("Enter the URL:");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const setColor = (color) => {
    editor.chain().focus().setColor(color).run();
    setColorPickerOpen(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-md">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-600" : ""
        }
      >
        <span className="font-bold">B</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-600" : ""
        }
      >
        <span className="italic">I</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-200 dark:bg-gray-600"
            : ""
        }
      >
        H1
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-200 dark:bg-gray-600"
            : ""
        }
      >
        H2
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "bg-gray-200 dark:bg-gray-600" : ""
        }
      >
        <span className="text-sm">•</span>
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={setLink}>
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon" as="label">
        <ImageIcon className="h-4 w-4" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageInputRef}
          onChange={addImage}
        />
      </Button>
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setColorPickerOpen(!colorPickerOpen)}
        >
          <Palette className="h-4 w-4" />
        </Button>
        {colorPickerOpen && (
          <div className="absolute z-10 mt-2 p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
            <div className="flex gap-2">
              {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setColor(color)}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
      >
        <span className="text-sm">Clear</span>
      </Button>
    </div>
  );
};

export default function EditArticlePage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [tags, setTags] = useState([""]); // Initialize with one empty tag input
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [author, setAuthor] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorImage, setNewAuthorImage] = useState("");
  const [newAuthorBio, setNewAuthorBio] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageError, setImageError] = useState("");
  const [authorImageError, setAuthorImageError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const {
    singleArticle,
    categories,
    tags: existingTags,
    authors,
    loading,
    error,
  } = useSelector((state) => state.blog);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false, autolink: true }),
      ImageExtension.configure({ inline: true }),
      TextStyle,
      Color,
    ],
    content: "",
  });

  // Fetch article data and initialize form for editing
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleArticle(id));
    }
    dispatch(fetchCategories());
    dispatch(fetchTags());
    dispatch(fetchAuthors());
  }, [dispatch, id]);

  // Populate form with article data for editing
  useEffect(() => {
    if (id && singleArticle && editor) {
      setName(singleArticle.name || "");
      setDate(
        singleArticle.date
          ? new Date(singleArticle.date).toISOString().split("T")[0]
          : ""
      );
      setCategory(singleArticle.category || "");
      setTags(
        singleArticle.tags && singleArticle.tags.length > 0
          ? singleArticle.tags
          : [""]
      );
      setImagePreview(singleArticle.image || null);
      setExcerpt(singleArticle.excerpt || "");
      editor.commands.setContent(singleArticle.content || "");

      const existingAuthor = authors.find(
        (a) => a.name === singleArticle.writer?.name
      );
      if (existingAuthor) {
        setAuthor(singleArticle.writer.name);
      } else {
        setAuthor("new");
        setNewAuthorName(singleArticle.writer?.name || "");
        setNewAuthorImage(singleArticle.writer?.image || "");
        setNewAuthorBio(singleArticle.writer?.about || "");
      }
    }
  }, [singleArticle, authors, editor, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageError("");
      };
      reader.readAsDataURL(file);
    } else {
      setImageError("Please select a valid image file.");
    }
  };

  const handleAuthorImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAuthorImage(reader.result);
        setAuthorImageError("");
      };
      reader.readAsDataURL(file);
    } else {
      setAuthorImageError("Please select a valid image file.");
    }
  };

  const handleAuthorImageUrlChange = (e) => {
    const url = e.target.value;
    if (url === "" || isValidImageUrl(url)) {
      setNewAuthorImage(url);
      setAuthorImageError("");
    } else {
      setAuthorImageError(
        "Please enter a valid image URL (e.g., ending in .jpg, .png) and not a Google redirect."
      );
    }
  };

  // Handle tag input changes
  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  // Add a new tag input field
  const addTag = () => {
    setTags([...tags, ""]);
  };

  // Remove a tag input field
  const removeTag = (index) => {
    if (tags.length > 1) {
      const newTags = tags.filter((_, i) => i !== index);
      setTags(newTags);
    } else {
      setTags([""]); // Keep at least one empty input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile && !imagePreview) {
      setImageError("Please select an image file or keep the existing image.");
      return;
    }

    if (
      author === "new" &&
      (!newAuthorName || !newAuthorImage || !newAuthorBio)
    ) {
      setAuthorImageError("Please fill in all author fields.");
      return;
    }

    const content = editor ? editor.getHTML() : "";
    const generatedExcerpt = excerpt || stripHtmlAndTruncate(content, 100);

    const writer =
      author === "new"
        ? {
            name: newAuthorName,
            image: newAuthorImage || "/placeholder.svg?height=100&width=100",
            about: newAuthorBio || "No bio provided.",
          }
        : authors.find((a) => a.name === author) || {
            name: "Unknown Author",
            image: "/placeholder.svg?height=100&width=100",
            about: "No bio available.",
          };

    const tagArray = tags.map((tag) => tag.trim()).filter((tag) => tag);

    if (id) {
      // JSON payload for updateArticle
      const articleData = {
        name,
        date: date || new Date().toISOString(),
        readingTime: estimateReadingTime(content),
        content,
        writer,
        tags: tagArray,
        category: newCategory || category || "General",
        image: imagePreview || "/placeholder.svg?height=400&width=600", // Keep existing image or fallback
        excerpt: generatedExcerpt,
      };

      console.log("Update article payload:", articleData);

      try {
        const result = await dispatch(
          updateArticle({ id, articleData })
        ).unwrap();
        console.log("Update article response:", result);
        router.push("/dashboard/articles");
      } catch (err) {
        console.error("Failed to update article:", err);
        alert(`Failed to update article: ${err}`);
      }
    } else {
      // FormData for createArticle
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date || new Date().toISOString().split("T")[0]);
      formData.append("readingTime", estimateReadingTime(content));
      formData.append("content", content);
      formData.append("writer", JSON.stringify(writer));
      formData.append("tags", JSON.stringify(tagArray));
      formData.append("category", newCategory || category || "General");
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (imagePreview) {
        formData.append("image", imagePreview);
      }
      formData.append("excerpt", generatedExcerpt);

      // Log FormData entries
      console.log("Create article FormData:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      try {
        const result = await dispatch(createArticle(formData)).unwrap();
        console.log("Create article response:", result);
        router.push("/dashboard/articles");
      } catch (err) {
        console.error("Failed to create article:", err);
        alert(`Failed to create article: ${err}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {id ? "Edit Article" : "New Article"}
          </h2>
          <p className="text-muted-foreground">
            {id
              ? "Update an existing blog article for your website."
              : "Create a new blog article for your website."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild disabled={loading}>
            <Link href="/dashboard/articles">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />{" "}
            {loading ? "Saving..." : "Save Article"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          Error: {error}
        </div>
      )}

      {id && loading && !singleArticle ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-muted-foreground">Loading article...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="name"
                    placeholder="Enter article title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select or add a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                        <SelectItem value="new">Add new category...</SelectItem>
                      </SelectContent>
                    </Select>
                    {category === "new" && (
                      <Input
                        placeholder="Enter new category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Select value={author} onValueChange={setAuthor}>
                      <SelectTrigger id="author">
                        <SelectValue placeholder="Select or add an author" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map((auth) => (
                          <SelectItem
                            key={generateHash(auth)}
                            value={auth.name}
                          >
                            {auth.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="new">Add new author...</SelectItem>
                      </SelectContent>
                    </Select>
                    {author === "new" && (
                      <div className="space-y-2 mt-2">
                        <Input
                          placeholder="Author name"
                          value={newAuthorName}
                          onChange={(e) => setNewAuthorName(e.target.value)}
                          required
                        />
                        <Input
                          placeholder="Author image URL"
                          value={newAuthorImage}
                          onChange={handleAuthorImageUrlChange}
                          required
                        />
                        {authorImageError && (
                          <p className="text-sm text-red-600">
                            {authorImageError}
                          </p>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleAuthorImageChange}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#7ED967] file:text-black hover:file:bg-[#7ED967]/90"
                        />
                        <Textarea
                          placeholder="Author bio"
                          value={newAuthorBio}
                          onChange={(e) => setNewAuthorBio(e.target.value)}
                          className="h-24"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-32 w-32 rounded-md border border-dashed border-border flex items-center justify-center bg-muted">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Featured image preview"
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#7ED967] file:text-black hover:file:bg-[#7ED967]/90"
                      required={!imagePreview}
                    />
                  </div>
                  {imageError && (
                    <p className="text-sm text-red-600">{imageError}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Content</Label>
                  <Tabs defaultValue="write">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write" className="mt-2">
                      <div className="border rounded-md">
                        <Toolbar editor={editor} />
                        <EditorContent
                          editor={editor}
                          className="prose dark:prose-invert max-w-none p-4 min-h-[300px] bg-white dark:bg-gray-800 text-black dark:text-white border-t-0"
                          placeholder="Write your article content here..."
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-2">
                      <div className="rounded-md border p-4 min-h-[300px]">
                        {editor && editor.getHTML() !== "<p></p>" ? (
                          <div className="prose dark:prose-invert max-w-none">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: editor.getHTML(),
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground">
                            Write some content to see a preview
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Write a short excerpt for your article"
                    className="h-24"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be displayed on the blog listing page. If left
                    empty, it will be generated from the content.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label>Tags</Label>
                  <div className="space-y-2">
                    {tags.map((tag, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          placeholder="Enter a tag"
                          value={tag}
                          onChange={(e) =>
                            handleTagChange(index, e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTag(index)}
                          disabled={tags.length === 1 && tag === ""}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTag}
                      className="mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Tag
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tags help users find related content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild disabled={loading}>
              <Link href="/dashboard/articles">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Article"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
