import { Request, Response } from "express";

export function createOrder(req: Request, res: Response) {
    try {
        const { items, address } = req.body;
        if (!items) {
            return res.status(404).json({
                message: "Atleast one item is required for checkout",
                status: false
            });
        }
        if (!address) {
            return res.status(404).json({
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
        const user = req.user?.id;

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