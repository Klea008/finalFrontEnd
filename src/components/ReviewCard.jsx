import React from 'react'
import useUserStore from '../stores/useUserStore'
import { deleteReview } from '../services/reviews.api'
import toast from 'react-hot-toast';

const ReviewCard = ({ review, handleDeleteReview }) => {
  const { user } = useUserStore();

  const handleDelete = async (reviewId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this review?");
    if (!isConfirmed) return;

    try {
      const response = await deleteReview(reviewId);
      if (response.message === "Review deleted successfully") {
        // Optimistically update the UI
        handleDeleteReview(reviewId);
        toast.success("Review deleted successfully");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Error deleting the review");
    }
  };

  return (
    <li className="border-b border-gray-300 dark:border-gray-700 pb-2 leading-tight text-sm">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="font-semibold">{review.userName}</p>
          <p className="text-gray-700 dark:text-gray-300">
            {review.comment.length > 100
              ? review.comment.slice(0, 100) + '...'
              : review.comment}
          </p>
          <span className="text-yellow-500">Rating: {review.rating} / 5</span>
        </div>
        {user && user._id === review.userId && (
          <button
            className="rounded-sm px-2 py-1 bg-red-500 text-white hover:bg-red-600 text-sm"
            onClick={() => handleDelete(review._id)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default ReviewCard;
