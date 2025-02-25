import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Contract = {
  id: number;
  name: string;
};

class contractRepository {
  async create(contract: Omit<Contract, "id">) {
    const { name } = contract;
    const [result] = await DatabaseClient.query<Result>(
      "insert into contract (name) values (?)",
      [contract.name],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("select * from contract");

    return rows as Contract[];
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT contract.id, contract.name, offer.id, offer.title, offer.description AS offer_description, offer.date, offer.salary, offer.requirements FROM offer inner join contract on offer.contract_id = contract.id",
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async update(contract: Contract) {
    const [result] = await DatabaseClient.query<Result>(
      "update contract set name = ?",
      [contract.name],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "delete from contract where id = ?",
    );

    return result.affectedRows;
  }
}

export default new contractRepository();
