import type { RequestHandler } from "express";
import Joi from "joi";

const companySchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Le nom est obligatoire",
    "string.empty": "Le champ ne peut pas être vide",
  }),
  logo: Joi.string().max(100).required().messages({
    "any.required": "Le champ logo est obligatoire",
    "string.empty": "Le champ logo ne peut pas être vide",
  }),
  description: Joi.string().required().messages({
    "any.required": "Ce champs est obligatoire",
    "string.empty": "Le champ ne peut pas être vide",
  }),
  siret: Joi.string().required().messages({
    "string.empty": "Ce champs doit contenir 14 chiffres",
    "any.required": "Ce champs est obligatoire",
  }),
  email: Joi.string()
    .min(5)
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .messages({
      "string.empty": "Le champ ne peut pas être vide",
      "string.min": "Une longueur de 5 caractères est demandée",
      "any.required": "Le champ est obligatoire",
      "string.email": "L'adresse mail doit être valide",
    }),
  password: Joi.string().min(8).max(100).required().label("password").messages({
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
  const { error } = companySchema.validate(req.body);

  if (error) {
    res.json(error.details[0].message);
  } else {
    next();
  }
};

export default { validate };
