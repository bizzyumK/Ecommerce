import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from 'bcrypt';
import type { StringValue } from 'ms';
import { generateToken } from "../utils/jwt";

export async function signup(req: Request, res: Response) {
    try {
        const { username, email, password, isAdmin } = req.body;
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
            password: hashPassword,
            isAdmin: isAdmin ?? false
        });
        return res.status(201).json({ message: "Sucess", _id: newUser.id });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required(email, password" });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not Found!!" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Password!!" })
        }
        const accessToken = generateToken({
            id: user.id,
            isAdmin: user.isAdmin,
            secret_key: process.env.JWT_SECRET!, //! sign tells ts that its' not undefined
            expires_in: process.env.TOKEN_EXPIRES_IN! as StringValue
        });

        return res.status(200).json({
            message: "Login successful",
            id: user.id,
            email: user.email,
            accessToken: accessToken,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function getMe(req: Request, res: Response) {
    if (!req.user) {
        return res.status(403).json({ message: "Log In first" })
    }
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    });
}