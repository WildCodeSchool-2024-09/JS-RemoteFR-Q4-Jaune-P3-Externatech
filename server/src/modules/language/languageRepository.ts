import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Language = {
  id: number;
  name: string;
};

class LanguageRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM language");
    return rows as Language[];
  }
}

export default new LanguageRepository();
