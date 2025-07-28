import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productsAPI } from "../../utils/api";
import { FaPlus, FaArrowLeft, FaUpload } from "react-icons/fa";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    key: "",
    name: "",
    price: "",
    category: "audio",
    dimensions: "",
    description: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleAddItem() {
    if (!formData.key || !formData.name || !formData.price || !formData.dimensions || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    if (productImages.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setLoading(true);

    try {
      // Upload images
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        const promise = mediaUpload(productImages[i]);
        promises.push(promise);
      }

      const imageUrls = await Promise.all(promises);

      // Create product
      await productsAPI.create({
        ...formData,
        price: Number(formData.price),
        image: imageUrls,
      });

      navigate("/admin/items");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate("/admin/items")}
              className="text-white hover:text-[#efac38] transition-colors"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h1 className="text-4xl font-bold text-white">Add New Product</h1>
          </div>
          <p className="text-white/80">Add a new audio equipment to your inventory</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }} className="space-y-6">
            {/* Product Key */}
            <div>
              <label className="block text-white font-semibold mb-2">Product Key *</label>
              <input
                type="text"
                name="key"
                placeholder="Enter unique product key"
                value={formData.key}
                onChange={handleChange}
                className="w-full h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 outline-none focus:border-[#efac38] transition-colors"
                required
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-white font-semibold mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 outline-none focus:border-[#efac38] transition-colors"
                required
              />
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Price (Rs.) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 outline-none focus:border-[#efac38] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 outline-none focus:border-[#efac38] transition-colors"
                  required
                >
                  <option value="audio" className="bg-accent text-white">Audio Equipment</option>
                  <option value="lights" className="bg-accent text-white">Lighting</option>
                  <option value="speakers" className="bg-accent text-white">Speakers</option>
                  <option value="microphones" className="bg-accent text-white">Microphones</option>
                  <option value="amplifiers" className="bg-accent text-white">Amplifiers</option>
                  <option value="accessories" className="bg-accent text-white">Accessories</option>
                </select>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-white font-semibold mb-2">Dimensions *</label>
              <input
                type="text"
                name="dimensions"
                placeholder="e.g., 10x5x3 inches"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full h-[50px] bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 outline-none focus:border-[#efac38] transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                placeholder="Enter product description..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-white/20 border-2 border-white/30 rounded-lg text-white text-lg px-4 py-3 outline-none focus:border-[#efac38] transition-colors resize-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-white font-semibold mb-2">Product Images *</label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                <FaUpload className="text-white text-3xl mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  onChange={(e) => setProductImages(Array.from(e.target.files))}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-[#efac38] text-white px-6 py-3 rounded-lg hover:bg-[#efac38]/80 transition-colors inline-block"
                >
                  Choose Images
                </label>
                <p className="text-white/60 mt-2">
                  {productImages.length > 0 
                    ? `${productImages.length} image(s) selected`
                    : "Select one or more images"
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#efac38] text-white py-4 rounded-lg font-semibold hover:bg-[#efac38]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <FaPlus />
                <span>{loading ? "Adding Product..." : "Add Product"}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/items")}
                className="flex-1 bg-white/20 text-white py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
