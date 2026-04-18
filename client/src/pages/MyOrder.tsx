import { useEffect, useState } from "react";
import { getMyOrders } from "../api/order.api";

const MyOrder = () => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getMyOrders();
            setOrders(res.data.data || []);
        } catch (err) {
            console.log("Error fetching orders", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-355 m-auto">
                <h1 className="text-3xl font-bold mb-6">
                    📦 My Orders
                </h1>
                {orders.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        You have no orders yet 🥲
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white p-6 rounded-xl shadow"
                            >
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>
                                        <p className="font-medium">
                                            {order._id}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>
                                        <span className="font-medium capitalize">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {order.items.map((item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="flex justify-between border p-3 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {item.product.name|| "Product"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-medium">
                                                ₹{item.product?.price * item.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 border-t pt-4">
                                    <span className="font-semibold">
                                        Total
                                    </span>
                                    <span className="font-bold">
                                        ₹{order.totalPrice}
                                    </span>
                                </div>

                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrder;