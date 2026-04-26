import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api/product.api";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
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

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this product?")) return;

        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    Products
                </h1>
                <button
                    onClick={() => navigate("/admin/add-product")}
                    className="w-full sm:w-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition cursor-pointer flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i>
                    Add Product
                </button>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-sm sm:text-base"
                />
            </div>
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-3 text-xs sm:text-sm font-medium text-gray-600">Image</th>
                            <th className="p-3 text-xs sm:text-sm font-medium text-gray-600">Name</th>
                            <th className="p-3 text-xs sm:text-sm font-medium text-gray-600">Price</th>
                            <th className="p-3 text-xs sm:text-sm font-medium text-gray-600">Stock</th>
                            <th className="p-3 text-xs sm:text-sm font-medium text-gray-600">Category</th>
                            <th className="p-3 text-xs sm:text-sm font-medium text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <img
                                        src={product.images[0]?.url}
                                        alt={product.name}
                                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="p-3 text-sm sm:text-base font-medium text-gray-800 whitespace-nowrap">
                                    {product.name}
                                </td>
                                <td className="p-3 text-sm sm:text-base text-teal-600 font-semibold whitespace-nowrap">
                                    ₹{product.price}
                                </td>
                                <td className="p-3 text-sm sm:text-base text-gray-600">
                                    {product.stock}
                                </td>
                                <td className="p-3">
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 whitespace-nowrap">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-3 text-right space-x-2 whitespace-nowrap">
                                    <button
                                        onClick={() => navigate(`/admin/edit/${product._id}`)}
                                        className="text-teal-600 hover:text-teal-800 transition cursor-pointer p-1"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 hover:text-red-700 transition cursor-pointer p-1"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="text-center py-8 text-sm sm:text-base text-gray-500">
                        No products found
                    </div>
                )}
            </div>
        </div>
    );
}