import type { RequestHandler } from "express";

import argon2 from "argon2";

import companyRepository from "../modules/company/companyRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await companyRepository.readByEmailWithPassword(
      req.body.email,
    );

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );
    console.info(verified);

    if (verified) {
      const { hashed_password, ...userWithoutHashedPassword } = user;

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
