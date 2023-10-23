import { Request, Router } from "express";
import "express-async-errors";
import { Forum } from "../models/index.js";
import { bodyValidator, queryIdValidator } from "../util/middleware.js";
import { z } from "zod";

const router = Router();

const ForumSchema = z.object({
  title: z.string(),
  description: z.string().min(5, "Too short description"),
});

type ForumFields = z.infer<typeof ForumSchema>;

router.post(
  "/new",
  bodyValidator(ForumSchema),
  async (req: Request<object, object, ForumFields>, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const forum = await Forum.create({ title, description });
    res.status(200).json(forum);
  }
);

router.put(
  "/edit/:id",
  bodyValidator(ForumSchema),
  async (req: Request<object, object, ForumFields>, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const id = parseInt(req.query.id as string);
    await Forum.update({ title, description }, { where: { id: id } });
    res.status(200).send();
  }
);

router.delete(
  "/delete/:id",
  queryIdValidator,
  async (req, res) => {
    const id = parseInt(req.query.id as string);
    await Forum.destroy({ where: { id } });
    return res.status(200).send();
  }
);

export default router;
