import type { RequestHandler } from "express";
import workConditionRepository from "./workConditionRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const workCondition = await workConditionRepository.readAll();

    res.json(workCondition);
  } catch (err) {
    next(err);
  }
};

export default { browse };
