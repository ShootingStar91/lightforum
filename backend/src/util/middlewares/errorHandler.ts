import express from "express";
import { CustomError } from "../errorTypes.js";

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

