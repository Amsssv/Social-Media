// import bcrypt from 'bcrypt'
import tokenService from './token.service';
import { v4 as uuidv4 } from 'uuid';

class UserService {
    constructor() {
    }

    async registration(email: string, password: string) {
        // let user;
        // if(user) {
        //     throw new Error(`User with this ${email} already exist`);
        // }
        //
        // let hashPassword = await bcrypt.hash(password, 3);
        let id = uuidv4()
        let payload = {
            id: id,
            email: email,
        }

        let tokens = tokenService.generateTokens(payload)
        return{...tokens, ...payload}
    }

}

export default new UserService()