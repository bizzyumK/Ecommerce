import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-355 m-auto">
                {/* HEADER */}
                <h1 className="text-3xl font-bold mb-6">
                    👑 Admin Panel
                </h1>

                <div className="grid md:grid-cols-4 gap-6">

                    {/* 📚 SIDEBAR */}
                    <div className="bg-white p-4 rounded-xl shadow h-fit">
                        <h2 className="font-semibold mb-4">Menu</h2>

                        <div className="flex flex-col gap-3 text-sm">
                            <button className="text-left hover:text-black text-gray-600">
                                📦 Products
                            </button>
                            <button className="text-left hover:text-black text-gray-600">
                                📑 Orders
                            </button>
                            <button className="text-left hover:text-black text-gray-600">
                                📊 Dashboard
                            </button>
                        </div>
                    </div>

                    {/* 📦 MAIN CONTENT */}
                    <div className="md:col-span-3 space-y-6">

                        {/* 🔢 STATS */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow text-center">
                                <p className="text-gray-500 text-sm">Products</p>
                                <h2 className="text-xl font-bold">
                                    {products.length}
                                </h2>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow text-center">
                                <p className="text-gray-500 text-sm">Orders</p>
                                <h2 className="text-xl font-bold">--</h2>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow text-center">
                                <p className="text-gray-500 text-sm">Revenue</p>
                                <h2 className="text-xl font-bold">₹--</h2>
                            </div>
                        </div>

                        {/* 📦 PRODUCT SECTION */}
                        <div className="bg-white p-6 rounded-xl shadow">

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Products
                                </h2>

                                <button
                                    onClick={() => navigate("/admin/add-product")}
                                    className="bg-black text-white px-4 py-2 rounded"
                                >
                                    + Add Product
                                </button>
                            </div>

                            {/* PRODUCT LIST */}
                            <div className="space-y-3">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center justify-between border p-3 rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">

                                            <img
                                                src={product.images?.[0]}
                                                className="w-12 h-12 object-cover rounded"
                                            />

                                            <div>
                                                <p className="font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    ₹{product.price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/edit/${product._id}`)
                                                }
                                                className="text-blue-500 text-sm"
                                            >
                                                Edit
                                            </button>

                                            <button className="text-red-500 text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;