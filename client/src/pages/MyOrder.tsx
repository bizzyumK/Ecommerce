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
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center py-16 sm:py-20 bg-white rounded-2xl shadow-md">
                        <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                            You have no orders yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">

                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden">

                                <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-500">Order ID</p>
                                            <p className="text-sm sm:text-base font-medium text-gray-800 break-all">
                                                {order._id}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-500">Order Date</p>
                                            <p className="text-sm sm:text-base font-medium text-gray-800">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-500">Status</p>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${order.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : order.status === "shipped"
                                                            ? "bg-blue-500"
                                                            : "bg-green-500"
                                                    }`} />
                                                <span className="text-sm sm:text-base font-medium capitalize text-gray-800">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">

                                    <div className="space-y-3">

                                        {order.items.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                                            >

                                                <div className="flex-1">
                                                    <p className="text-sm sm:text-base font-medium text-gray-800">
                                                        {item.product?.name || "Product"}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>

                                                <p className="text-sm sm:text-base font-semibold text-gray-900">
                                                    ₹{(item.product?.price * item.quantity).toLocaleString()}
                                                </p>

                                            </div>
                                        ))}

                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">

                                        <span className="text-sm sm:text-base font-semibold text-gray-800">
                                            Total Amount
                                        </span>

                                        <span className="text-lg sm:text-xl font-bold text-teal-600">
                                            ₹{order.totalPrice.toLocaleString()}
                                        </span>

                                    </div>

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