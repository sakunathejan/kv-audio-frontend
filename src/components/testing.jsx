import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

export default function Testing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              React App is Working!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              If you can see this page, your React application is running correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                ✅ Frontend Status
              </h3>
              <p className="text-green-700 dark:text-green-300">
                React components are loading properly
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                🎨 Theme System
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                Light/Dark mode is working
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                📱 Responsive Design
              </h3>
              <p className="text-purple-700 dark:text-purple-300">
                Works on all devices
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                🚀 Performance
              </h3>
              <p className="text-orange-700 dark:text-orange-300">
                Fast and optimized
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FaInfoCircle className="text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white">Next Steps:</span>
            </div>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Navigate to the home page to see the full design</li>
              <li>• Try the theme toggle in the header</li>
              <li>• Check out the products page</li>
              <li>• Test the responsive design on different screen sizes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}