import type { RequestHandler } from "express";
import Joi from "joi";

const companySchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Le nom est obligatoire",
    "string.empty": "Le champ ne peut pas être vide",
  }),
  logo: Joi.any().required().messages({
    "any.required": "Le champ logo est obligatoire",
  }),
  description: Joi.string().required().messages({
    "any.required": "Ce champ est obligatoire",
    "string.empty": "Le champ ne peut pas être vide",
  }),
  address: Joi.string().optional(),
  siret: Joi.string().required().messages({
    "string.empty": "Ce champ doit contenir 14 chiffres",
    "any.required": "Ce champ est obligatoire",
  }),
  email: Joi.string()
    .min(5)
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .messages({
      "string.empty": "Le champ ne peut pas être vide",
      "string.min": "Une longueur de 5 caractères est demandée",
      "any.required": "Le champ email est obligatoire",
      "string.email": "L'adresse mail doit être valide",
    }),
  password: Joi.string().min(8).max(100).required().label("password").messages({
    "string.empty": "Le champ ne peut pas être vide",
    "string.min": "Une longueur de 8 caractères est demandée",
    "any.required": "Le champ mot de passe est obligatoire",
    "string.pattern":
      "Le mot de passe doit contenir des majuscules, minuscules et caractères spéciaux",
  }),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({
      messages: { "any.only": "Les mots de passe doivent correspondre" },
    }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = companySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

const companyUpdateSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Le nom de l'entreprise est obligatoire",
    "string.empty": "Le nom de l'entreprise ne peut pas être vide",
  }),
  logo: Joi.string().max(100).required().messages({
    "any.required": "Le champ logo est obligatoire",
    "string.empty": "Le champ logo ne peut pas être vide",
  }),
  address: Joi.string().max(255).required().messages({
    "any.required": "L'addresse de l'entreprise est obligatoire",
    "string.empty": "L'addresse de l'entreprise ne peut pas être vide",
  }),

  postalCode: Joi.string().required().messages({
    "any.required": "Le code postal est obligatoire",
    "string.empty": "Le code postal ne peut pas être vide",
  }),
  city: Joi.string().required().messages({
    "any.required": "la ville est obligatoire",
    "string.empty": "la ville ne peut pas être vide",
  }),
  siret: Joi.string().min(14).max(14).required().messages({
    "string.empty": "Le siret doit contenir 14 chiffres",
    "any.required": "Le siret est obligatoire",
    "string.min":
      "Le champ siret doit avoir une longueur de 14 caractères minimum",
    "string.max":
      "Le champ siret doit avoir une longueur de 14 caractères maximum",
  }),
  size: Joi.string().required().messages({
    "any.required": "la taille de l'entreprise est obligatoire",
    "string.empty": "la taille de l'entreprise ne peut pas être vide",
  }),
  website: Joi.string().required().messages({
    "any.required": "Le site web est obligatoire",
    "string.empty": "Le site web ne peut pas être vide",
  }),
  email: Joi.string()
    .min(5)
    .max(100)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .messages({
      "string.empty": "Le champ ne peut pas être vide",
      "string.min":
        "Le champ email doit avoir une longueur de 5 caractères minimum",
      "any.required": "Le champ email est obligatoire",
      "string.email": "L'adresse mail doit être valide",
    }),
  description: Joi.string().required().messages({
    "any.required": "La description est obligatoire",
    "string.empty": "La description ne peut pas être vide",
  }),
});

const validateUpdate: RequestHandler = (req, res, next) => {
  const { error } = companyUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

export default { validate, validateUpdate };
