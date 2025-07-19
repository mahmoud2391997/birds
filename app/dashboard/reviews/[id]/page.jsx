"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, updateReview } from "@/redux/slices/reviewSlice";
export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { reviews, status, error } = useSelector((state) => state.reviews);

  const [reviewContent, setReviewContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    // Fetch reviews if not already loaded
    if (status === "idle") {
      dispatch(fetchReviews());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Find the review by ID from the Redux store
    const review = reviews.find((r) => r._id === id);
    if (review) {
      setReviewContent(review.review); // Use 'review' field as per data structure
      setLoading(false);
    } else if (status === "succeeded" && !review) {
      setLocalError("Review not found");
      setLoading(false);
    }
  }, [reviews, id, status]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(
        updateReview({ id, reviewData: { review: reviewContent } })
      ).unwrap();
      router.push("/reviews"); // Redirect to reviews list after successful update
    } catch (err) {
      setLocalError("Failed to update review");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (localError) return <p className="text-red-500">{localError}</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Review</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-semibold" htmlFor="review">
          Review Content:
        </label>
        <textarea
          id="review"
          rows={5}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
