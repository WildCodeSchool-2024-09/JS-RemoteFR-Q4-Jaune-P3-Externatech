import type { RequestHandler } from "express";
import offerRepository from "./offerRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const offers = await offerRepository.readAll();

    res.json(offers);
  } catch (err) {
    next(err);
  }
};

const browseByCompany: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const offers = await offerRepository.readAllByCompany(id);

    res.json(offers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const offerId = Number(req.params.id);
    const offer = await offerRepository.read(offerId);

    if (offer == null) {
      res.sendStatus(404);
    } else {
      res.json(offer);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const offer = {
      id: Number(req.params.id),
      title: req.body.title,
      city: req.body.city,
      background: req.body.background,
      description: req.body.description,
      salary: req.body.salary,
      profile: req.body.profile,
      remote_id: req.body.remote_id,
      company_id: req.body.company_id,
      contract_id: req.body.contract_id,
    };

    const affectedRows = await offerRepository.update(offer);

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
    const newOffer = req.body;
    console.info("newOffer", newOffer);
    const insertId = await offerRepository.create(newOffer);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const offerId = Number(req.params.id);

    await offerRepository.delete(offerId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, browseByCompany, read, add, edit, destroy };
