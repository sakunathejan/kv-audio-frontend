import "./login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          {/* Logo and Header */}
          <div className="text-center mb-6 sm:mb-8">
            <img src="/logo.png" alt="logo" className="w-16 h-16 sm:w-20 sm:h-20 object-cover mx-auto mb-3 sm:mb-4 rounded-full border-4 border-gray-200 dark:border-gray-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-[45px] sm:h-[50px] bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm sm:text-lg pl-12 pr-4 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[45px] sm:h-[50px] bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm sm:text-lg pl-12 pr-12 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[45px] sm:h-[50px] bg-blue-600 text-sm sm:text-xl text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}