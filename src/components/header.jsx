import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCog, 
  FaBars,
  FaTimes,
  FaHome,
  FaEnvelope,
  FaImages,
  FaBox
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Header(){
    const { user, logout, isAdmin } = useAuth();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const navigationItems = [
        { to: "/", label: "Home", icon: FaHome },
        { to: "/contact", label: "Contact", icon: FaEnvelope },
        { to: "/gallery", label: "Gallery", icon: FaImages },
        { to: "/items", label: "Products", icon: FaBox },
    ];

    return(
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-3">
                            <img 
                                src="/logo.png" 
                                alt="KV Audio" 
                                className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
                            />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                KV Audio
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                            >
                                <item.icon className="text-sm" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side - Theme Toggle and User Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* User Menu */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    <FaUser className="text-gray-600 dark:text-gray-400" />
                                    <span className="font-medium text-gray-900 dark:text-white">{user.firstName}</span>
                                </button>
                                
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        <div className="py-2">
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                            </div>
                                            
                                            {isAdmin() && (
                                                <Link
                                                    to="/admin"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <FaCog className="mr-3" />
                                                    Admin Panel
                                                </Link>
                                            )}
                                            
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <FaSignOutAlt className="mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {showMobileMenu ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <nav className="flex flex-col space-y-3">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    <item.icon className="text-sm" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            {/* Close menu when clicking outside */}
            {(showUserMenu || showMobileMenu) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowUserMenu(false);
                        setShowMobileMenu(false);
                    }}
                />
            )}
        </header>
    )
}