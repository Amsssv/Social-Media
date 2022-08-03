import {NextFunction, Request, Response} from "express";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";
import model from "../models/user.model";
import jwt from "jsonwebtoken";

class UserController {

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password, name} = req.body;
            const userId = uuidv4();
            const hashPassword = await bcrypt.hash(password, 3);
            await model.addUser(userId, email, hashPassword, name);
            res.status(301).send("User successfully created");
        } catch (e) {
            next(e);
        }
    }

    async logIn(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body;
            await model.userGetAuthorized(email);
            const payload: object = await model.getUserData(email);
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: 900000});
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: "30d"});

            res.cookie('refreshToken', refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true});
            return res.json({
                accessToken,
                refreshToken,
                ...payload
            });
        } catch (e) {
            next(e);
        }
    }

    async logOut(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshToken');
            return res.status(200).redirect('/api/login');
        } catch (e) {
            next(e);
        }
    }

    // async refresh(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         // const {refreshToken} = req.cookies;
    //         //
    //         // if (!refreshToken) {
    //         //     new Error('User unauthorized');
    //         // }
    //         // const validRefreshToken = token.verifyRefreshToken(refreshToken) as payloadI;
    //         // if (!validRefreshToken) {
    //         //     new Error('Invalid refreshToken');
    //         // }
    //     } catch (e) {
    //         next(e)
    //     }
    // }
}

export default UserController;
