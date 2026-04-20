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
        <div
            className="group relative bg-white rounded-2xl shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative overflow-hidden bg-gray-100 cursor-pointer shrink-0"
                onClick={handleProductClick}
            >
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-64 w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4 flex flex-col grow">
                <h3
                    className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1 cursor-pointer hover:text-teal-600 transition-colors"
                    onClick={handleProductClick}
                >
                    {product.name}
                </h3>
                <div className="grow">
                    <p
                        className="text-gray-500 text-sm line-clamp-2 cursor-pointer hover:text-gray-700 transition-colors"
                        onClick={handleProductClick}
                    >
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3 mt-3 pt-2 border-t border-gray-100">
                    <p className="font-bold text-xl text-teal-600">
                        Rs {product.price.toLocaleString()}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className={`
                            relative overflow-hidden
                            bg-teal-600 text-white px-4 py-2 rounded-lg 
                            transition-all duration-300 ease-in-out
                            hover:bg-teal-800 hover:shadow-lg
                            transform hover:scale-105
                            cursor-pointer whitespace-nowrap
                            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                        `}
                    >
                        <i className="fa-solid fa-bag-shopping mr-2"></i>
                        <span className="relative z-10">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}