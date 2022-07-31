import {NextFunction, Request, Response} from "express";
import userService from '../services/user.service'
import {validationResult} from 'express-validator';

class UserController {
    constructor() {
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(new Error('Validation error'));
            }
            const {email, password, name} = req.body;
            await userService.registration(email, password, name);
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            // const {refreshToken} = req.cookies;
            // await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return;
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()