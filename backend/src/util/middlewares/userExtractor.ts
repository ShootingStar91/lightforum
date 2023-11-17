import User from "../../models/user.js";
import { Middleware } from "./types.js";

declare module "express-serve-static-core" {
  interface Request {
    token?: string | null;
    user: User;
  }
}
export const userExtractor: Middleware = (req, _res, next) => {
  req.user = { username: "Fakeuser", id: 1 } as User;
  void next();
};
