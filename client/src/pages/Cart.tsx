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

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Your Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center py-16 sm:py-20">
                        <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                            Your cart is empty
                        </p>

                        <button
                            onClick={() => navigate("/products")}
                            className="mt-5 sm:mt-6 bg-teal-600 text-white px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                        {/* CART ITEMS */}
                        <div className="lg:col-span-2 space-y-4">

                            {cart.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md p-3 sm:p-4 flex gap-3 sm:gap-4 items-center transition"
                                >

                                    <img
                                        src={item.images[0].url || "https://placehold.co/100x100"}
                                        alt={item.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">

                                        <h2 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">
                                            {item.name}
                                        </h2>

                                        {item.selectedSize && (
                                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                Size: {item.selectedSize}
                                            </p>
                                        )}

                                        <p className="text-teal-600 font-bold text-base sm:text-lg md:text-xl mt-1">
                                            Rs {item.price.toLocaleString()}
                                        </p>

                                        <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">

                                            <button
                                                onClick={() => decreaseQty(item._id)}
                                                className="w-7 h-7 sm:w-8 sm:h-8 border rounded-md hover:bg-gray-100 transition font-semibold"
                                            >
                                                -
                                            </button>

                                            <span className="text-sm sm:text-base font-medium min-w-6 text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-7 h-7 sm:w-8 sm:h-8 border rounded-md hover:bg-gray-100 transition font-semibold"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <i className="fa-regular fa-trash-can text-sm sm:text-base"></i>
                                    </button>

                                </div>
                            ))}

                        </div>

                        {/* SUMMARY */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 sticky top-20">

                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                                    Order Summary
                                </h2>

                                <div className="flex justify-between text-gray-600 text-sm sm:text-base mb-5">
                                    <span>Total</span>
                                    <span>Rs {totalPrice.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full bg-teal-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="w-full mt-3 text-gray-500 py-2 text-sm sm:text-base hover:text-gray-700 transition"
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