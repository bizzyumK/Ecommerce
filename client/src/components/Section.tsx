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
        <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        {title}
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gray-900 mt-2 rounded-full"></div>
                </div>

                <button
                    onClick={onViewMore}
                    className="text-teal-600 font-medium flex items-center gap-2"
                >
                    View More
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}