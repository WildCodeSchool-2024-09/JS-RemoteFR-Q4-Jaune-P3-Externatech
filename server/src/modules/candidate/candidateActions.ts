import type { RequestHandler } from "express";
import candidateRepository from "./candidateRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateRepository.readAll();

    res.json(candidate);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const candidateId = Number(req.params.id);
    const candidate = await candidateRepository.read(candidateId);

    if (candidate == null) {
      res.sendStatus(404);
    } else {
      res.json(candidate);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const candidate = {
      id: Number(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const affectedRows = await candidateRepository.update(candidate);

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
    const newCandidate = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const insertId = await candidateRepository.create(newCandidate);

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
    const candidateId = Number(req.params.id);

    await candidateRepository.delete(candidateId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, destroy, edit };
