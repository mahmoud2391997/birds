"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  fetchArticles,
  deleteArticle,
  fetchCategories,
} from "@/redux/slices/blogSlice";

const stripHtmlAndTruncate = (htmlString, maxLength) => {
  const plainText = htmlString.replace(/<[^>]+>/g, "");
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength) + "..."
    : plainText;
};

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const {
    articles,
    categories,
    status,
    error: reduxError,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([
          dispatch(fetchArticles()).unwrap(),
          dispatch(fetchCategories()).unwrap(),
        ]);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Filter articles based on search term and category
  const filteredArticles = articles
    .filter((article) => {
      const matchesSearch =
        searchTerm === "" ||
        article.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ||
        article.category?.toLowerCase() === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .map((article) => ({
      id: article._id,
      title: article.name,
      excerpt: stripHtmlAndTruncate(article.content, 100),
      coverImage: article.image || "/placeholder.svg?height=400&width=600",
      category: article.category || "General",
      author: article.writer ? article.writer.name : "Unknown Author",
      date: article.date,
      views: article.views || 0,
      slug: generateSlug(article.name),
    }));

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await dispatch(deleteArticle(id)).unwrap();
      } catch (err) {
        alert(`Failed to delete article: ${err.message || "Unknown error"}`);
        console.error("Error deleting article:", err);
      }
    }
  };

  const handleRetry = () => {
    dispatch(fetchArticles());
    dispatch(fetchCategories());
    setError(null);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
          <p className="text-muted-foreground">
            Manage your blog articles and content.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/articles/new">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
          <CardDescription>
            View, edit, and manage your blog articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                <span>{error}</span>
                <Button onClick={handleRetry} variant="outline" size="sm">
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
              <h3 className="text-lg font-medium">Loading articles...</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Please wait while we fetch your articles.
              </p>
            </div>
          ) : paginatedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No articles found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Views</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArticles.map((article) => (
                    <tr key={article.id} className="border-b">
                      <td className="py-3">{article.title}</td>
                      <td className="py-3">{article.category}</td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        {article.views.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/articles/${article.slug}`}
                                className="flex items-center"
                              >
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/articles/${article.id}`}
                                className="flex items-center"
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(article.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{paginatedArticles.length}</strong> of{" "}
            <strong>{filteredArticles.length}</strong> articles
          </div>
          {filteredArticles.length > itemsPerPage && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <div className="text-sm px-2">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
