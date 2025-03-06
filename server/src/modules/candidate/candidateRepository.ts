import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Candidate = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
};

class candidateRepository {
  async create(candidate: Omit<Candidate, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into candidate (firstname, lastname, email, hashed_password) values (?, ?, ?, ?)",
      [
        candidate.firstname,
        candidate.lastname,
        candidate.email,
        candidate.hashed_password,
      ],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from candidate where id = ?",
      [id],
    );
    return rows[0] as Candidate;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from candidate where email = ?",
      [email],
    );

    return rows[0] as Candidate;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from candidate");

    return rows as Candidate[];
  }

  async update(candidate: Candidate) {
    const [result] = await databaseClient.query<Result>(
      "update candidate set firstname = ?, lastname = ?, email = ?, hashed_password = ? where id = ?",
      [
        candidate.firstname,
        candidate.lastname,
        candidate.email,
        candidate.hashed_password,
        candidate.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from candidate where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new candidateRepository();
