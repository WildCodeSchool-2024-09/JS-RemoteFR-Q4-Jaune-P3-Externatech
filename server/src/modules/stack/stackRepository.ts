import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Stack = {
  id: number;
  name: string;
};

class stackRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM stack");
    return rows as Stack[];
  }
}

export default new stackRepository();
