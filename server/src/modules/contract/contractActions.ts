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

export default { browse };
