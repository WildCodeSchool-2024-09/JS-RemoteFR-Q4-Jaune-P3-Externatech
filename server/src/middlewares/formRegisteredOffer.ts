import type { RequestHandler } from "express";

import Joi from "joi";

const registerdOfferSchema = Joi.object({
  offer_id: Joi.number().integer().positive().required().messages({
    "number.positive": "Offre déjà enregistrée.",
    "number.base": "Offre déjà enregistrée.",
    "any.required": "Offre déjà enregistrée.",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = registerdOfferSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
