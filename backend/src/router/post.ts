import { Router, Request } from "express";
import {
  createPost,
  createTopic,
  getTopic,
  getTopics,
} from "../services/post.js";

const router = Router();

type PostFields = {
  content: string;
  title: string | undefined;
  topicId: number | undefined;
  forumId: number;
};

// Answer to an existing topic
router.post("/new", async (req: Request<object, object, PostFields>, res) => {
  const content = req.body.content;
  const topicId = req.body.topicId as number;
  const result = await createPost(req.user.id, topicId, content);
  if (!result) return res.status(400).send();
  return res.json(result);
});

// Create new topic
router.post(
  "/new_topic",
  async (req: Request<object, object, PostFields>, res) => {
    const forumId = req.body.forumId;
    const content = req.body.content;
    const title = req.body.title as string;
    const result = await createTopic(req.user.id, forumId, title, content);
    res.json(result);
  }
);

router.get(
  "/topic/:topicId",
  async (req: Request<{ topicId: string }, object, PostFields>, res) => {
    const topicId = parseInt(req.params.topicId);
    const result = await getTopic(topicId);
    res.json(result);
  }
);

router.get("/topic", async (_req, res) => {
  const topics = await getTopics();
  res.json(topics);
});

export default router;
