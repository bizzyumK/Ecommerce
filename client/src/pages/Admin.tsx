import { useState, useEffect } from "react";
import { getProducts } from "../api/product.api";
import { useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-white shadow-md p-6 flex flex-col gap-6">
                <h1 className="text-2xl font-bold">
                    👑 Admin
                </h1>

                <div className="flex flex-col gap-2 text-sm">

                    <button
                        onClick={() => navigate("/admin/products")}
                        className={`text-left px-3 py-2 rounded-lg transition ${location.pathname === "/admin/products"
                            ? "bg-black text-white"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        📦 Products
                    </button>

                    <button
                        onClick={() => navigate("/admin/orders")}
                        className={`text-left px-3 py-2 rounded-lg transition ${location.pathname === "/admin/orders"
                            ? "bg-black text-white"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        📑 Orders
                    </button>
                </div>
            </div>

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm mb-2">
                            📦 Products
                        </p>
                        <h2 className="text-2xl font-bold">
                            {products.length}
                        </h2>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm mb-2">
                            📑 Orders
                        </p>
                        <h2 className="text-2xl font-bold">
                            --
                        </h2>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <p className="text-gray-500 text-sm mb-2">
                            💰 Revenue
                        </p>
                        <h2 className="text-2xl font-bold">
                            ₹--
                        </h2>
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-2">
                        Welcome back 👋
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Manage your store using the sidebar. Track products,
                        monitor orders, and keep everything running smoothly.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Admin;