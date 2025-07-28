import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus, FaEye } from "react-icons/fa";
import { productsAPI } from "../../utils/api";

export default function AdminItemPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productsAPI.delete(key);
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Products Management</h1>
          <p className="text-white/80 text-sm sm:text-base">Manage your audio equipment inventory</p>
        </div>

        {/* Products Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/20">
                <tr className="text-left">
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm">Image</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm hidden sm:table-cell">Key</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm">Name</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm">Price</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm hidden md:table-cell">Category</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm hidden lg:table-cell">Dimensions</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm">Status</th>
                  <th className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.key}
                    className={`border-b border-white/10 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                    } hover:bg-white/20 transition-all`}
                  >
                    <td className="p-2 sm:p-4">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-2 sm:p-4 text-white font-mono text-xs hidden sm:table-cell">{product.key}</td>
                    <td className="p-2 sm:p-4 text-white font-semibold text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate">
                      {product.name}
                    </td>
                    <td className="p-2 sm:p-4 text-[#efac38] font-bold text-xs sm:text-sm">
                      Rs. {product.price.toLocaleString()}
                    </td>
                    <td className="p-2 sm:p-4 hidden md:table-cell">
                      <span className="inline-block px-2 py-1 bg-accent/20 text-accent rounded-full text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-2 sm:p-4 text-white/80 text-xs hidden lg:table-cell">{product.dimensions}</td>
                    <td className="p-2 sm:p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          product.availability
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {product.availability ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td className="p-2 sm:p-4">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                        <Link
                          to={`/product/${product.key}`}
                          className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                          title="View Product"
                        >
                          <FaEye className="text-white text-xs sm:text-sm" />
                        </Link>
                        <Link
                          to={`/admin/update-item/${product.key}`}
                          className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
                          title="Edit Product"
                        >
                          <FaEdit className="text-white text-xs sm:text-sm" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.key)}
                          className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                          title="Delete Product"
                        >
                          <FaTrashAlt className="text-white text-xs sm:text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-white/60 mb-6">Start by adding your first product</p>
            <Link
              to="/admin/add-item"
              className="inline-flex items-center space-x-2 bg-[#efac38] text-white px-6 py-3 rounded-lg hover:bg-[#efac38]/80 transition-colors"
            >
              <FaPlus />
              <span>Add Product</span>
            </Link>
          </div>
        )}

        {/* Add Product Button */}
        {products.length > 0 && (
          <Link
            to="/admin/add-item"
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#efac38] rounded-full flex items-center justify-center hover:bg-[#efac38]/80 transition-colors shadow-lg"
            title="Add New Product"
          >
            <FaPlus className="text-white text-xl sm:text-2xl" />
          </Link>
        )}
      </div>
    </div>
  );
}
