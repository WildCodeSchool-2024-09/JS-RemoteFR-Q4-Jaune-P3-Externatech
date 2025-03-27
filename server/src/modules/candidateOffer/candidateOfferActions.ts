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

const browseCandidatesByOffer: RequestHandler = async (req, res, next) => {
  try {
    const offerId = Number(req.params.offerId);

    const candidates =
      await CandidateOfferRepository.readAllCandidatesByOffer(offerId);
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

const browseCandidatesOffersByCandidate: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const candidateID = req.candidate.id;

    const candidateOffers =
      await CandidateOfferRepository.readAllCandidateOffersByCandidate(
        candidateID,
      );
    res.json(candidateOffers);
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
const add: RequestHandler = async (req, res, next) => {
  try {
    const newCandidateOffer = {
      candidate_id: req.candidate.id,
      offer_id: req.body.offer_id,
      resume: req.file?.filename,
    };
    const insertId = await CandidateOfferRepository.create(newCandidateOffer);

    res.status(201).json({ insertId });
  } catch (err) {
    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: string };

      if (error.code === "ER_DUP_ENTRY") {
        void res
          .status(400)
          .json({ error: "Vous avez déjà envoyé votre candidature." });
        return;
      }
    }
    next(err);
  }
};

export default {
  browseCandidatesByCompany,
  browseCandidatesByOffer,
  browseCandidatesOffersByCandidate,
  editStatus,
  add,
};
