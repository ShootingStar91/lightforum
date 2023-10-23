import { Router, Request } from "express";
import { createUser, tryLogin } from "../services/user.js";
import { z } from "zod";
import { bodyValidator } from "../util/middleware.js";

const router = Router();

const UserSchema = z.object({
  username: z.string().min(3, "Username has to be at least 3 characters long"),
  password: z.string().min(6, "Password has to be at least 6 characters long"),
});

type UserType = z.infer<typeof UserSchema>;

router.post(
  "/create",
  bodyValidator(UserSchema),
  async (req: Request<object, object, UserType>, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await createUser(username, password);
    res.json(result);
  }
);

router.post(
  "/login",
  bodyValidator(UserSchema),
  async (req: Request<object, object, UserType>, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await tryLogin(username, password);
    if (!result) return res.status(400).send();
    return res.json(result);
  }
);

export default router;
