import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Entreprise = {
  id: number;
  name: string;
  description: string;
};

class EntrepriseRepository {
  async create(entreprise: Omit<Entreprise, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into entreprise (name, description) values (?, ?)",
      [entreprise.name, entreprise.description],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from entreprise where id = ?",
      [id],
    );

    return rows[0] as Entreprise;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from entreprise");

    return rows as Entreprise[];
  }

  async update(entreprise: Entreprise) {
    const [result] = await databaseClient.query<Result>(
      "update entreprise set name = ?, description = ? where id = ?",
      [entreprise.name, entreprise.description, entreprise.id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from entreprise where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new EntrepriseRepository();
