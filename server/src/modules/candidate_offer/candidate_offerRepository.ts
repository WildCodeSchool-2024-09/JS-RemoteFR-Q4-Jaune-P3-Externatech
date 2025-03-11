import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Candidate_offer = {
  id: number;
  candidate_id: number;
  offer_id: number;
  company_id: number;
  candidate_firstname: string;
  candidate_lastname: string;
  candidate_email: string;
  offer_title: string;
};

class Candidate_offerRepository {
  async readAllCandidatesByCompany(companyID: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT c_o.*, company.id AS company_id, candidate.firstname AS candidate_firstname, candidate.lastname AS candidate_lastname, candidate.email AS candidate_email, offer.title AS offer_title FROM candidate_offer as c_o JOIN candidate ON candidate.id = c_o.candidate_id JOIN offer ON offer.id = offer_id JOIN company ON company.id = offer.company_id WHERE company.id =?",
      [companyID],
    );
    return rows as Candidate_offer[];
  }
}

export default new Candidate_offerRepository();
