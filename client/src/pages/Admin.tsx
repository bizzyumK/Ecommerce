import { useState, useEffect } from "react";
import { getProducts } from "../api/product.api";

const Admin = () => {
    const [products, setProducts] = useState<any[]>([]);
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