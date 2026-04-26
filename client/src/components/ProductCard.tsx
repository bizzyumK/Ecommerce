import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    product: any;
    addToCart: (product: any) => void;
};

export default function ProductCard({ product, addToCart }: Props) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleProductClick = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden flex flex-col h-full transition">

            <div
                className="relative aspect-[4/5] sm:aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden"
                onClick={handleProductClick}
            >
                <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-2 sm:p-3 flex flex-col flex-1">

                <h3
                    className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 line-clamp-1 cursor-pointer hover:text-teal-600"
                    onClick={handleProductClick}
                >
                    {product.name}
                </h3>

                <p
                    className="hidden sm:block text-xs text-gray-500 line-clamp-2 mt-1"
                    onClick={handleProductClick}
                >
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                    <p className="text-xs sm:text-sm md:text-lg font-bold text-teal-600">
                        Rs {product.price.toLocaleString()}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-teal-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-teal-800 transition"
                    >
                        Add
                    </button>
                </div>

            </div>
        </div>
    );
}