import { Request, Router } from "express";
import { createThread, getAllThreads } from "../services/thread.js";
import { z } from "zod";
import { bodyValidator } from "../util/middleware.js";

const router = Router();

const ThreadSchema = z.object({
  title: z.string().min(2, "Title too short"),
  content: z.string(),
  forumId: z.number(),
  userId: z.number(),
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
  async (req: Request<object, object, ThreadFields>, res) => {
    const { title, content, forumId, userId } = req.body;
    const result = await createThread({ title, content, forumId, userId });
    console.log({ result });
    if (result) return res.status(200).json(result);
    return res.status(400).send();
  }
);

// Edit thread (title or forumId)

// Delete thread

export default router;
