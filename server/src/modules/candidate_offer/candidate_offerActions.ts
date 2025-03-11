import type { RequestHandler } from "express";

import Candidate_offerRepository from "./candidate_offerRepository";

const browseCandidatesByCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyID = Number(req.company.id);

    const candidates =
      await Candidate_offerRepository.readAllCandidatesByCompany(companyID);
    res.json(candidates);
    console.info("candidates", candidates);
  } catch (err) {
    next(err);
  }
};

export default { browseCandidatesByCompany };
