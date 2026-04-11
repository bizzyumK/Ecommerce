import { Request, Response } from "express";
import { User } from "../model/user.model";

export async function authRegister(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required(name, email, password" });
        }
        const oldEmail = await User.findOne({ email });
        if (oldEmail) {
            return res.status(409).json({ message: "Email already taken" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        });
        return res.status(201).json({ message: "Sucess", _id: newUser.id });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
