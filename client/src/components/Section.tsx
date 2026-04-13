import ProductCard from "./ProductCard";

type SectionProps = {
    title: string;
    products: any[];
    addToCart: (product: any) => void;
    onViewMore: () => void;
};

export default function Section({
    title,
    products,
    addToCart,
    onViewMore,
}: SectionProps) {
    return (
        <div className="mb-10 bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {title}
                </h2>
                <button onClick={onViewMore} className="text-blue-600 hover:text-blue-800 font-medium transition" > View More → </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    );
}