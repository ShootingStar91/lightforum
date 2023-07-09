import express from "express";

type Next = () => void | Promise<void>;

declare module "express-serve-static-core" {
  interface Request {
    token?: string | null;
    user: User;
  }
}

export const logger = async (
  req: express.Request,
  _res: express.Response,
  next: Next
) => {
  console.log(req.method + " " + req.url);
  if (req.body) console.log("Body: ", req.body);
  void next();
};

export const userExtractor = async (
  req: express.Request,
  _res: express.Response,
  next: Next
) => {
  req.user = { username: 'Fakeuser', id: 1 }
  void next();
};

