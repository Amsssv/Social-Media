import db from "../db/pool";
import {
  insertUsersQuery,
  selectFromUserQuery,
  selectPasswordQuery,
} from "../db/queries";

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

  static async getUserPassword(email: string) {
    try {
      let user = await db.query(selectPasswordQuery(email));
      return user.rows[0].password;
    } catch (e) {
      return e;
    }
  }

  static async getUserData(email: string) {
    try {
      let result = await db.query(selectFromUserQuery(email));
      const { id, name } = result.rows[0];
      return {
        id: id,
        email: email,
        name: name,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default UserModel;
