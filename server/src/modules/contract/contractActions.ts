import type { RequestHandler } from "express";
import contractRepository from "./contractRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const contract = await contractRepository.readAll();

    res.json(contract);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const contractId = Number(req.params.id);
    const contract = await contractRepository.read(contractId);

    if (contract == null) {
      res.sendStatus(404);
    } else {
      res.json(contract);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const contract = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const affectedRows = await contractRepository.update(contract);

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
    const newContract = req.body;

    const insertId = await contractRepository.create(newContract);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const contractId = Number(req.params.id);

    await contractRepository.delete(contractId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
