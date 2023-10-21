import express from "express";

type Next = () => void | Promise<void>;

type Middleware = (req: express.Request, res: express.Response, next: Next) => void;

declare module "express-serve-static-core" {
  interface Request {
    token?: string | null;
    user: User;
  }
}

export const logger: Middleware = async (req, _res, next) => {
  console.log(req.method + " " + req.url);
  if (req.body) console.log("Body: ", req.body);
  void next();
};

export const userExtractor: Middleware = async (req, _res, next) => {
  req.user = { username: 'Fakeuser', id: 1 }
  void next();
};
