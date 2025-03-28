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
    const companyId = req.company.id;
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

const readGeneralDetails: RequestHandler = async (req, res, next) => {
  try {
    const companyId = Number(req.params.id);
    const company = await companyRepository.readGeneralDetails(companyId);

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
      logo: req.file?.filename,
      description: req.body.description,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      siret: req.body.siret,
    };

    const insertId = await companyRepository.create(newCompany);

    res.status(201).json({ insertId });
  } catch (err) {
    if (typeof err === "object" && err !== null && "code" in err) {
      const error = err as { code: string };

      if (error.code === "ER_DUP_ENTRY") {
        void res.status(400).json({ error: "Cet email est déjà utilisé." });
        return;
      }
    }
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
    const editCompany = {
      id: req.company.id,
      name: req.body.name,
      logo: req.body.logo,
      description: req.body.description,
      email: req.body.email,
      siret: req.body.siret,
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      size: req.body.size,
      website: req.body.website,
    };

    const affectedRows = await companyRepository.update(editCompany);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readGeneralDetails, add, destroy, edit };
