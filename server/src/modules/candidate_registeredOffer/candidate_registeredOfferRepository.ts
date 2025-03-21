import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Candidate_offer_registered = {
  id: number;
  candidate_id: number;
  offer_id: number;
};

class CandidateRegisteredOfferRepository {
  async readAllRegisteredOffersByCandidate(candidateId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      c_o_r.*, 
      candidate.id AS candidate_id, 
      company.name AS company_name, 
      company.logo AS company_logo, 
      contract.name AS contract_name, 
      offer.title AS offer_title, 
      offer.city AS offer_city, 
      offer.background AS offer_background, 
      work_condition.name AS work_condition_name,
      GROUP_CONCAT(stack.name) AS offer_stack_names
    FROM candidate_offer_registered AS c_o_r 
    JOIN candidate ON candidate.id = c_o_r.candidate_id 
    JOIN offer ON offer.id = c_o_r.offer_id 
    JOIN company ON offer.company_id = company.id 
    JOIN contract ON offer.contract_id = contract.id 
    JOIN work_condition ON offer.work_condition_id = work_condition.id 
    LEFT JOIN offer_stack ON offer.id = offer_stack.offer_id 
    LEFT JOIN stack ON offer_stack.stack_id = stack.id 
    WHERE candidate.id = ? 
    GROUP BY c_o_r.id, candidate.id, company.id, contract.id, offer.id, work_condition.id 
    ORDER BY c_o_r.id;`,
      [candidateId],
    );
    return rows as Candidate_offer_registered[];
  }

  async create(
    candidate_offer_registered: Omit<Candidate_offer_registered, "id">,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO candidate_offer_registered (candidate_id, offer_id) VALUES (?, ?)",
      [
        candidate_offer_registered.candidate_id,
        candidate_offer_registered.offer_id,
      ],
    );
    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM candidate_offer_registered WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CandidateRegisteredOfferRepository();
