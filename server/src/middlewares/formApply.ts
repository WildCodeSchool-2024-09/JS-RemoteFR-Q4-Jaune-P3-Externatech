import type { RequestHandler } from "express";
import Joi from "joi";

const applySchema = Joi.object({
  offer_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'offre doit être selectionnée.",
    "number.integer": "L'offre doit être selectionnée.",
    "number.positive": "L'offre doit être selectionnée.",
    "any.required": "L'offre doit être selectionnée",
  }),
  resume: Joi.any().required().messages({
    "any.required": "Le CV est obligatoire.",
  }),
});
const validate: RequestHandler = (req, res, next) => {
  const { offer_id } = req.body;
  const { file } = req;
  const validation = applySchema.validate({ offer_id, resume: file });

  if (validation.error) {
    res.status(400).json({ error: validation.error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
