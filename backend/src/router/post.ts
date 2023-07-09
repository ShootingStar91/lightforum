import { Router } from "express";
import { createPost, createTopic, getTopic } from "../services/post";
import 'express-async-errors';

const router = Router();

// Answer to an existing topic
router.post("/new", async (req, res) => {
  const content = req.body.content;
  const topicId = req.body.topicId;
  const result = await createPost(req.user.id, topicId, content);
  res.json(result);
});

// Create new topic
router.post("/new_topic", async (req, res) => {
  const forumId = req.body.forumId;
  const content = req.body.content;
  const result = await createTopic(req.user.id, forumId, content);
  res.json(result);
});

router.get("/topic/:topicId", async (req, res) => {
  const topicId = parseInt(req.params.topicId);
  const result = await getTopic(topicId);
  res.json(result);
});

export default router;
