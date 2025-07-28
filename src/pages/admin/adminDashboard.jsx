import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI, reviewsAPI, inquiriesAPI } from "../../utils/api";
import { 
  FaBox, 
  FaStar, 
  FaEnvelope, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaUsers,
  FaChartLine,
  FaCog
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    reviews: 0,
    inquiries: 0,
    pendingReviews: 0,
    pendingInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [products, reviews, inquiries] = await Promise.all([
        productsAPI.getAll(),
        reviewsAPI.getAll(),
        inquiriesAPI.getAll(),
      ]);

      const pendingReviews = reviews.filter(review => !review.isApproved).length;
      const pendingInquiries = inquiries.filter(inquiry => !inquiry.isResolved).length;

      setStats({
        products: products.length,
        reviews: reviews.length,
        inquiries: inquiries.length,
        pendingReviews,
        pendingInquiries,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/80 text-sm sm:text-base">Welcome to your audio equipment management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm">Total Products</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats.products}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaBox className="text-white text-lg sm:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm">Total Reviews</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats.reviews}</p>
                {stats.pendingReviews > 0 && (
                  <p className="text-yellow-400 text-xs sm:text-sm">{stats.pendingReviews} pending</p>
                )}
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <FaStar className="text-white text-lg sm:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm">Total Inquiries</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stats.inquiries}</p>
                {stats.pendingInquiries > 0 && (
                  <p className="text-red-400 text-xs sm:text-sm">{stats.pendingInquiries} pending</p>
                )}
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-white text-lg sm:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm">System Status</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">Online</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-white text-lg sm:text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Products Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">Products Management</h2>
              <Link
                to="/admin/add-item"
                className="bg-[#efac38] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#efac38]/80 transition-colors flex items-center space-x-2 text-sm sm:text-base"
              >
                <FaPlus />
                <span>Add Product</span>
              </Link>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/admin/items"
                className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FaBox className="text-[#efac38] text-lg sm:text-xl" />
                  <span className="text-white font-semibold text-sm sm:text-base">Manage Products</span>
                </div>
                <FaEye className="text-white/60" />
              </Link>
              
              <div className="text-white/60 text-xs sm:text-sm">
                • Add, edit, or delete products
                <br />
                • Manage product categories
                <br />
                • Update product availability
              </div>
            </div>
          </div>

          {/* Reviews Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">Reviews Management</h2>
              <Link
                to="/admin/reviews"
                className="bg-[#efac38] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#efac38]/80 transition-colors flex items-center space-x-2 text-sm sm:text-base"
              >
                <FaEye />
                <span>View All</span>
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaStar className="text-[#efac38] text-lg sm:text-xl" />
                  <span className="text-white font-semibold text-sm sm:text-base">Customer Reviews</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm sm:text-base">{stats.reviews}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Total Reviews</div>
                </div>
              </div>
              
              <div className="text-white/60 text-xs sm:text-sm">
                • Approve or reject reviews
                <br />
                • Manage review visibility
                <br />
                • Monitor customer feedback
              </div>
            </div>
          </div>

          {/* Inquiries Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">Inquiries Management</h2>
              <Link
                to="/admin/inquiries"
                className="bg-[#efac38] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#efac38]/80 transition-colors flex items-center space-x-2 text-sm sm:text-base"
              >
                <FaEye />
                <span>View All</span>
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-[#efac38] text-lg sm:text-xl" />
                  <span className="text-white font-semibold text-sm sm:text-base">Customer Inquiries</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm sm:text-base">{stats.inquiries}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Total Inquiries</div>
                </div>
              </div>
              
              <div className="text-white/60 text-xs sm:text-sm">
                • Respond to customer inquiries
                <br />
                • Mark inquiries as resolved
                <br />
                • Track inquiry status
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">System Settings</h2>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#efac38] rounded-lg flex items-center justify-center">
                <FaCog className="text-white text-lg sm:text-xl" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <FaUsers className="text-[#efac38] text-lg sm:text-xl" />
                  <span className="text-white font-semibold text-sm sm:text-base">User Management</span>
                </div>
                <div className="text-white/60 text-xs sm:text-sm">
                  Manage user accounts and permissions
                </div>
              </div>
              
              <div className="text-white/60 text-xs sm:text-sm">
                • User account management
                <br />
                • Role and permission settings
                <br />
                • System configuration
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 