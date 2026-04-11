import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from 'bcrypt';

export async function signup(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required(name, email, password" });
        }
        const oldEmail = await User.findOne({ email });
        if (oldEmail) {
            return res.status(409).json({ message: "Email already taken" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPassword
        });
        return res.status(201).json({ message: "Sucess", _id: newUser.id });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}