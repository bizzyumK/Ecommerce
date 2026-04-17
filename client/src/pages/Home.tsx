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
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-355 m-auto">
                <div className="bg-gray-900 text-white rounded-2xl p-12 mb-10 text-center shadow">
                    <h1 className="text-4xl font-bold mb-4">
                        🔥 New Fashion Drop
                    </h1>
                    <p className="mb-6 text-gray-300">
                        Upgrade your style with our latest collection
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-white text-black px-6 py-2 rounded-lg font-semibold"
                    >
                        Shop Now
                    </button>
                </div>

                <Section
                    title="Featured Products"
                    products={products}
                    addToCart={addToCart}
                    onViewMore={() => navigate("/products")}
                />
                <Section
                    title="Limited Offers"
                    products={products}
                    addToCart={addToCart}
                    onViewMore={() => navigate("/products")}
                />
            </div>
        </div>
    );
}