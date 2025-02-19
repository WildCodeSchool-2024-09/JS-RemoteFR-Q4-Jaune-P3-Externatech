import type { RequestHandler } from "express";

import entrepriseRepository from "./entrepriseRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const entreprises = await entrepriseRepository.readAll();

    res.json(entreprises);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const entrepriseId = Number(req.params.id);
    const entreprise = await entrepriseRepository.read(entrepriseId);

    if (entreprise == null) {
      res.sendStatus(404);
    } else {
      res.json(entreprise);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newEntreprise = {
      name: req.body.name,
      description: req.body.description,
    };

    const insertId = await entrepriseRepository.create(newEntreprise);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const entrepriseId = Number(req.params.id);

    await entrepriseRepository.delete(entrepriseId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const entreprise = {
      id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
    };

    const affectedRows = await entrepriseRepository.update(entreprise);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, destroy, edit };
