import { Router } from "express";
import { createUser, tryLogin } from "../services/user";
import 'express-async-errors';

const router = Router();

router.post("/create", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await createUser(username, password);
  res.json(result);
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await tryLogin(username, password);
  res.json(result);
});

export default router;
