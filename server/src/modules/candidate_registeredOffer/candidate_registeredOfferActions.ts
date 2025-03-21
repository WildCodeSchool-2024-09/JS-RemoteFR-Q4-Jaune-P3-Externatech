import type { RequestHandler } from "express";
import candidate_registeredOfferRepository from "./candidate_registeredOfferRepository";

const browseRegisteredOffersByCandidate: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const candidateID = req.candidate.id;
    const registeredOffers =
      await candidate_registeredOfferRepository.readAllRegisteredOffersByCandidate(
        candidateID,
      );
    res.json(registeredOffers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const offerRegisteredId = Number(req.params.id);
    const offerRegistered =
      await candidate_registeredOfferRepository.readAllRegisteredOffersByCandidate(
        offerRegisteredId,
      );
    res.json(offerRegistered);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newOfferRegistered = {
      candidate_id: req.candidate.id,
      offer_id: req.body.offer_id,
    };
    const insertId =
      await candidate_registeredOfferRepository.create(newOfferRegistered);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const offerRegisteredId = Number(req.body.offer_id);
    await candidate_registeredOfferRepository.delete(offerRegisteredId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browseRegisteredOffersByCandidate, read, add, destroy };
