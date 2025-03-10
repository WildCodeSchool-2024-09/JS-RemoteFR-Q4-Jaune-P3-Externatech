import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Remote = {
  id: number;
  name: string;
};

class remoteRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("select * from remote");

    return rows as Remote[];
  }
}

export default new remoteRepository();
