import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setOpenDropdown(false);
        navigate("/login");
    };

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Shop", to: "/products" },
        { name: "Contact", to: "/contact" },
        { name: "About", to: "/about" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors font-mero"
                    >
                        Sajilo Style
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="text-gray-700 hover:text-teal-600 text-sm font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-6 relative">
                        <Link to="/cart" className="relative text-gray-700 hover:text-teal-600 transition-colors">
                            <i className="fa-solid fa-cart-shopping text-lg"></i>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 py-0.5 rounded-full text-white min-w-4.5 text-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {!user ? (
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition transform hover:scale-105"
                            >
                                Sign In
                            </button>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    <i className="fa-solid fa-circle-user text-teal-600 text-lg"></i>
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.username || "User"}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {openDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setOpenDropdown(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fadeIn">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        navigate("/my-orders");
                                                        setOpenDropdown(false);
                                                    }}
                                                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                >
                                                    <i className="fa-solid fa-box text-gray-400"></i>
                                                    <span>My Orders</span>
                                                </button>

                                                {user.isAdmin && (
                                                    <button
                                                        onClick={() => {
                                                            navigate("/admin");
                                                            setOpenDropdown(false);
                                                        }}
                                                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        <i className="fa-solid fa-chart-line text-gray-400"></i>
                                                        <span>Admin Panel</span>
                                                    </button>
                                                )}

                                                <div className="border-t border-gray-100 my-1"></div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                >
                                                    <i className="fa-solid fa-sign-out-alt"></i>
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-700 hover:text-teal-600 transition-colors text-2xl"
                        >
                            {isMobileMenuOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white border-t border-gray-100`}>
                <div className="px-4 pt-2 pb-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="block px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        to="/cart"
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Cart ({cart.length})</span>
                    </Link>

                    {!user ? (
                        <button
                            onClick={() => {
                                navigate("/login");
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition mt-2"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="space-y-1 pt-2">
                            <div className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">
                                Signed in as <span className="font-medium text-gray-700">{user.username}</span>
                            </div>
                            <button
                                onClick={() => {
                                    navigate("/my-orders");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <i className="fa-solid fa-box"></i>
                                <span>My Orders</span>
                            </button>

                            {user.isAdmin && (
                                <button
                                    onClick={() => {
                                        navigate("/admin");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <i className="fa-solid fa-chart-line"></i>
                                    <span>Admin Panel</span>
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <i className="fa-solid fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;