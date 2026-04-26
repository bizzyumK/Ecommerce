import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/product.api";
import { CartContext } from "../context/CartContext";
import Section from "../components/Section";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getProducts();
            const allProducts = res.data.data;
            setProducts(allProducts.slice(0, 4));
        } catch (err) {
            console.log("Error fetching products", err);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6 text-center lg:text-left">
                            <span className="inline-block bg-gray-800 text-white text-xs sm:text-sm px-4 py-2 rounded-full">
                                New Collection 2026
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Discover Amazing <span className="text-teal-600">Fashion</span> for Your Style
                            </h1>
                            <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
                                Elevate your everyday wardrobe with premium clothing designed for modern living.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                                >
                                    Shop Now
                                </button>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition"
                                >
                                    View Collections
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                                <img
                                    src="/banner_logo.svg"
                                    alt="Hero Fashion"
                                    className="w-full h-auto rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Section
                    title="Featured Products"
                    products={products}
                    addToCart={addToCart}
                    onViewMore={() => navigate("/products")}
                />
            </div>
        </div>
    );
}