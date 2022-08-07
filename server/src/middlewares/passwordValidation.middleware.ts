import {NextFunction, Request, Response} from "express";
import model from "../models/user.model";
import bcrypt from "bcrypt";

export async function passwordValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;
        const userPassword: string = await model.getUserPassword(email);
        const isPasswordEquals = await bcrypt.compare(password, userPassword);
        if (!isPasswordEquals) {
            res.status(403);
            return (next(new Error('Invalid password')));
        }
        next();
    } catch (e) {
        next(e)
    }
}