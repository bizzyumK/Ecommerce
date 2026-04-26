import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/product.api";

export default function AddProduct() {
    const navigate = useNavigate();
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        sizes: ""
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("price", String(form.price));
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("stock", String(form.stock));

            form.sizes.split(",").forEach((s) => {
                formData.append("sizes", s.trim());
            });

            images.forEach((img) => {
                formData.append("images", img);
            });

            await createProduct(formData);

            navigate("/admin/products");
        } catch (err) {
            console.log(err);
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">

                <button
                    onClick={() => navigate("/admin/products")}
                    className="text-sm sm:text-base text-gray-500 hover:text-gray-700 cursor-pointer w-fit"
                >
                    ← Back
                </button>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    Add Product
                </h1>

            </div>

            <div className="bg-white rounded-xl shadow p-4 sm:p-6">

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none"
                        />

                        <input
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Category (men, women, kids)"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none"
                        />

                        <input
                            name="sizes"
                            value={form.sizes}
                            onChange={handleChange}
                            placeholder="Sizes [S, M, L]"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none"
                        />

                    </div>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={4}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none resize-none"
                    />

                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:border-teal-500 focus:outline-none"
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="w-full sm:flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? "Creating..." : "Create Product"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}