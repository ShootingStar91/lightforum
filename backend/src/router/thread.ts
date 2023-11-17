import { Request, Response, Router } from "express";
import { createThread, deleteThread, getAllThreads, getThread } from "../services/thread.js";
import { z } from "zod";
import Thread from "../models/thread.js";
import { NotFoundError } from "../util/errorTypes.js";
import { bodyValidator, queryIdValidator } from "../util/middlewares/validators/index.js";

const router = Router();

const ThreadSchema = z.object({
  title: z.string().min(2, "Title too short"),
  content: z.string(),
  forumId: z.number(),
  userId: z.number(),
});

const ThreadEditSchema = z.object({
  title: z.string().min(2, "Title too short"),
  content: z.string(),
  forumId: z.number().optional(),
  userId: z.number().optional(),
});

export type ThreadFields = z.infer<typeof ThreadSchema>;

router.get("/:id", queryIdValidator, async (req, res) => {
  const topicId = parseInt(req.params.id);
  const result = await getThread(topicId);
  return res.status(200).json(result);
});

router.get("/", async (_req, res) => {
  const threads = await getAllThreads();
  return res.status(200).json(threads);
});

router.post(
  "/",
  bodyValidator(ThreadSchema),
  async (req: Request<object, object, ThreadFields>, res: Response) => {
    const { title, content, forumId, userId } = req.body;
    const result = await createThread({ title, content, forumId, userId });
    if (result) return res.status(200).json(result);
    throw new NotFoundError();
  }
);

router.put(
  "/:id",
  queryIdValidator,
  bodyValidator(ThreadEditSchema),
  async (req: Request<{id: string}, object, ThreadFields>, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const [amountEdited] = await Thread.update({ title, content }, { where: { id } });
    if (amountEdited > 0) {
      return res.status(200).send();
    }
    throw new NotFoundError();
  }
);

router.delete("/:id", queryIdValidator, async (req: Request<{id: string}, object, object>, res: Response) => {
  const id = parseInt(req.params.id);
  const thread = await Thread.findByPk(id);
  if (!thread) throw new NotFoundError();
  await deleteThread(id);
  return res.status(200).send();
});

export default router;
