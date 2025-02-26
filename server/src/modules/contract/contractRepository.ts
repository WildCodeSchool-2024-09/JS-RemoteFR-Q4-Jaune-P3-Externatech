import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Contract = {
  id: number;
  name: string;
};

class contractRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("select * from contract");

    return rows as Contract[];
  }
}

export default new contractRepository();
