import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import candidateRepository from "../modules/candidate/candidateRepository";
import companyRepository from "../modules/company/companyRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const company = await companyRepository.readByEmailWithPassword(
      req.body.email,
    );
    if (company) {
      req.user = {
        password: company.hashed_password,
        id: company.id,
        email: company.email,
        role: "company",
      };
    }

    const candidate = await candidateRepository.readByEmailWithPassword(
      req.body.email,
    );
    if (candidate) {
      req.user = {
        password: candidate.hashed_password,
        id: candidate.id,
        email: candidate.email,
        role: "candidate",
      };
    }

    if (!req.user) {
      res.sendStatus(403);
    }

    const verified = await argon2.verify(req.user.password, req.body.password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: req.user.id,
        email: req.user.email,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });
      res.cookie("auth", token).send("Utilisateur connecté");
    }
  } catch (error) {
    next(error);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;

    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyCompany: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    // Récupérer le token qui est à l'intérieur du cookie
    const { auth } = req.cookies;

    // Si il y a pas le cookie on déclenche une erreur
    if (!auth) {
      res.sendStatus(403);
    }

    // Vérifier le token JWT qu'il y a à l'intérieur
    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }

    req.companyID = resultPayload.id;

    // Si tout se passe bien => next()
    next();
  } catch (error) {
    next(error);
  }
};

export default { login, hashPassword, verifyCompany };
