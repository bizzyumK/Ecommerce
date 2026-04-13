import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="shadow-sm">
            <div className="max-w-[1420px] m-auto px-2 py-4 flex justify-between items-center">

                {/* LEFT - LOGO */}
                <Link to="/" className="text-xl font-bold">
                    Sajilo Style 🛍️
                </Link>

                {/* CENTER - NAV LINKS */}
                <div className="flex gap-6 items-center">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/products" className="hover:underline">Product</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>

                {/* RIGHT - ACTIONS */}
                <div className="flex gap-6 items-center">

                    {/* FAVORITES */}
                    <Link to="/favorites" className="hover:text-gray-600">
                        <i className="fa-regular fa-heart"></i>
                    </Link>

                    {/* CART */}
                    <Link to="/cart" className="hover:text-gray-600 relative">
                        <i className="fa-solid fa-cart-plus"></i>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {/* AUTH */}
                    {!user ? (
                        <Link
                            to="/login"
                            className="hover:text-gray-600 border border-gray-400 rounded-sm px-3 py-1"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <span className="text-sm text-gray-500">
                                Hi, {user.username || "User"}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded text-white"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}