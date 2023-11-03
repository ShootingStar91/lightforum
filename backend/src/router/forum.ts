import { Request, Router } from "express";
import "express-async-errors";
import { Forum, Thread } from "../models/index.js";
import { bodyValidator, queryIdValidator } from "../util/middleware.js";
import { z } from "zod";
import { deleteThread } from "../services/thread.js";

const router = Router();

const ForumSchema = z.object({
  title: z.string(),
  description: z.string().min(5, "Too short description"),
});

type ForumFields = z.infer<typeof ForumSchema>;

router.get("/", async (_req, res) => {
  const forums = await Forum.findAll({});
  res.status(200).json(forums);
});

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
  queryIdValidator,
  bodyValidator(ForumSchema),
  async (req: Request<{ id: string }, object, ForumFields>, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const id = parseInt(req.params.id);
    await Forum.update({ title, description }, { where: { id: id } });
    res.status(200).send();
  }
);

router.delete(
  "/delete/:id",
  queryIdValidator,
  async (req: Request<{ id: string }, object, ForumFields>, res) => {
    const id = parseInt(req.params.id);
    const threads = await Thread.findAll({
      where: { forumId: id },
      attributes: ["id"],
    });
    for (const thread of threads) {
      await deleteThread(thread.id);
    }
    await Forum.destroy({ where: { id } });
    return res.status(200).send();
  }
);

export default router;
