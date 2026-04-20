import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/product.api";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<any>({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        images: "",
        sizes: ""
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await getProductById(id!);
            const product = res.data.data;
            setForm({
                name: product.name || "",
                price: product.price || "",
                description: product.description || "",
                category: product.category || "",
                stock: product.stock || "",
                images: product.images?.join(", ") || "",
                sizes: product.sizes?.join(", ") || ""
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
                images: form.images.split(",").map((img: string) => img.trim()),
                sizes: form.sizes.split(",").map((s: string) => s.trim())
            };
            await updateProduct(id!, payload);
            navigate("/admin/products");
        } catch (err) {
            console.log(err);
            alert("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    ← Back
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                    Edit Product
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none"
                        />

                        <input
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Category"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none"
                        />

                        <input
                            name="sizes"
                            value={form.sizes}
                            onChange={handleChange}
                            placeholder="Sizes (S, M, L)"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none"
                        />
                    </div>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={4}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none resize-none"
                    />

                    <input
                        name="images"
                        value={form.images}
                        onChange={handleChange}
                        placeholder="Image URLs (comma separated)"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-teal-500 focus:outline-none"
                    />

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}