import { FaImages, FaCamera } from "react-icons/fa";

export default function Gallery() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Our Gallery
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            Explore our collection of professional audio equipment
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Placeholder Gallery Items */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <div className="text-center">
                  <FaCamera className="text-2xl sm:text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-2 sm:mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Gallery Image {item}</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Audio Equipment {item}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Professional audio equipment for your needs
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 sm:p-6 lg:p-8 border border-blue-200 dark:border-blue-800">
            <FaImages className="text-2xl sm:text-4xl text-blue-500 dark:text-blue-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              More Images Coming Soon
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              We're working on adding more gallery images. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}