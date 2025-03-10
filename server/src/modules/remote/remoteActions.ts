import type { RequestHandler } from "express";
import remoteRepository from "./remoteRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const remote = await remoteRepository.readAll();

    res.json(remote);
  } catch (err) {
    next(err);
  }
};

export default { browse };
