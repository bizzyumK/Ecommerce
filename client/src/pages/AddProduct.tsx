import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/product.api";

export default function AddProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        images: "",
        sizes: ""
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // convert string → array
            const payload = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
                images: form.images.split(",").map((img) => img.trim()),
                sizes: form.sizes.split(",").map((s) => s.trim())
            };

            await createProduct(payload);

            navigate("/admin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                ➕ Add Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                    placeholder="Image URLs (comma separated)"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="sizes"
                    value={form.sizes}
                    onChange={handleChange}
                    placeholder="Sizes (S, M, L...)"
                    className="w-full border p-2 rounded"
                />

                <button className="bg-black text-white px-4 py-2 rounded w-full">
                    Create Product
                </button>
            </form>
        </div>
    );
}