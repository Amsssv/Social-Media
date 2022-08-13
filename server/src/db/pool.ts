import { Pool } from "pg";

const poolConfig = {
  user: "postgres",
  host: "localhost",
  database: "messenger",
  password: "1234",
  port: 3030,
};

class DataBase {
  private _pool: Pool;
  private static _instance: DataBase;

  constructor() {
    this._pool = new Pool(poolConfig);
  }

  static get pool(): Pool {
    if (!DataBase._instance) {
      DataBase._instance = new DataBase();
    }
    return DataBase._instance._pool;
  }
}

export default DataBase.pool;
