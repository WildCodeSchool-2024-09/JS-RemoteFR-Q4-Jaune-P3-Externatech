import type { RequestHandler } from "express";

import CandidateOfferRepository from "./candidateOfferRepository";

const browseCandidatesByCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyID = req.company.id;

    const candidates =
      await CandidateOfferRepository.readAllCandidatesByCompany(companyID);
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

export default { browseCandidatesByCompany };
