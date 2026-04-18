import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/product.api";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<any>({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await getProductById(id!);
            setForm(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await updateProduct(id!, form);
            navigate("/admin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                ✏️ Edit Product
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

                <button className="bg-black text-white px-4 py-2 rounded">
                    Update Product
                </button>
            </form>
        </div>
    );
}