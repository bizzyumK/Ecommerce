import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        images: [String],
        sizes: [String],
        stock: Number,
        category: String,
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);