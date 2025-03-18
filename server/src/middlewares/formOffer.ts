import type { RequestHandler } from "express";

import Joi from "joi";

const offerSchema = Joi.object({
  id: Joi.any().optional(),
  title: Joi.string().max(255).required().messages({
    "string.max": "Le titre ne peut pas dépasser 255 caractères.",
    "string.empty": "Le titre est obligatoire.",
    "any.required": "Le titre est obligatoire.",
  }),
  city: Joi.string().max(255).required().messages({
    "string.max": "La ville ne peut pas dépasser 255 caractères.",
    "string.empty": "La ville est obligatoire.",
    "any.required": "La ville est obligatoire.",
  }),
  background: Joi.string().required().messages({
    "string.empty": "Le background est obligatoire.",
    "any.required": "Le background est obligatoire.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "La description est obligatoire.",
    "any.required": "La description est obligatoire.",
  }),
  salary: Joi.number().integer().positive().required().messages({
    "number.base": "Le salaire doit être un nombre.",
    "number.integer": "Le salaire doit être un nombre entier.",
    "number.positive": "Le salaire doit être un nombre positif.",
    "any.required": "Le salaire est obligatoire.",
  }),
  profile: Joi.string().required().messages({
    "string.empty": "Le profil recherché est obligatoire.",
    "any.required": "Le profil recherché est obligatoire.",
  }),

  work_condition_id: Joi.number().integer().positive().required().messages({
    "number.positive":
      "Le champ concernant le télétravail doit être séléctionné.",
    "number.base": "Le champ concernant le télétravail doit être séléctionné.",
    "any.required": "Le champ concernant le télétravail doit être séléctionné.",
  }),

  contract_id: Joi.number().integer().positive().required().messages({
    "number.positive": "Le type de contrat doit être selectionné.",
    "number.base": "Le type de contrat doit être selectionné.",
    "any.required": "Le type de contrat est obligatoire.",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = offerSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
