import type { RequestHandler } from "express";
import Joi from "joi";

const candidateSchema = Joi.object({
  firstname: Joi.string().max(50).required().messages({
    "string.max": "Le prénom ne peut pas dépasser 50 caractères.",
    "string.empty": "Le prénom est obligatoire.",
    "any.required": "Le prénom est obligatoire.",
  }),
  lastname: Joi.string().max(50).required().messages({
    "string.max": "La nom de famille ne peut pas dépasser 50 caractères.",
    "string.empty": "La nom de famille est obligatoire.",
    "any.required": "La nom de famille est obligatoire.",
  }),
  email: Joi.string().required().messages({
    "string.empty": "L'email est obligatoire.",
    "any.required": "L'email est obligatoire.",
  }),
  hashed_password: Joi.string().required().messages({
    "string.empty": "Le mot de passe est obligatoire.",
    "any.required": "Le mot de passe est obligatoire.",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = candidateSchema.validate(req.body);

  if (error) {
    res.json(error.details[0].message);
  } else {
    next();
  }
};

export default { validate };
