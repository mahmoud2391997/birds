"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchReviews, deleteReview } from "@/redux/slices/reviewSlice";

const stripHtmlAndTruncate = (text, maxLength) => {
  const plainText = text.replace(/<[^>]+>/g, "");
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

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { reviews, status } = useSelector((state) => state.reviews);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await dispatch(fetchReviews()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to fetch reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredReviews = reviews
    .filter((review) => {
      return (
        searchTerm === "" ||
        review.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .map((review) => ({
      id: review._id,
      title: review.name || "Untitled Review",
      review: stripHtmlAndTruncate(review.review || "", 100),
      date: review.createdAt,
      slug: generateSlug(review.title || "review-" + review._id),
    }));

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await dispatch(deleteReview(id)).unwrap();
      } catch (err) {
        alert(`Failed to delete review: ${err.message || "Unknown error"}`);
        console.error("Error deleting review:", err);
      }
    }
  };

  const handleRetry = () => {
    dispatch(fetchReviews());
    setError(null);
  };

  return (
    <div className="space-y-6 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage your reviews and user feedback.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/reviews/new">
            <Plus className="mr-2 h-4 w-4" /> New Review
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>
            View, edit, and manage your reviews.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reviews..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              <h3 className="text-lg font-medium">Loading reviews...</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Please wait while we fetch your reviews.
              </p>
            </div>
          ) : paginatedReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Review</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReviews.map((review) => (
                    <tr key={review.id} className="border-b">
                      <td className="py-3">{review.title}</td>
                      <td className="py-3">{review.review}</td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
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
                                href={`/reviews/${review.slug}`}
                                className="flex items-center"
                              >
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/reviews/${review.id}`}
                                className="flex items-center"
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(review.id)}
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
            Showing <strong>{paginatedReviews.length}</strong> of{" "}
            <strong>{filteredReviews.length}</strong> reviews
          </div>
          {filteredReviews.length > itemsPerPage && (
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
