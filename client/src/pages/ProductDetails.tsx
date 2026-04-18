import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState<any>(null);
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		fetchProduct();
	}, [id]);

	const fetchProduct = async () => {
		try {
			const res = await getProductById(id!);
			setProduct(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	if (!product) {
		return <div className="p-6">Loading...</div>;
	}

	return (
		<div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

			<img
				src={product.images?.[0]}
				className="w-full h-[400px] object-cover rounded-xl"
			/>

			<div>

				<h1 className="text-3xl font-bold mb-2">
					{product.name}
				</h1>

				<p className="text-gray-500 mb-4">
					{product.description}
				</p>

				<p className="text-2xl font-semibold mb-4">
					₹{product.price}
				</p>

				<div className="mb-4">
					<p className="font-medium mb-2">Available Sizes:</p>

					<div className="flex gap-2">
						{product.sizes?.map((size: string) => (
							<span
								key={size}
								className="border px-3 py-1 rounded"
							>
								{size}
							</span>
						))}
					</div>
				</div>

				<button
					onClick={() => addToCart(product)}
					className="bg-black text-white px-6 py-2 rounded"
				>
					Add to Cart
				</button>

			</div>
		</div>
	);
}