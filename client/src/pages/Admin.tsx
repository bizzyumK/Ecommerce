import { useState, useEffect } from "react";
import { getProducts } from "../api/product.api";
import { getAllOrders } from "../api/order.api";

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
            const res = await getAllOrders();
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-5">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

                {statsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-500 text-xs sm:text-sm mb-1">
                                    {card.title}
                                </p>
                                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                    {card.value}
                                </p>
                            </div>

                            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                                <i className={`${card.icon} ${card.iconColor} text-base sm:text-xl`}></i>
                            </div>

                        </div>
                    </div>
                ))}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                        Monthly Sales
                    </h3>

                    <div
                        className="flex-1 bg-cover bg-center rounded-lg"
                        style={{
                            backgroundImage: "url('/bar_diagram.jpg')",
                            minHeight: "250px"
                        }}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">
                        Sales Distribution
                    </h3>

                    <div
                        className="flex-1 bg-contain bg-no-repeat bg-center rounded-lg"
                        style={{
                            backgroundImage: "url('/pie_chart.jpg')",
                            minHeight: "250px"
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default Admin;