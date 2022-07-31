import {Pool} from 'pg';

class UserModel {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'messenger',
            password: '1234',
            port: 3030,
        })
    }

    async addUser(id: string, email: string, password: string, name: string, isLogin: boolean) {
        let userData = `INSERT INTO users(id, email, password, name, isLogin) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        return await this.pool.query(userData, [id, email, password, name, isLogin]);
    }

    async userExist(email: string) {
        let checkUser = await this.pool.query('SELECT EXISTS (SELECT FROM users WHERE email = $1)', [email]);
        return checkUser.rows[0].exists;
    }

    async getUserPassword(email: string) {
        let user = await this.pool.query(`SELECT password FROM users WHERE email = $1`, [email]);
        return user.rows[0].password;
    }

    async userGetAuthorized(email: string) {
        await this.pool.query(`UPDATE users SET isLogin = 'true' WHERE email = $1`, [email]);
    }

    async getUserData(email: string) {
        let userData = await this.pool.query(`SELECT id, name, islogin FROM users WHERE email = $1`, [email]);
        const {id, name, islogin} = userData.rows[0];
        return {
            id: id,
            email: email,
            name: name,
            isLogin: islogin,
        }
    }

}

export default new UserModel();