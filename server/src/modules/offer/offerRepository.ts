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
  work_condition_id: number;
  company_id: number;
  contract_id: number;
};

type City = {
  id: number;
  name: string;
};

class offerRepository {
  async create(offer: Omit<Offer, "id">, stacks: number[]) {
    const {
      title,
      city,
      background,
      description,
      salary,
      profile,
      work_condition_id,
      company_id,
      contract_id,
    } = offer;
    const [result] = await DatabaseClient.query<Result>(
      "insert into offer (title, city, background, description,  salary, profile, work_condition_id, company_id, contract_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        offer.title,
        offer.city,
        offer.background,
        offer.description,
        offer.salary,
        offer.profile,
        offer.work_condition_id,
        offer.company_id,
        offer.contract_id,
      ],
    );
    const offerId = result.insertId;

    if (stacks && stacks.length > 0) {
      const offerStacks = stacks.map((stackId) => [offerId, stackId]);

      await DatabaseClient.query(
        "INSERT INTO offer_stack (offer_id, stack_id) VALUES ?",
        [offerStacks],
      );
    }
    return result.insertId;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
      offer.*, 
      company.name AS company_name, 
      company.logo AS company_logo, 
      contract.name AS contract_name, 
      work_condition.name AS work_condition_name,
      GROUP_CONCAT(stack.name ORDER BY stack.name SEPARATOR ', ') AS stack_names
    FROM offer
    JOIN company ON offer.company_id = company.id
    JOIN contract ON offer.contract_id = contract.id
    JOIN work_condition ON offer.work_condition_id = work_condition.id
    LEFT JOIN offer_stack ON offer.id = offer_stack.offer_id
    LEFT JOIN stack ON offer_stack.stack_id = stack.id
    GROUP BY offer.id`,
    );

    return rows as Offer[];
  }

  async readAllByCompany(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
    offer.*, 
    company.name AS company_name, 
    company.logo AS company_logo, 
    contract.name AS contract_name, 
    work_condition.name AS work_condition_name,
    GROUP_CONCAT(stack.name ORDER BY stack.name SEPARATOR ', ') AS stack_names
FROM offer
JOIN company ON offer.company_id = company.id
JOIN contract ON offer.contract_id = contract.id
JOIN work_condition ON offer.work_condition_id = work_condition.id
LEFT JOIN offer_stack ON offer.id = offer_stack.offer_id
LEFT JOIN stack ON offer_stack.stack_id = stack.id
WHERE offer.company_id = ?
GROUP BY offer.id`,
      [id],
    );

    return rows as Offer[];
  }

  async readAllCities() {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT DISTINCT city FROM offer",
    );
    return rows as City[];
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT offer.*, contract.name AS contract_name, work_condition.name AS work_condition_name, company.name AS company_name, company.description AS company_description, company.id as company_id, company.logo AS company_logo, GROUP_CONCAT(stack.name SEPARATOR ', ') AS stack_names, GROUP_CONCAT(stack.id SEPARATOR ', ') AS stack_ids FROM offer INNER JOIN company ON offer.company_id = company.id INNER JOIN offer_stack ON offer.id = offer_stack.offer_id INNER JOIN stack ON offer_stack.stack_id = stack.id INNER JOIN contract ON offer.contract_id = contract.id INNER JOIN work_condition ON offer.work_condition_id=work_condition.id WHERE offer.id = ? GROUP BY offer.id, company.id",
      [id],
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async update(offer: Offer, stacks: number[]) {
    const [result] = await DatabaseClient.query<Result>(
      "update offer set title = ?, description = ?, city = ?, background = ?, salary = ?, profile = ?,  work_condition_id = ?, company_id = ?, contract_id = ? where id = ?",
      [
        offer.title,
        offer.description,
        offer.city,
        offer.background,
        offer.salary,
        offer.profile,
        offer.work_condition_id,
        offer.company_id,
        offer.contract_id,
        offer.id,
      ],
    );
    if (stacks && stacks.length > 0) {
      const offerStacks = stacks.map((stackId) => [offer.id, stackId]);

      await DatabaseClient.query(
        "INSERT INTO offer_stack (offer_id, stack_id) VALUES ?",
        [offerStacks],
      );
    }

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
