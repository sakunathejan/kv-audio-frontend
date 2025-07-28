import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productsAPI, reviewsAPI } from "../../utils/api";
import { FaStar, FaHeart, FaShare, FaShoppingCart, FaArrowLeft, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ProductOverview() {
  const { key } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [key]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getByKey(key);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewsAPI.getAll();
      // Filter approved reviews
      const approvedReviews = data.filter(review => review.isApproved);
      setReviews(approvedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            to="/items"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link
            to="/items"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
          >
            <FaArrowLeft />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Product Images */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Image */}
            <div className="relative">
              <img
                src={product.image[selectedImage]}
                alt={product.name}
                className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-2">
                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaHeart className="text-white text-sm sm:text-base" />
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaShare className="text-white text-sm sm:text-base" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.image.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {product.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-blue-500" 
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category and Availability */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <span className="inline-block px-3 sm:px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-semibold text-sm sm:text-base">
                {product.category}
              </span>
              <span
                className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base ${
                  product.availability
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {product.availability ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

            {/* Price */}
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              Rs. {product.price.toLocaleString()}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm sm:text-lg ${
                      star <= averageRating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Specifications</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Dimensions:</span>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">{product.dimensions}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Category:</span>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">{product.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                disabled={!product.availability}
                className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FaShoppingCart />
                <span>{product.availability ? "Add to Cart" : "Out of Stock"}</span>
              </button>
              <Link
                to="/contact"
                className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FaEnvelope />
                <span>Contact Seller</span>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Need Help?</h4>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-blue-600" />
                  <span>+94 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-blue-600" />
                  <span>info@kvaudio.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <img
                      src={review.profilePicture}
                      alt={review.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">{review.name}</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-xs sm:text-sm ${
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{review.comment}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
                    {new Date(review.time).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}