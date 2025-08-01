import { useState } from "react";
import { inquiriesAPI } from "../../utils/api";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a unique ID for the inquiry
      const inquiryData = {
        ...formData,
        id: Date.now(), // Simple ID generation
      };
      
      await inquiriesAPI.create(inquiryData);
      setFormData({ email: "", phone: "", message: "" });
      alert("Thank you for your inquiry! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Contact Us</h1>
          <p className="text-white/80 text-base sm:text-lg">Get in touch with us for any questions or inquiries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#efac38] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-sm sm:text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">Email</h3>
                    <p className="text-white/70 text-xs sm:text-sm">info@kvaudio.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#efac38] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-sm sm:text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">Phone</h3>
                    <p className="text-white/70 text-xs sm:text-sm">+94 11 234 5678</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#efac38] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-sm sm:text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">Address</h3>
                    <p className="text-white/70 text-xs sm:text-sm">123 Audio Street, Colombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#efac38] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-white text-sm sm:text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">Business Hours</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-white/70 text-xs sm:text-sm">Sat: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Our Location</h3>
              <div className="w-full h-48 sm:h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-600 text-xs sm:text-sm text-center px-4">Map placeholder - Add your map integration here</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full h-12 sm:h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg px-3 sm:px-4 outline-none focus:border-[#efac38] transition-colors"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full h-12 sm:h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg px-3 sm:px-4 outline-none focus:border-[#efac38] transition-colors"
                  placeholder="+94 11 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full bg-white/20 border-2 border-white/30 rounded-lg text-white text-sm sm:text-lg px-3 sm:px-4 py-3 outline-none focus:border-[#efac38] transition-colors resize-none"
                  placeholder="Tell us about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 sm:h-[50px] bg-[#efac38] text-white text-sm sm:text-lg font-semibold rounded-lg hover:bg-[#efac38]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <FaPaperPlane />
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}