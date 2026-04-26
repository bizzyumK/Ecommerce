import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <h3 className="text-xl font-bold text-teal-600 mb-2">
                            Sajilo Style
                        </h3>
                        <p className="text-gray-500 text-sm">
                            My personal project for fashion and lifestyle.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-500 text-sm hover:text-teal-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-500 text-sm hover:text-teal-600">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-500 text-sm hover:text-teal-600">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-500 text-sm hover:text-teal-600">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">
                            Connect
                        </h4>

                        <div className="flex gap-4 mb-3">
                            <a href="https://www.instagram.com/bigyam_karmacharya/" className="text-gray-400 hover:text-teal-600">
                                <i className="fa-brands fa-instagram text-xl"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/bigyam-karmacharya-7274a036a" className="text-gray-400 hover:text-teal-600">
                                <i className="fa-brands fa-linkedin-in text-xl"></i>
                            </a>
                            <a href="https://github.com/bizzyumK" className="text-gray-400 hover:text-teal-600">
                                <i className="fa-brands fa-github text-xl"></i>
                            </a>
                        </div>

                        <p className="text-gray-500 text-sm break-all">
                            <i className="fa-regular fa-envelope mr-2"></i>
                            bigyamkarmacharya@gmail.com
                        </p>
                    </div>

                </div>

                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-xs">
                        © 2026 Sajilo Style. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}