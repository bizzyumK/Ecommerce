import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="shadow-sm bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Sajilo Style 🛍️
                </Link>
                <div className="flex gap-6 items-center">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/products" className="hover:underline">Product</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>

                <div className="flex gap-6 items-center relative">

                    <Link to="/favorites" className="hover:text-gray-600">
                        <i className="fa-regular fa-heart"></i>
                    </Link>

                    <Link to="/cart" className="hover:text-gray-600 relative">
                        <i className="fa-solid fa-cart-plus"></i>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <Link
                            to="/login"
                            className="hover:text-gray-600 border border-gray-400 rounded-sm px-3 py-1"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="text-sm text-gray-600 hover:text-black"
                            >
                                Hi, {user.username || "User"} ⌄
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">

                                    <button
                                        onClick={() => {
                                            navigate("/my-orders");
                                            setOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        My Orders
                                    </button>

                                    {/* 👑 ADMIN ONLY */}
                                    {user.isAdmin && (
                                        <button
                                            onClick={() => {
                                                navigate("/admin");
                                                setOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Admin Panel
                                        </button>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}