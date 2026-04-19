import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/order.api";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            setOrders(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateOrderStatus(id, status);
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === id ? { ...o, status } : o
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                📑 All Orders
            </h1>

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

                                <p className="text-sm text-gray-500 mt-2">
                                    User
                                </p>
                                <p>
                                    {order.user?.username || "Unknown"}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order._id, e.target.value)
                                    }
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {order.items.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex justify-between border p-3 rounded"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.product?.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p>
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
        </div>
    );
}