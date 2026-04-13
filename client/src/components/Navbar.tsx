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
                <Link to="/" className="text-xl font-bold">
                    Sajilo Style 🛍️
                </Link>
                <div className="flex gap-6 items-center">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/" className="hover:text-gray-300">Product</Link>
                    <Link to="/cart" className="hover:text-gray-300 relative">
                        Cart
                        {cart.length > 0 && (
                            <span className="ml-1 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                        </>
                    ) : (
                        <>
                            <span className="text-sm text-gray-300"> Hi, {user.username || "User"}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded"
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