import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Entreprise = {
  id: number;
  name: string;
  description: string;
};

class EntrepriseRepository {
  // The C of CRUD - Create operation

  async create(entreprise: Omit<Entreprise, "id">) {
    // Execute the SQL INSERT query to add a new entreprise to the "entreprise" table
    const [result] = await databaseClient.query<Result>(
      "insert into entreprise (title, user_id) values (?, ?)",
      [entreprise.name, entreprise.description],
    );

    // Return the ID of the newly inserted entreprise
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific entreprise by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from entreprise where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the entreprise
    return rows[0] as Entreprise;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all entreprises from the "entreprise" table
    const [rows] = await databaseClient.query<Rows>("select * from entreprise");

    // Return the array of entreprises
    return rows as Entreprise[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing entreprise

  async update(entreprise: Entreprise) {
    // Execute the SQL UPDATE query to update an existing program in the "program" table
    const [result] = await databaseClient.query<Result>(
      "update entreprise set name = ?, description = ? where id = ?",
      [entreprise.name, entreprise.description, entreprise.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an entreprise by its ID

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from entreprise where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new EntrepriseRepository();
