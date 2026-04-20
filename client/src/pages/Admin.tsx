import { useState, useEffect } from "react";
import { getProducts } from "../api/product.api";
import { getMyOrders } from "../api/order.api";

const Admin = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await getMyOrders();
            setOrders(res.data.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    const statsCards = [
        {
            title: "Total Products",
            value: products.length,
            icon: "fa-solid fa-box",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Total Orders",
            value: orders.length,
            icon: "fa-solid fa-truck",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Total Revenue",
            value: "₹--",
            icon: "fa-solid fa-rupee-sign",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">
                                    {card.title}
                                </p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {card.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                                <i className={`${card.icon} ${card.iconColor} text-xl`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                    <h3 className="text-md font-semibold text-gray-800 mb-3"> Monthly Sales </h3>
                    <div
                        className="flex-1 bg-cover bg-center rounded-lg"
                        style={{
                            backgroundImage: "url('/bar_diagram.jpg')",
                            minHeight: "350px"
                        }}
                    />
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                    <h3 className="text-md font-semibold text-gray-800 mb-3"> Sales Distribution </h3>
                    <div
                        className="flex-1 bg-contain bg-no-repeat bg-center rounded-lg"
                        style={{
                            backgroundImage: "url('/pie_chart.jpg')",
                            minHeight: "350px"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Admin;