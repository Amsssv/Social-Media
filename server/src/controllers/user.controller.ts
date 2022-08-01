import {NextFunction, Request, Response} from "express";
import UserService from '../services/user.service';
import {validationResult} from 'express-validator';

const user = new UserService();

class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(new Error('Validation error'));
            }
            const {email, password, name} = req.body;
            await user.registration(email, password, name);
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await user.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            res.status(403);
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshToken');
            return res.status(200).redirect('/api/login');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await user.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default  UserController;