import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header not provided" });
        }
        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = { id: decode.id, isAdmin: decode.isAdmin };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalid or expired" });
    }

}