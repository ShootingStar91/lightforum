import express, { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { z } from "zod";

type Next = () => void | Promise<void>;

type Middleware = (
  req: express.Request,
  res: express.Response,
  next: Next
) => void;

declare module "express-serve-static-core" {
  interface Request {
    token?: string | null;
    user: User;
  }
}

export const logger: Middleware = (req, _res, next) => {
  console.log(req.method + " " + req.url);
  if (req.body) console.log("Body: ", req.body);
  void next();
};

export const userExtractor: Middleware = (req, _res, next) => {
  req.user = { username: "Fakeuser", id: 1 } as User;
  void next();
};

export const bodyValidator =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Body: ", req.body);
    const err = schema.safeParse(req.body);
    if (err) {
      return res.status(400).json(err);
    }
    console.log("Parse ok");
    return next();
  };

export const queryIdValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.query?.id &&
    typeof req.query.id === "string" &&
    !isNaN(parseInt(req.query.id))
  ) {
    return next();
  }
  return res.status(400).json({ message: "Invalid id" });
};
