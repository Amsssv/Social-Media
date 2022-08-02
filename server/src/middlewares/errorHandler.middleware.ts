import {NextFunction, Request, Response} from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";

const model = new UserModel();

export async function errorHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;
        const candidate = await model.userExist(email);

        if (req.originalUrl === '/api/signup') {
            if (candidate) {
                res.status(403);
                return next(new Error(`User with this email ${email} already exist`));
            }
        }

        if (req.originalUrl === '/api/login') {
            if (!candidate) {
                res.status(403);
                return (next(new Error(`User not found`)));
            }

            const userPassword: string = await model.getUserPassword(email);
            const isPasswordEquals = await bcrypt.compare(password, userPassword);
            if (!isPasswordEquals) {
                res.status(403);
                return (next(new Error('Invalid password')));
            }
        }
        next();
    } catch (e) {
        next(e)
    }
}
