import { randomUUID } from "node:crypto";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/logo",
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const name = `${randomUUID()}-${file.originalname}`;
    req.body.logo = name;
    cb(null, name);
  },
});

const uploadFile: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const upload = multer({ storage });

    return upload.single("logo")(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default { uploadFile };
