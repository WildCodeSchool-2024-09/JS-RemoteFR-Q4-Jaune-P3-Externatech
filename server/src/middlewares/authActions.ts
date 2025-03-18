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
        role: req.user.role,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });
      res.cookie("auth", token).send({
        message: "Utilisateur connecté",
        role: req.user.role,
        id: req.user.id,
      });
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
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }
    if (resultPayload.role === "company") {
      req.company = { id: resultPayload.id };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const verifyCandidate: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }

    if (resultPayload.role === "candidate") {
      req.candidate = { id: resultPayload.id };
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default { login, hashPassword, verifyCandidate, verifyCompany };
