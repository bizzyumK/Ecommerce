import { useNavigate } from "react-router-dom";

type Props = {
    product: any;
    addToCart: (product: any) => void;
};

export default function ProductCard({ product, addToCart }: Props) {
    const navigate = useNavigate();

    return (
        <div className="border rounded-xl shadow hover:shadow-lg transition p-3">
            <img
                src={product.images?.[0] || "https://placehold.co/300x400"}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
            />
            <div className="mt-3">
                <h2 className="font-semibold text-lg line-clamp-1">
                    {product.name}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2">
                    {product.description}
                </p>

                <p className="font-bold mt-2">
                    ₹{product.price}
                </p>
            </div>
            <div className="flex gap-2 mt-3">
                <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded"
                >
                    View
                </button>

                <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-green-500 text-white py-1 rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
}