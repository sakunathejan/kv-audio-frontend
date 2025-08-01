import { useState } from "react";
import "./register.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-sm sm:max-w-[500px] backdrop-blur-xl rounded-2xl p-6 sm:p-8 relative">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <img
            src="/logo.png"
            alt="logo"
            className="w-16 h-16 sm:w-[100px] sm:h-[100px] object-cover mx-auto mb-3 sm:mb-4"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Create Account</h2>
          <p className="text-white/80 text-sm sm:text-base">Join our community today</p>
        </div>

        <form onSubmit={handleOnSubmit} className="space-y-3 sm:space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm sm:text-base" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full h-11 sm:h-[45px] bg-transparent border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg pl-10 sm:pl-12 pr-4 outline-none focus:border-white transition-colors"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm sm:text-base" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full h-11 sm:h-[45px] bg-transparent border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg pl-10 sm:pl-12 pr-4 outline-none focus:border-white transition-colors"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm sm:text-base" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full h-11 sm:h-[45px] bg-transparent border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg pl-10 sm:pl-12 pr-4 outline-none focus:border-white transition-colors"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm sm:text-base" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full h-11 sm:h-[45px] bg-transparent border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg pl-10 sm:pl-12 pr-12 outline-none focus:border-white transition-colors"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash className="text-sm sm:text-base" /> : <FaEye className="text-sm sm:text-base" />}
            </button>
          </div>

          {/* Address */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm sm:text-base" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full h-11 sm:h-[45px] bg-transparent border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg pl-10 sm:pl-12 pr-4 outline-none focus:border-white transition-colors"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm sm:text-base" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full h-11 sm:h-[45px] bg-transparent border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg pl-10 sm:pl-12 pr-4 outline-none focus:border-white transition-colors"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 sm:h-[50px] bg-[#efac38] text-lg sm:text-xl text-white rounded-lg font-semibold hover:bg-[#efac38]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/80 text-sm sm:text-base">
              Already have an account?{" "}
              <Link to="/login" className="text-[#efac38] hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
