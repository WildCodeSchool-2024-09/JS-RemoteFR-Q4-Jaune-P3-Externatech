import type { RequestHandler } from "express";
import Joi from "joi";

const applySchema = Joi.object({
  offer_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'offre doit être selectionnée.",
    "number.integer": "L'offre doit être selectionnée.",
    "number.positive": "L'offre doit être selectionnée.",
    "any.required": "L'offre doit être selectionnée",
  }),
  resume: Joi.string()
    .pattern(/\.(pdf|jpg)$/i)
    .required()
    .messages({
      "string.pattern.base": "Le CV doit être un fichier PDF ou JPG.",
      "string.empty": "Le CV est obligatoire.",
      "any.required": "Le CV est obligatoire.",
    }),
});
const validate: RequestHandler = (req, res, next) => {
  const { error } = applySchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
