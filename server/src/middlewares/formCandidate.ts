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
  password: Joi.string().min(8).max(100).label("password").required().messages({
    "string.empty": "Le champ ne peut pas être vide",
    "string.min": "Une longueur de 8 caractères est demandée",
    "any.required": "Le champ est obligatoire",
    "string.pattern":
      "Le mot de passe doit contenir des majuscules, minuscules et caractères spéciaux",
  }),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { any: { allowOnly: "must match password" } } }),
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
