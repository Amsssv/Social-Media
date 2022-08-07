import db from './db';

class UserModel {
    static async addUser(id: string, email: string, password: string, name: string, isLogin: boolean = false) {
        try {
            let userData = `INSERT INTO users(id, email, password, name, isLogin) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            let result = await db.query(userData, [id, email, password, name, isLogin]);
            return `User with this email ${result.rows[0].email} successfully created`;
        } catch (e) {
            throw new Error(`User with this email already exists`);
        }
    }

    static async getUserPassword(email: string) {
        try {
            let user = await db.query(`SELECT password FROM users WHERE email = $1`, [email]);
            return user.rows[0].password;
        } catch (e) {
            throw new Error(`User with this email does not exists`)
        }
    }

    static async userGetAuthorized(email: string) {
        await db.query(`UPDATE users SET isLogin = 'true' WHERE email = $1`, [email]);
    }

    static async getUserData(email: string) {
        let userData = await db.query(`SELECT id, name, islogin FROM users WHERE email = $1`, [email]);
        const {id, name, islogin} = userData.rows[0];
        return {
            id: id,
            email: email,
            name: name,
            isLogin: islogin,
        }
    }
}

export default UserModel;