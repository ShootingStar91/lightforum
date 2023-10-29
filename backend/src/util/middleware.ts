import express, { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { z } from "zod";
import { InvalidParametersError, CustomError } from "./errorTypes.js";

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

export const errorHandler = (
  error: Error | CustomError,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  if ("status" in error) {
    return res.status(error.status).json({ message: error.message });
  }
  console.log("Interal server error occurred. Error and stacktrace:");
  console.log(error.message);
  if (error.stack) console.log(error.stack);
  return res.status(500).json("Internal server error: " + error);
};

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
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      console.log("sending 400 from bodyvalidator");
      return res.status(400).json(parsed.error);
    }
    console.log("Parse ok");
    return next();
  };

export const queryIdValidator = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (
    req.params?.id &&
    typeof req.params.id === "string" &&
    !isNaN(parseInt(req.params.id))
  ) {
    return next();
  }
  throw new InvalidParametersError("Invalid id");
};
