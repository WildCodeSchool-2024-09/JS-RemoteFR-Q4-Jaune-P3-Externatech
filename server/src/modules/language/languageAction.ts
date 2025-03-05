import type { RequestHandler } from "express";
import languageRepository from "./languageRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const languages = await languageRepository.readAll();
    res.json(languages);
  } catch (error) {
    next(error);
  }
};

export default { browse };
