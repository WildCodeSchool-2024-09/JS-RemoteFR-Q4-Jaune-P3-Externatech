import type { RequestHandler } from "express";

import Candidate_offerRepository from "./candidate_offerRepository";

const browseCandidatesByCompany: RequestHandler = async (req, res, next) => {
  try {
    const company_id = Number(req.companyID);
    const candidates =
      await Candidate_offerRepository.readAllCandidatesByCompany(company_id);
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

export default { browseCandidatesByCompany };
