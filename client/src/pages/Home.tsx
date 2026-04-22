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
            <section className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block">
                                <span className="bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-full">
                                    New Collection 2026
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Discover Amazing <span className="text-teal-600">Fashion </span>for Your Style
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg">
                                Elevate your everyday wardrobe with our premium selection of clothing designed for modern living.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="bg-teal-600 text-white px-8 py-3 cursor-pointer rounded-lg font-semibold hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg"
                                    onClick={() => navigate("/products")}>
                                    Shop Now
                                </button>
                                <button className="border-2 border-gray-900 text-gray-900 cursor-pointer px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all transform hover:scale-105"
                                    onClick={() => navigate("/products")}>
                                    View Collections
                                </button>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md lg:max-w-lg">
                                {/* Decorative circles */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-50"></div>

                                <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                                    <img
                                        src="/banner_logo.svg"
                                        alt="Hero Fashion"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                {/* Floating elements */}
                                <div className="absolute -top-5 -right-5 bg-white rounded-full p-3 shadow-lg animate-bounce">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                                        👕
                                    </div>
                                </div>
                                <div className="absolute -bottom-5 -left-5 bg-white rounded-full p-3 shadow-lg animate-bounce delay-150">
                                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-xl">
                                        👖
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="mb-16 md:mb-20">
                    <Section
                        title="Featured Products"
                        products={products}
                        addToCart={addToCart}
                        onViewMore={() => navigate("/products")}
                    />
                </div>

                <div className="mb-8">
                    <Section
                        title="Limited Offers"
                        products={products}
                        addToCart={addToCart}
                        onViewMore={() => navigate("/products")}
                    />
                </div>
            </div>
        </div>
    );
}