import type { RequestHandler } from "express";
import cityRepository from "./cityRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const cities = await cityRepository.readAll();
    res.json(cities);
  } catch (error) {
    next(error);
  }
};

export default { browse };
