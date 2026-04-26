import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState<any>(null);
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState<string>("");
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		fetchProduct();
	}, [id]);

	const fetchProduct = async () => {
		try {
			const res = await getProductById(id!);
			setProduct(res.data.data);
			if (res.data.data.sizes && res.data.data.sizes.length > 0) {
				setSelectedSize(res.data.data.sizes[0]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddToCart = () => {
		const productWithQuantity = {
			...product,
			quantity,
			selectedSize: selectedSize || "One Size"
		};
		addToCart(productWithQuantity);
		setQuantity(1);
	};

	const incrementQuantity = () => {
		const maxStock = product?.stock || 10;
		if (quantity < maxStock) {
			setQuantity(quantity + 1);
		}
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-gray-600">Loading...</p>
			</div>
		);
	}

	const inStock = product.stock > 0;
	const maxStock = product.stock || 10;

	return (
		<div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-64px-289px)] flex justify-center items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">

				<div className="bg-gray-100 rounded-xl overflow-hidden aspect-square">
					<img
						src={product.images[0]?.url || "https://placehold.co/600x400"}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="flex flex-col justify-between">

					<div>

						<h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 text-gray-900">
							{product.name}
						</h1>

						<p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
							{product.description}
						</p>

						<p className="text-2xl sm:text-3xl font-bold text-teal-600 mb-4">
							₹{product.price.toLocaleString()}
						</p>

						<div className="mb-4">
							{inStock ? (
								<div className="flex flex-wrap items-center gap-2">
									<span className="text-sm sm:text-base text-green-600 font-semibold">
										✓ In Stock
									</span>
									<span className="text-xs sm:text-sm text-gray-500">
										({maxStock} available)
									</span>
								</div>
							) : (
								<span className="text-sm sm:text-base text-red-600 font-semibold">
									✗ Out of Stock
								</span>
							)}
						</div>

						{product.sizes && product.sizes.length > 0 && (
							<div className="mb-6">

								<label className="block text-sm sm:text-base font-medium mb-3">
									Select Size:
								</label>

								<div className="flex gap-2 sm:gap-3 flex-wrap">
									{product.sizes.map((size: string) => (
										<button
											key={size}
											onClick={() => setSelectedSize(size)}
											className={`px-3 sm:px-4 py-2 text-sm sm:text-base cursor-pointer border-2 rounded-lg font-medium transition ${selectedSize === size
													? "bg-teal-600 border-teal-600 text-white"
													: "border-gray-300 hover:border-teal-600 text-gray-700"
												}`}
										>
											{size}
										</button>
									))}
								</div>

							</div>
						)}

					</div>

					<div>

						<div className="flex flex-wrap items-center gap-3 mb-6">

							<span className="text-sm sm:text-base font-medium">
								Quantity:
							</span>

							<button
								onClick={decrementQuantity}
								disabled={quantity <= 1 || !inStock}
								className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
							>
								-
							</button>

							<span className="w-8 text-center text-sm sm:text-base">
								{quantity}
							</span>

							<button
								onClick={incrementQuantity}
								disabled={quantity >= maxStock || !inStock}
								className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
							>
								+
							</button>

							<span className="text-xs sm:text-sm text-gray-500">
								Max {maxStock}
							</span>

						</div>

						<button
							onClick={handleAddToCart}
							disabled={!inStock || (product.sizes?.length > 0 && !selectedSize)}
							className="w-full bg-teal-600 text-white py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							Add to Cart
						</button>

						<div className="pt-4 mt-4 border-t border-gray-200">

							<div className="flex items-start gap-3">

								<div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<i className="fa-solid fa-truck-fast text-blue-600"></i>
								</div>

								<div>
									<p className="font-semibold text-gray-800 text-sm sm:text-base">
										Fast Delivery
									</p>
									<p className="text-xs sm:text-sm text-gray-500">
										Free shipping on orders over ₹4000
									</p>
									<p className="text-xs sm:text-sm text-gray-500">
										Estimated delivery: 2-4 business days
									</p>
								</div>

							</div>

						</div>

					</div>

				</div>

			</div>
		</div>
	);
}