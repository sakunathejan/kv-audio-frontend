import { Link } from "react-router-dom";
import { FaStar, FaEye, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              product.availability 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            }`}
          >
            {product.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Dimensions */}
        <div className="mb-4">
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            <span className="font-semibold">Dimensions:</span> {product.dimensions}
          </p>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Rs. {product.price.toLocaleString()}
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/product/${product.key}`}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="View Details"
            >
              <FaEye className="text-gray-600 dark:text-gray-400 text-sm" />
            </Link>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="p-6 pt-0">
        <Link
          to={`/product/${product.key}`}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}