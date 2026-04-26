import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/order.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState("");

    const handleCheckout = async () => {
        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        if (!address) {
            alert("Address is required");
            return;
        }

        try {
            const items = cart.map((item: any) => ({
                product: item._id,
                quantity: item.quantity,
            }));

            await createOrder({ items, address });

            alert("Order placed successfully");
            clearCart();
            navigate("/");
        } catch (err: any) {
            console.log(err);
            alert(err?.response?.data?.message || "Order failed");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                        <button
                            onClick={() => navigate("/products")}
                            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Checkout
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                            Shipping Address
                        </h2>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your full address..."
                            className="w-full border-2 border-gray-300 rounded-xl p-3 sm:p-4 h-28 sm:h-36 focus:border-teal-500 focus:outline-none transition text-sm sm:text-base"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                            Order Summary
                        </h2>
                        <div className="space-y-3 max-h-72 sm:max-h-96 overflow-y-auto mb-5">
                            {cart.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between items-start gap-3 py-2 border-b border-gray-100"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800 text-sm sm:text-base">
                                            {item.name}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Qty: {item.quantity}
                                            {item.selectedSize && ` | Size: ${item.selectedSize}`}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 flex justify-between items-center">
                            <span className="text-base sm:text-lg font-semibold text-gray-900">
                                Total
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-teal-600">
                                ₹{totalPrice.toLocaleString()}
                            </span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-teal-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-teal-700 transition mt-5"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}