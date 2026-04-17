import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const {
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        totalPrice,
    } = useContext(CartContext);

    return (

        <div className="h-[calc(100vh-66px)] bg-gray-100 p-6">
            <div className="max-w-[1420px] m-auto">
                <h1 className="text-3xl font-bold mb-6">
                    Your Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        Your cart is empty 🥲
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">

                            {cart.map((item: any) => (
                                <div
                                    key={item._id}
                                    className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
                                >
                                    <img
                                        src={item.images?.[0]}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h2 className="font-semibold">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-500">
                                            ₹{item.price}
                                        </p>

                                        {/* QTY CONTROLS */}
                                        <div className="flex items-center gap-2 mt-2">

                                            <button
                                                onClick={() => decreaseQty(item._id)}
                                                className="px-2 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button
                                                onClick={() => addToCart(item)}
                                                className="px-2 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow h-fit">

                            <h2 className="text-xl font-bold mb-4">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-2">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <button className="w-full bg-black text-white py-2 rounded mt-4">
                                Checkout
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}