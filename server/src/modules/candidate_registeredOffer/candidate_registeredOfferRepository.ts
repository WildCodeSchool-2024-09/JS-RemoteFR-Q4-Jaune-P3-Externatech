import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Candidate_offer_registered = {
  id: number;
  candidate_id: number;
  offer_id: number;
  offer_title: string;
  offer_city: string;
  offer_background: string;
  offer_description: string;
  offer_profil: string;
  offer_salary: number;
  company_id: number;
  candidate_firstname: string;
  candidate_lastname: string;
  candidate_email: string;
  resume: string;
  status: string;
  candidate_hashed_password: string;
  is_registered: boolean;
};

class CandidateRegisteredOfferRepository {
  async readAllRegisteredOffersByCandidate(candidateId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT c_o_r*, candidate.id AS candidate_id, candidate.firstname AS candidate_firstname, candidate.lastname AS candidate.lastname, candidate.email AS candidate_email, candidate.hashed_password AS candidate_hashed_password, offer_title AS offer.title, offer_city AS offer.city, offer_background AS offer.background, offer_description AS offer.description, offer_profile AS offer.profile, offer_salary AS offer.salary FROM candidate_offer_registered AS c_o_r JOIN candidate ON candidate.id = c_o_r.candidate_id JOIN offer ON offer.id = c_o_r.offer_id WHERE candidate.id = ? ORDER BY c_o_r.id",
      [candidateId],
    );
    return rows as Candidate_offer_registered[];
  }

  async create(
    candidate_offer_registered: Omit<Candidate_offer_registered, "id">,
  ) {
    const [result] = await databaseClient.query<Result>(
      "insert into c_o_r AS candidat_offer_resgistered(candidat_id, offer_id, is_registered) values (?, ?, ?)",
      [
        candidate_offer_registered.candidate_id,
        candidate_offer_registered.offer_id,
        true,
      ],
    );
    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM c_o_r AS candidate_offer_registered WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CandidateRegisteredOfferRepository();
