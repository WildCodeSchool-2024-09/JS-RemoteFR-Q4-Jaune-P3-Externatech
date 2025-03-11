import type { RequestHandler } from "express";

import companyRepository from "./companyRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const companies = await companyRepository.readAll();

    res.json(companies);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const companyId = req.companyID;
    const company = await companyRepository.read(companyId);

    if (company == null) {
      res.sendStatus(404);
    } else {
      res.json(company);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCompany = {
      name: req.body.name,
      logo: req.body.logo,
      description: req.body.description,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const insertId = await companyRepository.create(newCompany);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const companyId = Number(req.params.id);

    await companyRepository.delete(companyId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const company = {
      id: Number(req.params.id),
      name: req.body.name,
      logo: req.body.logo,
      description: req.body.description,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const affectedRows = await companyRepository.update(company);

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
