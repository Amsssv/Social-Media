import {NextFunction, Request, Response} from "express";
import model from "../models/user.model";
import bcrypt from "bcrypt";
import {isEmailValid, isPasswordValid} from "../utils/isCredentetialsValid";

export async function errorHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body;
        const candidate = await model.userExist(email);

        if (req.originalUrl === '/api/signup') {
            if(!isEmailValid(email)) {
                return next(new Error(`Wrong email try again`));
            }

            if(!isPasswordValid(password)) {
                return next(new Error(`Your password too short or extends maximum characters`));
            }

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
