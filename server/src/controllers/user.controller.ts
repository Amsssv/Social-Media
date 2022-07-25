import {NextFunction, Request, Response} from "express";
import UserService from '../services/user.service'

class UserController {
    constructor() {
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        // try {
            let {email, password} = req.body;
            let userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 2592000000, sameSite: true, httpOnly: true});
            return res.json(userData)
        // } catch (e) {
        //     console.log(e)
        // }
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