import { Middleware } from "./types.js";

export const logger: Middleware = (req, _res, next) => {
  console.log(req.method + " " + req.url);
  if (req.body) console.log("Body: ", req.body);
  void next();
};

