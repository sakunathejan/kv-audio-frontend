import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Professional
              <span className="text-blue-600 dark:text-blue-400"> Audio</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Equipment
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Discover high-quality audio equipment for professionals and enthusiasts. 
              From microphones to speakers, we have everything you need for perfect sound.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/items"
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Browse Products
              </Link>
              <Link
                to="/contact"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Why Choose KV Audio?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              We provide the best audio equipment for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🎧</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Professional Quality
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                High-quality audio equipment designed for professionals
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🎤</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Crystal Clear Sound
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Experience crystal clear audio with our premium equipment
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🔊</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Powerful Performance
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Powerful speakers and amplifiers for any venue
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">💡</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Expert Support
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Get expert advice and support from our team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
            Explore our collection of professional audio equipment and find the perfect solution for your needs.
          </p>
          <Link
            to="/items"
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}