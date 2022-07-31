import bcrypt from 'bcrypt'
import tokenService from './token.service';
import {v4 as uuidv4} from 'uuid';
import userModel from '../models/user.model';
import {JwtPayload} from "jsonwebtoken";

class UserService {
    constructor() {
    }

    async registration(email: string, password: string, name: string) {
        const candidate: boolean = await userModel.userExist(email);
        if (candidate) {
            throw new Error(`User with this ${email} already exist`);
        }

        const id = uuidv4();
        const hashPassword = await bcrypt.hash(password, 3);
        const isLogin: boolean = false;
        await userModel.addUser(id, email, hashPassword, name, isLogin);
    }

    async login(email: string, password: string) {
        const user: boolean = await userModel.userExist(email);
        if (!user) {
            throw new Error(`User not found`);
        }

        const userPassword: string = await userModel.getUserPassword(email);
        const isPasswordEquals = await bcrypt.compare(password, userPassword);
        if (!isPasswordEquals) {
            throw new Error('Invalid password');
        }

        await userModel.userGetAuthorized(email);
        const payload: object = await userModel.getUserData(email);
        const tokens = tokenService.generateTokens(payload);

        return {...tokens, ...payload};
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('User unauthorized');
        }
        const validRefreshToken: JwtPayload | string | null = tokenService.verifyRefreshToken(refreshToken);
        if (!validRefreshToken) {
            throw new Error('Invalid refreshToken');
        }
        // @ts-ignore
        const payload = await userModel.getUserData(validRefreshToken.email);
        const tokens = tokenService.generateTokens(payload);

        return {...tokens, ...payload};
    }
}

export default new UserService()