import bcrypt from 'bcrypt'
import tokenService from './token.service';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user.model'


class UserService {
    constructor() {
    }

    async registration(email: string, password: string) {
        let candidate: boolean = await userModel.userExist(email);
        if(candidate) {
            throw new Error(`User with this ${email} already exist`);
        }
        let id = uuidv4()
        let hashPassword = await bcrypt.hash(password, 3);
        await userModel.addUser(id, email, hashPassword)

        let payload = {
            id: id,
            email: email,
        }

        let tokens = tokenService.generateTokens(payload)
        return{...tokens, ...payload}
    }

}

export default new UserService()