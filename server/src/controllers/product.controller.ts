import { Request, Response } from "express";
import { Product } from "../model/product.model";

export function getProduct(req: Request, res: Response) {
    res.json({ message: "You" })
}
export function getAllProduct(req: Request, res: Response) {
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
export function updateProduct(req: Request, res: Response) {
}
export function deleteProduct(req: Request, res: Response) {
}