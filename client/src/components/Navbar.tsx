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
                        className="text-2xl font-bold text-gray-800 hover:text-gray-600"
                    >
                        Sajilo Style️
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="text-gray-700 hover:text-black text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-6 relative">
                        <Link to="/cart" className="relative text-gray-700 text-sm">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full text-white">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        {!user ? (
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
                            >
                                Sign In
                            </button>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                    className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-circle-user text-sm"></i>
                                    <p className="text-sm">{user.username || "User"} ⌄</p>
                                </button>
                                {openDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                                        <button
                                            onClick={() => {
                                                navigate("/my-orders");
                                                setOpenDropdown(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            My Orders
                                        </button>

                                        {user.isAdmin && (
                                            <button
                                                onClick={() => {
                                                    navigate("/admin");
                                                    setOpenDropdown(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                Admin Panel
                                            </button>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-700 text-2xl"
                        >
                            {isMobileMenuOpen ? "✖" : "☰"}
                        </button>
                    </div>

                </div>
            </div>

            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
                <div className="px-3 pt-2 pb-4 space-y-2">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        to="/cart"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        🛒 Cart ({cart.length})
                    </Link>

                    {!user ? (
                        <button
                            onClick={() => {
                                navigate("/login");
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-gray-900 text-white px-4 py-2 rounded-md"
                        >
                            Sign In
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    navigate("/my-orders");
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                            >
                                My Orders
                            </button>

                            {user.isAdmin && (
                                <button
                                    onClick={() => {
                                        navigate("/admin");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                >
                                    Admin Panel
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;