import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized - Please login first"
            });
        }
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Forbidden - Admins only"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server error in admin middleware"
        });
    }
}