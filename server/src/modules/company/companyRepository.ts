import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Company = {
  id: number;
  name: string;
  email: string;
  description: string;
  hashed_password: string;
};

class CompanyRepository {
  async create(company: Omit<Company, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into company (name, description, email, hashed_password) values (?, ?, ?, ?)",
      [
        company.name,
        company.description,
        company.email,
        company.hashed_password,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from company where id = ?",
      [id],
    );

    return rows[0] as Company;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from company where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as Company;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from company");

    return rows as Company[];
  }

  async update(company: Company) {
    const [result] = await databaseClient.query<Result>(
      "update company set name = ?, description = ?, email = ?, hashed_password = ? where id = ?",
      [
        company.name,
        company.description,
        company.email,
        company.hashed_password,
        company.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from company where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new CompanyRepository();
