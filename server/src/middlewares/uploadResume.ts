import type { RequestHandler } from "express";

import { randomUUID } from "node:crypto";

import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/resumes",
  filename: (req, file, cb) => {
    const name = `${randomUUID()}-${file.originalname}`;
    req.body.picture = name;
    cb(null, name);
  },
});

const uploadFile: RequestHandler = (req, res, next) => {
  try {
    const randomId = randomUUID();
    console.info(randomId);

    const upload = multer({ storage });

    return upload.single("resume")(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default { uploadFile };
