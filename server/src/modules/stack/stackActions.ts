import type { RequestHandler } from "express";
import stackRepository from "./stackRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const stacks = await stackRepository.readAll();
    res.json(stacks);
  } catch (error) {
    next(error);
  }
};

export default { browse };
