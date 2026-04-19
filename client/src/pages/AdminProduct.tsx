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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">
                    📦 Manage Products
                </h1>

                <button
                    onClick={() => navigate("/admin/add-product")}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    + Add Product
                </button>
            </div>

            <div className="flex gap-2 mb-6 max-w-md">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-white shadow outline-teal-500"
                />
            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-left">

                    <thead className="bg-gray-50 text-sm text-gray-600">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Category</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr
                                key={product._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-3">
                                    <img
                                        src={
                                            product.images?.[0] ||
                                            "https://placehold.co/60x60"
                                        }
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>

                                <td className="p-3 font-medium">
                                    {product.name}
                                </td>

                                <td className="p-3">
                                    ₹{product.price}
                                </td>

                                <td className="p-3">
                                    {product.stock}
                                </td>

                                <td className="p-3">
                                    {product.category}
                                </td>

                                <td className="p-3 text-right space-x-3">

                                    <button
                                        onClick={() =>
                                            navigate(`/admin/edit/${product._id}`)
                                        }
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="text-center p-6 text-gray-500">
                        No products found
                    </div>
                )}
            </div>
        </div>
    );
}