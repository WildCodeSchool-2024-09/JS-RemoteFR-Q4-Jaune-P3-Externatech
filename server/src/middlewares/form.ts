import type { RequestHandler } from "express";
import Joi from "joi";

const companySchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Ce champ est obligatoire",
    "string.empty": "Le champ ne peut pas être vide",
  }),
  description: Joi.string().required().messages({
    "any.required": "Ce champs est obligatoire",
    "string.empty": "Le champ ne peut pas être vide",
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
  password: Joi.string()
    .min(8)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .label("password")
    .messages({
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
  const { error } = companySchema.validate(req.body, { abortEarly: false }); // Validation du corps de la requête avec Joi

  if (error) {
    // Si la validation échoue, renvoyer une erreur 400 avec le message d'erreur
    res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "),
    });
  } else {
    next();
  }
};

export default { validate };
