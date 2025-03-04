import type { RequestHandler } from "express";

import Joi from "joi";

const offerSchema = Joi.object({
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
  logo: Joi.string().required().messages({
    "string.empty": "Le logo est obligatoire.",
    "any.required": "Le logo est obligatoire.",
  }),
  background: Joi.string().required().messages({
    "string.empty": "L'image de fond est obligatoire.",
    "any.required": "L'image de fond est obligatoire.",
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

  remote: Joi.string().max(255).required().messages({
    "string.max": "Le type de télétravail ne peut pas dépasser 255 caractères.",
    "string.empty": "Le type de télétravail est obligatoire.",
    "any.required": "Le type de télétravail est obligatoire.",
  }),
  company_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID de l'entreprise doit être un nombre.",
    "any.required": "L'ID de l'entreprise est obligatoire.",
  }),
  contract_id: Joi.number().integer().positive().required().messages({
    "string.empty": "Les exigences sont obligatoires.",
    "any.required": "Les exigences sont obligatoires.",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = offerSchema.validate(req.body);

  if (error) {
    res.json(error.details[0].message);
  } else {
    next();
  }
};

export default { validate };
