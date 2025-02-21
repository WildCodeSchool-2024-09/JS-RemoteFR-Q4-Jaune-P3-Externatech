import type { RequestHandler } from "express";

import Joi from "joi";

const offerSchema = Joi.object({
  title: Joi.string().max(255).required().messages({
    "string.max": "Le titre ne peut pas dépasser 255 caractères.",
    "string.empty": "Le titre est obligatoire.",
    "any.required": "Le titre est obligatoire.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "La description est obligatoire.",
    "any.required": "La description est obligatoire.",
  }),
  date: Joi.date().required().messages({
    "date.base": "La date doit être sous la forme : YYYY-MM-DD .",
    "any.required": "La date est obligatoire.",
  }),
  salary: Joi.number().integer().positive().required().messages({
    "number.base": "Le salaire doit être un nombre.",
    "number.integer": "Le salaire doit être un nombre entier.",
    "number.positive": "Le salaire doit être un nombre positif.",
    "any.required": "Le salaire est obligatoire.",
  }),
  requirements: Joi.string().required().messages({
    "string.empty": "Les exigences sont obligatoires.",
    "any.required": "Les exigences sont obligatoires.",
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
