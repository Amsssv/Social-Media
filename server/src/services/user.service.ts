import bcrypt from 'bcrypt'
import TokenService from './token.service';
import {v4 as uuidv4} from 'uuid';
import UserModel from '../models/user.model';

export interface TokenInterface {
        id: string
        email: string;
        name: string;
        userId: number;
}

const model = new UserModel();
const token = new TokenService();

class UserService {

    async registration(email: string, password: string, name: string) {
        const candidate: boolean = await model.userExist(email);
        if (candidate) {
            throw new Error(`User with this ${email} already exist`);
        }

        const id = uuidv4();
        const hashPassword = await bcrypt.hash(password, 3);
        const isLogin: boolean = false;
        await model.addUser(id, email, hashPassword, name, isLogin);
    }

    async login(email: string, password: string) {
        const user: boolean = await model.userExist(email);
        if (!user) {
            throw new Error(`User not found`);
        }

        const userPassword: string = await model.getUserPassword(email);
        const isPasswordEquals = await bcrypt.compare(password, userPassword);
        if (!isPasswordEquals) {
            throw new Error('Invalid password');
        }

        await model.userGetAuthorized(email);
        const payload: object = await model.getUserData(email);
        const tokens = token.generateTokens(payload);

        return {...tokens, ...payload};
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('User unauthorized');
        }
        const validRefreshToken = token.verifyRefreshToken(refreshToken) as TokenInterface;
        if (!validRefreshToken) {
            throw new Error('Invalid refreshToken');
        }

        const payload = await model.getUserData(validRefreshToken.email);
        const tokens = token.generateTokens(payload);

        return {...tokens, ...payload};
    }
}

export default UserService;