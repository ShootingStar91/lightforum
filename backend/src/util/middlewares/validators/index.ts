import { z } from "zod";
import { InvalidParametersError } from "../../errorTypes.js";
import { NextFunction, Request, Response } from "express";

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

