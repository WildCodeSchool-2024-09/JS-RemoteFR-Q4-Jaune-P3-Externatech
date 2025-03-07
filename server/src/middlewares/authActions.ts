import argon2 from "argon2";
import type { RequestHandler } from "express";

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

    if (verified) {
      const { password, ...userWithoutHashedPassword } = req.user;
      res.json(userWithoutHashedPassword);
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

export default { login, hashPassword };
