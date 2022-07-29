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
            let {email, password} = req.body;
            let userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true});
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }
}

export default new UserController()