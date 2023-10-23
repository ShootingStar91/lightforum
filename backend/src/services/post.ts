import { Post } from "../models/index.js";

export const createPost = async (
  userId: number,
  threadId: number,
  content: string
) => {
  const newPost = await Post.create({
    userId,
    threadId,
    content,
  });
  return newPost;
};
