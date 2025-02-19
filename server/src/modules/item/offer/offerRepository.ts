import DatabaseClient from "../../../../database/client";
import type { Result, Rows } from "../../../../database/client";

type Offer = {
  id: number;
  title: string;
  description: string;
  date: string;
  salary: number;
  requirements: string;
  company_id: number;
  contract_id: number;
};

class offerRepository {
  async create(offer: Omit<Offer, "id">) {
    const {
      title,
      description,
      date,
      salary,
      requirements,
      company_id,
      contract_id,
    } = offer;
    const [result] = await DatabaseClient.query<Result>(
      "insert into offer (title, description, date, salary, requirements, company_id, contract_id) values (?, ?, ?, ?, ?, ?, ?)",
      [
        offer.title,
        offer.description,
        offer.date,
        offer.salary,
        offer.requirements,
        offer.company_id,
        offer.contract_id,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("select * from offer");

    return rows as Offer[];
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM offer WHERE id = ? ",
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async update(offer: Offer) {
    const [result] = await DatabaseClient.query<Result>(
      "update offer set title = ?, description = ?, date = ?, salary = ?, requirements = ?, company_id = ?, contract_id = ? where id = ?",
      [
        offer.title,
        offer.description,
        offer.date,
        offer.salary,
        offer.requirements,
        offer.company_id,
        offer.contract_id,
        offer.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "delete from offer where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new offerRepository();
