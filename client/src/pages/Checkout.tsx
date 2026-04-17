import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/order.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
    const { cart, totalPrice } = useContext(CartContext);
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

            navigate("/");
        } catch (err: any) {
            console.log(err);
            alert(err?.response?.data?.message || "Order failed");
        }
    };

    return (
        <div className="min-h-screen h-[calc(100vh-66px)] bg-gray-100 p-6">
            <div className="max-w-[1420px] m-auto">

                <h1 className="text-3xl font-bold mb-6">
                    🧾 Checkout
                </h1>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* 🏠 ADDRESS */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Shipping Address
                        </h2>

                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your full address..."
                            className="w-full border p-3 rounded-md h-32"
                        />
                    </div>

                    {/* 💰 SUMMARY */}
                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        {cart.map((item: any) => (
                            <div
                                key={item._id}
                                className="flex justify-between mb-2 text-sm"
                            >
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>
                                    ₹{item.price * item.quantity}
                                </span>
                            </div>
                        ))}

                        <hr className="my-3" />

                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-2 rounded mt-4"
                        >
                            Place Order
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}