import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const {
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        totalPrice,
    } = useContext(CartContext);

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Your Cart
                </h1>
                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                        <button
                            onClick={() => navigate("/products")}
                            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition"
                                >
                                    <img
                                        src={item.images?.[0] || "https://placehold.co/100x100"}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h2 className="font-semibold text-lg text-gray-800">
                                            {item.name}
                                        </h2>
                                        {item.selectedSize && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Size: {item.selectedSize}
                                            </p>
                                        )}
                                        <p className="text-teal-600 font-bold text-xl mt-1">
                                            Rs {item.price.toLocaleString()}
                                        </p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <button
                                                onClick={() => decreaseQty(item._id)}
                                                className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold cursor-pointer"
                                            > - </button>
                                            <span className="font-medium min-w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold cursor-pointer"
                                            > + </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 transition p-2 cursor-pointer"
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total</span>
                                        <span>Rs {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition transform hover:scale-[1.02] cursor-pointer"
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="w-full mt-3 text-gray-500 py-2 rounded-lg font-medium hover:text-gray-700 transition cursor-pointer"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}