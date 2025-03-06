import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type City = {
  id: number;
  name: string;
};

class cityRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT id, city FROM offer",
    );
    return rows as City[];
  }
}

export default new cityRepository();
