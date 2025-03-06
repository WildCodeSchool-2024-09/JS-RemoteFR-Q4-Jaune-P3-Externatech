import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Offer = {
  id: number;
  title: string;
  city: string;
  background: string;
  description: string;
  salary: number;
  profile: string;
  remote_id: number;
  company_id: number;
  contract_id: number;
};

class offerRepository {
  async create(offer: Omit<Offer, "id">) {
    const {
      title,
      city,
      background,
      description,
      salary,
      profile,
      remote_id,
      company_id,
      contract_id,
    } = offer;
    const [result] = await DatabaseClient.query<Result>(
      "insert into offer (title, city, background, description,  salary, profile, remote_id, company_id, contract_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        offer.title,
        offer.city,
        offer.background,
        offer.description,
        offer.salary,
        offer.profile,
        offer.remote_id,
        offer.company_id,
        offer.contract_id,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      "select offer.*, company.name AS company_name, contract.name AS contract_name, remote.name AS remote_name from offer JOIN company ON offer.company_id = company.id JOIN contract ON offer.contract_id = contract.id JOIN remote ON offer.remote_id = remote.id",
    );

    return rows as Offer[];
  }

  async readAllByCompany(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT offer.*, company.name AS company_name, contract.name AS contract_name, remote.name AS remote_name FROM offer JOIN company ON offer.company_id = company.id JOIN contract ON offer.contract_id = contract.id JOIN remote ON offer.remote_id = remote.id WHERE offer.company_id = ?",
      [id],
    );

    return rows as Offer[];
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT offer.id, offer.title, offer.description, offer.city, offer.background, offer.salary, offer.profile, contract.name AS contract_name, remote.name AS remote_name, company.name AS company_name, company.description AS company_description, company.id as company_id, company.logo AS company_logo, GROUP_CONCAT(stack.name SEPARATOR ', ') AS stack_names FROM offer INNER JOIN company ON offer.company_id = company.id INNER JOIN offer_stack ON offer.id = offer_stack.offer_id INNER JOIN stack ON offer_stack.stack_id = stack.id INNER JOIN contract ON offer.contract_id = contract.id INNER JOIN remote ON offer.remote_id=remote.id WHERE offer.id = ? GROUP BY offer.id, company.id",
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async update(offer: Offer) {
    const [result] = await DatabaseClient.query<Result>(
      "update offer set title = ?, description = ?, city = ?, background = ?, salary = ?, profile = ?,  remote_id = ?, company_id = ?, contract_id = ? where id = ?",
      [
        offer.title,
        offer.description,
        offer.city,
        // offer.logo,
        offer.background,
        offer.salary,
        offer.profile,
        offer.remote_id,
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
