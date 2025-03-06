import argon2 from "argon2";
import type { RequestHandler } from "express";

import companyRepository from "../modules/company/companyRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const company = await companyRepository.readByEmailWithPassword(
      req.body.email,
    );
    if (company == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      company.hashed_password,
      req.body.password,
    );

    if (verified) {
      const { hashed_password, ...companyWithoutHashedPassword } = company;
      res.json(companyWithoutHashedPassword);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
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
