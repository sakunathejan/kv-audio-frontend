import { useState, useEffect } from "react";
import { reviewsAPI } from "../../utils/api";
import { FaStar, FaCheck, FaTimes, FaTrash, FaEye } from "react-icons/fa";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, approved, pending

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsAPI.getAll();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (email) => {
    try {
      await reviewsAPI.approve(email);
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await reviewsAPI.delete(email);
        fetchReviews(); // Refresh the list
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === "approved") return review.isApproved;
    if (filter === "pending") return !review.isApproved;
    return true; // all
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Reviews Management</h1>
          <p className="text-white/80">Manage customer reviews and feedback</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-[#efac38] text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                All Reviews ({reviews.length})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "approved"
                    ? "bg-[#efac38] text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Approved ({reviews.filter(r => r.isApproved).length})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === "pending"
                    ? "bg-[#efac38] text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Pending ({reviews.filter(r => !r.isApproved).length})
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No reviews found</h3>
            <p className="text-white/60">
              {filter === "all" 
                ? "No reviews have been submitted yet." 
                : `No ${filter} reviews found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${
                  !review.isApproved ? "border-l-4 border-yellow-400" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Review Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={review.profilePicture}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{review.name}</h3>
                        <p className="text-white/60 text-sm">{review.email}</p>
                        <p className="text-white/60 text-sm">
                          {new Date(review.time).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-lg ${
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/60 text-sm">
                        {review.rating}/5 stars
                      </span>
                    </div>

                    {/* Review Comment */}
                    <p className="text-white/80 leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-6">
                    {!review.isApproved && (
                      <button
                        onClick={() => handleApprove(review.email)}
                        className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                        title="Approve Review"
                      >
                        <FaCheck className="text-white text-sm" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(review.email)}
                      className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Delete Review"
                    >
                      <FaTrash className="text-white text-sm" />
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      review.isApproved
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {review.isApproved ? "Approved" : "Pending Approval"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 