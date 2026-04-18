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

    const filteredProducts = products.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            category === "all" ? true : p.category === category;

        return matchSearch && matchCategory;
    });

    return (
        <div className="p-6 bg-gray-50">
            <div className="max-w-355 m-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                        {["all", "men", "women"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-1 rounded ${category === cat
                                    ? "bg-black text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="What are you Looking for?"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-64 px-4 py-2  shadow rounded-lg focus:outline-none "
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-black text-white px-4 py-2 rounded-lg"
                        >
                            <i className="fa-brands fa-sistrix"></i>
                        </button>
                    </div>

                    <div className="w-30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
}