import { Router } from "express";
import { getAllThreads } from "../services/thread.js";

const router = Router();

// type ThreadFields = {
//   title: string | undefined;
//   userId: number | undefined;
//   forumId: number;
// };

// Get single topic and it's posts
// router.get("/:id", queryIdValidator, async (req, res) => {
//   const topicId = parseInt(req.query.id as string);
//   const result = await getFullTopic(topicId);
//   if (result) {
//     return res.status(200).json(result);
//   }
//   return res.status(404).send();
// });

// Get all topics (without posts)
router.get("/", async (_req, res) => {
  const threads = await getAllThreads();
  return res.status(200).json(threads);
});

// Create topic

// Edit topic (title or forumId)

// Delete topic

export default router;
