import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import companyRepository from "../modules/company/companyRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const company = await companyRepository.readByEmailWithPassword(email);
    if (!company) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(company.hashed_password, password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: company.id,
        email: company.email,
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

import candidateRepository from "../modules/candidate/candidateRepository";

const loginCandidate: RequestHandler = async (req, res, next) => {
  try {
    const candidate = await candidateRepository.readByEmailWithPassword(
      req.body.email,
    );
    if (candidate == null) {
      res.sendStatus(422);
      return;
    }

    const verfiedCandidate = await argon2.verify(
      candidate.hashed_password,
      req.body.password,
    );

    if (verfiedCandidate) {
      const { hashed_password, ...candidateWithoutHashedPassword } = candidate;
      res.json(candidateWithoutHashedPassword);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
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

export default { login, loginCandidate, hashPassword };
