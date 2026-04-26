export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            About This Project
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8 mb-6">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Welcome to my e-commerce platform, a dynamic application built using the
            <span className="font-semibold text-teal-600"> MERN stack</span> (MongoDB, Express, React, Node.js).
            My project caters to both buyers and sellers by offering specialized pages and functionalities tailored for each user type.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-mobile-alt text-teal-600 text-xs sm:text-sm"></i>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">
                Responsive and interactive user interface
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-lock text-teal-600 text-xs sm:text-sm"></i>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">
                Secure authentication and user management
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-chart-line text-teal-600 text-xs sm:text-sm"></i>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">
                Dedicated seller dashboard for product management
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-shopping-cart text-teal-600 text-xs sm:text-sm"></i>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">
                Streamlined shopping cart and checkout process
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition sm:col-span-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-truck text-teal-600 text-xs sm:text-sm"></i>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">
                Efficient order tracking and customer support
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}