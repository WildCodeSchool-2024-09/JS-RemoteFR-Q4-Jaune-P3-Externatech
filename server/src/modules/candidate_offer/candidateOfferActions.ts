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

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCandidateOffer = {
      candidate_id: req.candidate.id,
      offer_id: req.body.offer_id,
      resume: req.body.resume,
    };

    const insertId = await CandidateOfferRepository.create(newCandidateOffer);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browseCandidatesByCompany, add };
