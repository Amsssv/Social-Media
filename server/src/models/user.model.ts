import db from "../db/pool";
import { insertUsersQuery, selectFromUserQuery } from "../db/queries";

class UserModel {
  static async addUser(
    id: string,
    email: string,
    password: string,
    name: string
  ) {
    try {
      let result = await db.query(insertUsersQuery(id, email, password, name));
      return `User with this email ${result.rows[0].email} successfully created`;
    } catch (e) {
      throw e;
    }
  }

  static async getUserData(hash: string) {
    try {
      let result = await db.query(selectFromUserQuery(hash));
      const { id, name, password } = result.rows[0];
      return {
        id,
        name,
        password,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default UserModel;
