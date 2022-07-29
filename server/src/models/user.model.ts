import {Pool} from 'pg';

const client = new Pool({
    user: 'Amsssv',
    host: 'localhost',
    database: 'users',
    password: '1222',
    port: 3001,
})

class UserModel {

    constructor() {

    }

    async addUser(id: string, email: string, password: string) {
        let userData = `INSERT INTO users(id, email, password) VALUES ($1, $2, $3) RETURNING *`

        return await client.query(userData, [id, email, password])
    }

    async userExist(email: string) {
        let checkUser = await client.query(`SELECT EXISTS (SELECT FROM users where email = ${email}`);
        return checkUser.rows[0].exists
    }

}

export default new UserModel();