import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    images: string[];
    sizes: string[];
    stock: number;
    category: string;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true, trim: true, },
        price: { type: Number, required: true, },
        description: { type: String, required: true, },
        images: { type: [String], default: [], },
        sizes: { type: [String], default: [], },
        stock: { type: Number, default: 0, },
        category: { type: String, required: true, trim: true, },
    },
    { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);