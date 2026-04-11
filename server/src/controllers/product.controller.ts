import { Request, Response } from "express";
import { Product } from "../model/product.model";

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: product
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}

export async function getAllProduct(req: Request, res: Response) {
    try {
        const products = await Product.find();
        return res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const {
            name,
            price,
            description,
            images,
            sizes,
            stock,
            category
        } = req.body;
        if (
            !name ||
            price === undefined ||
            !description ||
            !images ||
            !sizes ||
            stock === undefined ||
            !category
        ) {
            return res.status(400).json({
                message: "All fields are required",
                status: false
            });
        }
        const productDetail = await Product.create({
            name,
            price,
            description,
            images,
            sizes,
            stock,
            category
        });

        return res.status(201).json({
            message: "Product added successfully",
            data: productDetail
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // return updated data
        );
        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}