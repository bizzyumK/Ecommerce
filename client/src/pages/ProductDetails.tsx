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
		<div className="max-w-6xl mx-auto mt-10 px-4 py-8">
			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-gray-100 rounded-lg overflow-hidden">
					<img
						src={product.images?.[0] || "https://placehold.co/600x400"}
						alt={product.name}
						className="w-full h-96 object-cover"
					/>
				</div>
				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-5xl font-bold mb-2">{product.name}</h1>
						<p className="text-gray-600 mb-4">{product.description}</p>

						<p className="text-3xl font-bold text-teal-600 mb-4">
							₹{product.price.toLocaleString()}
						</p>
						<div className="mb-4">
							{inStock ? (
								<div className="flex items-center gap-2">
									<span className="text-green-600 font-semibold">✓ In Stock</span>
									<span className="text-gray-500 text-sm">({maxStock} available)</span>
								</div>
							) : (
								<span className="text-red-600 font-semibold">✗ Out of Stock</span>
							)}
						</div>
						{product.sizes && product.sizes.length > 0 && (
							<div className="mb-6">
								<label className="block font-medium mb-3">Select Size:</label>
								<div className="flex gap-3 flex-wrap">
									{product.sizes.map((size: string) => (
										<button
											key={size}
											onClick={() => setSelectedSize(size)}
											className={`
                                                px-4 py-2 border-2 rounded-lg font-medium transition
                                                ${selectedSize === size
													? 'bg-teal-600 border-teal-600 text-white'
													: 'border-gray-300 hover:border-teal-600 text-gray-700'
												}
                                            `}
										>
											{size}
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					<div>
						<div className="flex items-center gap-3 mb-6">
							<span className="font-medium">Quantity:</span>
							<button
								onClick={decrementQuantity}
								disabled={quantity <= 1 || !inStock}
								className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
							> - </button>
							<span className="w-8 text-center">{quantity}</span>
							<button
								onClick={incrementQuantity}
								disabled={quantity >= maxStock || !inStock}
								className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
							> + </button>
							<span className="text-sm text-gray-500">
								Max {maxStock}
							</span>
						</div>
						<button
							onClick={handleAddToCart}
							disabled={!inStock || (product.sizes?.length > 0 && !selectedSize)}
							className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Add to Cart
						</button>
						<div className="pt-4 mt-4 border-t border-gray-200">
							<div className="flex items-start gap-3">
								<div className="shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<i className="fa-solid fa-truck-fast text-blue-600"></i>
								</div>
								<div>
									<p className="font-semibold text-gray-800 text-sm">Fast Delivery</p>
									<p className="text-xs text-gray-500">Free shipping on orders over ₹4000</p>
									<p className="text-xs text-gray-500">Estimated delivery: 2-4 business days</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}