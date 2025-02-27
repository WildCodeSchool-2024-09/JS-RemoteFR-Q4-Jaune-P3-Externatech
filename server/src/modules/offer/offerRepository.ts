import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Offer = {
  id: number;
  title: string;
  city: string;
  logo: string;
  background: string;
  description: string;
  salary: number;
  profile: string;
  remote: string;
  company_id: number;
  contract_id: number;
};

class offerRepository {
  async create(offer: Omit<Offer, "id">) {
    const {
      title,
      city,
      logo,
      background,
      description,
      salary,
      profile,
      remote,
      company_id,
      contract_id,
    } = offer;
    const [result] = await DatabaseClient.query<Result>(
      "insert into offer (title, city, logo, background, description,  salary, profile, remote,  company_id, contract_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        offer.title,
        offer.city,
        offer.logo,
        offer.background,
        offer.description,
        offer.salary,
        offer.profile,
        offer.remote,
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

  async readAllByCompany(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT offer.*, company.name AS company_name, contract.name AS contract_name FROM offer JOIN company ON offer.company_id = company.id JOIN contract ON offer.contract_id = contract.id WHERE offer.company_id = ?",
      [id],
    );

    return rows as Offer[];
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT offer.id, offer.title, offer.description AS offer_description, offer.city, offer.logo, offer.background , offer.salary, offer.profile, offer.remote, company.name, company.description AS company_description FROM offer INNER JOIN company ON offer.company_id = company.id where offer.id = ?",
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async update(offer: Offer) {
    const [result] = await DatabaseClient.query<Result>(
      "update offer set title = ?, description = ?, city = ?, logo = ?, background 1= ?, salary = ?, profile = ?,  remote = ?, company_id = ?, contract_id = ? where id = ?",
      [
        offer.title,
        offer.description,
        offer.city,
        offer.logo,
        offer.background,
        offer.salary,
        offer.profile,
        offer.remote,
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
