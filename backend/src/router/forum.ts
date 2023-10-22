import { Request, Router } from 'express';
import "express-async-errors";
import { Forum } from "../models/index.js";

const router = Router();

type ForumFields = { title: string, description: string };

router.post("/new", async (req: Request<object, object, ForumFields>, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const forum = await Forum.create({ title, description });
  res.status(200).json(forum);
});

router.put("/edit/:id", async (req: Request<object, object, ForumFields>, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = parseInt(req.query.id as string);
  await Forum.update({ title, description }, { where: { id: id } });
  res.status(200).send();
});

router.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.query.id as string);
  await Forum.destroy({ where: { id } });
  res.status(200).send();
});

export default router;
