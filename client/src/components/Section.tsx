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
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-gray-900 mt-2 rounded-full"></div>
                </div>
                <button
                    onClick={onViewMore}
                    className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition"
                >
                    View More
                    <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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