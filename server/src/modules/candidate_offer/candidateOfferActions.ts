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

const editStatus: RequestHandler = async (req, res, next) => {
  try {
    const { application_status_id, id } = req.body.updateStatus;
    const affectedRows = await CandidateOfferRepository.updateStatus({
      application_status_id,
      id,
    });

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browseCandidatesByCompany, editStatus };
