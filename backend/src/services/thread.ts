import { Post, Thread } from "../models/index.js";
import { ThreadFields } from "../router/thread.js";

export const getAllThreads = async () => {
  return await Thread.findAll();
};

export const createThread = async (thread: ThreadFields) => {
  const result = await Thread.create(thread);
  return result;
};

export const getThread = async (id: number) => {
  const thread = await Thread.findByPk(id);
  if (!thread) throw Error("Could not find thread");
  const posts = await Post.findAll({ where: { threadId: id }});
  return { thread, posts };
};
