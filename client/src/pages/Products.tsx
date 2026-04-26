import { useEffect, useState, useContext } from "react";
import { getProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = () => {
        setSearch(searchInput);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Fixed categories list
    const categories = ["all", "men", "women", "kids", "footwear"];

    const filteredProducts = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        let matchCategory = false;
        if (category === "all") {
            matchCategory = true;
        } else {
            // Handle both string and array categories
            if (Array.isArray(p.category)) {
                matchCategory = p.category.some((cat: string) =>
                    cat.toLowerCase() === category.toLowerCase()
                );
            } else {
                matchCategory = p.category?.toLowerCase() === category.toLowerCase();
            }
        }

        return matchSearch && matchCategory;
    });

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Our Products
                </h1>

                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                        <div className="flex gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap lg:flex-nowrap pb-2 sm:pb-0">

                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`flex-shrink-0 sm:flex-shrink px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${category === cat
                                            ? "bg-teal-600 text-white shadow-sm"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}

                        </div>

                        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-2">

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full sm:flex-1 lg:w-72 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                            />

                            <button
                                onClick={handleSearch}
                                className="w-full sm:w-auto bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>

                        </div>

                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600 text-sm sm:text-base">
                        Showing {filteredProducts.length}{" "}
                        {filteredProducts.length === 1 ? "product" : "products"}
                    </p>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                        <p className="text-gray-500 text-lg">No products found</p>
                        <button
                            onClick={() => {
                                setCategory("all");
                                setSearch("");
                                setSearchInput("");
                            }}
                            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}