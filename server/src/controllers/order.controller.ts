import { Request, Response } from "express";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";

export async function createOrder(req: Request, res: Response) {
    try {
        const { items, address } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "At least one item is required",
            });
        }
        if (!address) {
            return res.status(400).json({
                message: "Address is required",
            });
        }
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized, must login",
            });
        }
        const userId = req.user.id;
        let totalPrice = 0;
        for (let item of items) {
            if (!item.product || !item.quantity) {
                return res.status(400).json({
                    message: "Invalid item structure",
                });
            }

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
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
            message: "Internal server error"
        });
    }
}

export async function getUserOrder(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized, must login",
            });
        }
        const userId = req.user.id;
        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: orders.length === 0
                ? "No orders found"
                : "Orders fetched successfully",
            data: orders
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function getAllOrder(req: Request, res: Response) {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('items.product')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: orders.length === 0
                ? "No orders found"
                : "All orders fetched successfully",
            data: orders
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        return res.status(200).json({
            message: "Order updated successfully",
            data: updatedOrder
        });

    } catch (err) {
        return res.status(500).json({
            message: "Invalid ID or server error"
        });
    }
}