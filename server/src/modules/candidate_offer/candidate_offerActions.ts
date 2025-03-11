import type { RequestHandler } from "express";

import CandidateOfferRepository from "./candidate_offerRepository";

const browseCandidatesByCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyID = Number(req.company.id);

    const candidates =
      await CandidateOfferRepository.readAllCandidatesByCompany(companyID);
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

export default { browseCandidatesByCompany };
