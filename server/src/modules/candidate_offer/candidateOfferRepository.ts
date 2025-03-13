import DatabaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Candidate_offer = {
  id: number;
  candidate_id: number;
  offer_id: number;
  application_status_id: number;
  company_id: number;
  candidate_firstname: string;
  candidate_lastname: string;
  candidate_email: string;
  offer_title: string;
  resume: string;
  status: string;
};

type New_Candidate_offer = {
  id: number;
  candidate_id: number;
  offer_id: number;
  resume: string;
};

type UpdateStatus = {
  application_status_id: number;
  id: number;
};

class CandidateOfferRepository {
  async readAllCandidatesByCompany(companyID: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
        c_o.*, 
        company.id AS company_id, 
        candidate.firstname AS candidate_firstname, 
        candidate.lastname AS candidate_lastname, 
        candidate.email AS candidate_email, 
        offer.title AS offer_title,
        application_status.name AS status
      FROM candidate_offer AS c_o
      JOIN candidate ON candidate.id = c_o.candidate_id
      JOIN offer ON offer.id = c_o.offer_id  
      JOIN company ON company.id = offer.company_id 
      JOIN application_status ON application_status.id = application_status_id
      WHERE company.id = ?
      ORDER BY c_o.id`,
      [companyID],
    );
    return rows as Candidate_offer[];
  }

  async updateStatus({ application_status_id, id }: UpdateStatus) {
    const [result] = await DatabaseClient.query<Result>(
      "UPDATE candidate_offer SET candidate_offer.application_status_id =? WHERE id =?",
      [application_status_id, id],
    );
    return result.affectedRows;
  }

  async create(candidate_offer: Omit<New_Candidate_offer, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      "insert into candidate_offer (candidate_id, offer_id, resume) values (?, ?, ?)",
      [
        candidate_offer.candidate_id,
        candidate_offer.offer_id,
        candidate_offer.resume,
      ],
    );
    return result.insertId;
  }
}

export default new CandidateOfferRepository();
