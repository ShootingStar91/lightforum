import { Request, Response, Router } from "express";
import { createThread, getAllThreads } from "../services/thread.js";
import { z } from "zod";
import { bodyValidator, queryIdValidator } from "../util/middleware.js";
import Thread from "../models/thread.js";
import Post from "../models/post.js";

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

// Get single thread and it's posts
// router.get("/:id", queryIdValidator, async (req, res) => {
//   const topicId = parseInt(req.query.id as string);
//   const result = await getFullTopic(topicId);
//   if (result) {
//     return res.status(200).json(result);
//   }
//   return res.status(404).send();
// });

// Get all threads (without posts)
router.get("/", async (_req, res) => {
  const threads = await getAllThreads();
  return res.status(200).json(threads);
});

// Create thread
router.post(
  "/",
  bodyValidator(ThreadSchema),
  async (req: Request<object, object, ThreadFields>, res: Response) => {
    const { title, content, forumId, userId } = req.body;
    const result = await createThread({ title, content, forumId, userId });
    if (result) return res.status(200).json(result);
    return res.status(400).send();
  }
);

// Edit thread (title or forumId)
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
    return res.status(400).json({ message: "Thread with given id not found" });
  }
);

// Delete thread
router.delete("/:id", queryIdValidator, async (req: Request<{id: string}, object, object>, res: Response) => {
  const id = parseInt(req.params.id);
  const thread = await Thread.findByPk(id);
  if (!thread) return res.status(400).send();
  const postDeletion = await Post.destroy({ where: { threadId: id } });
  if (!postDeletion) return res.status(400).json({ message: "Found thread, but could not delete posts or thread" });
  const threadDeletion = await Thread.destroy({ where: { id } });
  if (!threadDeletion) return res.status(400).json({ message: "Deleted posts, but could not delete thread" });
  return res.status(200).send();
});

export default router;
