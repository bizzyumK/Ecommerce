import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/order.api";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [search, setSearch] = useState("");

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

    const filteredOrders = orders.filter((order) =>
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        order.user?.username?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Orders
                </h1>

                <input
                    type="text"
                    placeholder="Search by Order ID or Customer Name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                />
            </div>

            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow p-4">
                        <div className="mb-3 pb-3 border-b">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                                <div>
                                    <p className="text-xs text-gray-500">Order ID</p>
                                    <p className="text-sm font-mono">
                                        {order._id.slice(-8)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Customer</p>
                                    <p className="text-sm font-medium">
                                        {order.user?.username || "Unknown"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${order.status === 'pending' ? 'bg-yellow-500' :
                                                order.status === 'shipped' ? 'bg-blue-500' :
                                                    'bg-green-500'
                                            }`} />
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="text-sm border rounded px-2 py-1 cursor-pointer"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {order.address && (
                                <div className="mt-2 p-2 bg-gray-50 rounded">
                                    <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                                    <p className="text-sm">{order.address}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-2">Items</p>
                            <div className="space-y-1">
                                {order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>
                                            {item.product?.name}
                                            <span className="text-gray-400 ml-1">x{item.quantity}</span>
                                        </span>
                                        <span>
                                            ₹{(item.product?.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between pt-3 border-t">
                            <span className="font-semibold">Total Amount</span>
                            <span className="font-bold text-teal-600">
                                ₹{order.totalPrice?.toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No orders found
                    </div>
                )}
            </div>
        </div>
    );
}