import { Request, Response } from "express";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";

export async function createOrder(req: Request, res: Response) {
    try {
        const { items, address } = req.body;
        if (!items || items.length === 0) {
            return res.status(404).json({
                message: "Atleast one item is required for checkout",
                status: false
            });
        }
        if (!address) {
            return res.status(400).json({
                message: "Address is required",
                status: false
            });
        }
        if (!req.user) {
            return res.status(403).json({
                message: "Unauthorized, must login",
                status: false
            });
        }
        const userId = req.user.id;
        let totalPrice = 0;
        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            totalPrice += product.price * item.quantity;
        }
        const order = await Order.create({
            user: userId,
            items,
            totalPrice,
            address
        });

        return res.status(201).json({
            message: "Order created successfully",
            data: order
        });
    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}
export function getUserOrder(req: Request, res: Response) {
}
export function getAllOrder(req: Request, res: Response) {
}
export function updateOrder(req: Request, res: Response) {
}