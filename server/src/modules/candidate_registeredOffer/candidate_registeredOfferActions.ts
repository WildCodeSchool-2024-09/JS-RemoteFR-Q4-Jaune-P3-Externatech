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
      candidate_id: req.body.candidate_id,
      offer_id: req.body.offer_id,
      offer_title: req.body.offer_title,
      offer_city: req.body.offer_city,
      offer_background: req.body.offer_background,
      offer_description: req.body.offer_description,
      offer_profil: req.body.offer_profil,
      offer_salary: req.body.offer_salary,
      company_id: req.body.company_id,
      candidate_firstname: req.body.candidate_firstname,
      candidate_lastname: req.body.candidate_lastname,
      candidate_email: req.body.candidate_email,
      resume: req.body.resume,
      status: req.body.status,
      candidate_hashed_password: req.body.candidate_hashed_password,
      is_registered: req.body.is_registered,
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
    const offerRegisteredId = Number(req.params.id);
    await candidate_registeredOfferRepository.delete(offerRegisteredId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browseRegisteredOffersByCandidate, read, add, destroy };
