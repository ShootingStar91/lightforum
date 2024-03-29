import { Router, Request } from "express";
import {
  createPost,
} from "../services/post.js";
import { z } from "zod";
import { bodyValidator } from "../util/middlewares/validators/index.js";

const router = Router();

const PostSchema = z.object({
  content: z.string().min(2, "Content too short"),
  userId: z.number().min(1, "User id must be defined"),
  threadId: z.number().min(1, "Thread id must be defined"),
});

type PostFields = z.infer<typeof PostSchema>;

// Post = response to a thread
router.post("/new", bodyValidator(PostSchema), async (req: Request<object, object, PostFields>, res) => {
  const content = req.body.content;
  const threadId = req.body.threadId;
  const result = await createPost(req.user.id, threadId, content);
  return res.json(result);
});

export default router;
