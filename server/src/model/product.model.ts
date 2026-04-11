import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, },
        price: { type: Number, required: true, },
        description: { type: String, required: true, },
        images: { type: [String], default: [], },
        sizes: { type: [String], default: [], },
        stock: { type: Number, default: 0, },
        category: { type: String, required: true, },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);