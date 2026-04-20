export default function About() {
  return (
    <div className="bg-gray-50 h-[calc(100vh-64px)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About This Project
          </h1>
          <div className="w-20 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to my e-commerce platform, a dynamic application built using the
            <span className="font-semibold text-teal-600"> MERN stack</span> (MongoDB, Express, React, Node.js).
            My project caters to both buyers and sellers by offering specialized pages and
            functionalities tailored for each user type.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-mobile-alt text-teal-600 text-sm"></i>
              </div>
              <span className="text-gray-700">Responsive and interactive user interface</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-lock text-teal-600 text-sm"></i>
              </div>
              <span className="text-gray-700">Secure authentication and user management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-chart-line text-teal-600 text-sm"></i>
              </div>
              <span className="text-gray-700">Dedicated seller dashboard for product management</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-shopping-cart text-teal-600 text-sm"></i>
              </div>
              <span className="text-gray-700">Streamlined shopping cart and checkout process</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-truck text-teal-600 text-sm"></i>
              </div>
              <span className="text-gray-700">Efficient order tracking and customer support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}