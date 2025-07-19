"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, createReview } from "@/redux/slices/reviewSlice";

const ReviewFormPage = () => {
  const dispatch = useDispatch();
  const { reviews, status, error } = useSelector((state) => state.reviews); // ensure your slice is registered as `reviews` in the store

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);
  console.log(reviews);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reviewData = {
      name: formData.get("name"),
      review: formData.get("review"),
    };
    dispatch(createReview(reviewData));
    e.target.reset();
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="review"
          placeholder="Write your review here"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Optional: Show loading or error */}
      {status === "loading" && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Optional: Display fetched reviews */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">All Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id} className="border-b py-2">
            <h4 className="font-bold">{review.title}</h4>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewFormPage;
