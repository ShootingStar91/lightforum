import { Thread } from "../models/index.js";
import { ThreadFields } from "../router/thread.js";

export const getAllThreads = async () => {
  return await Thread.findAll();
};

export const createThread = async (thread: ThreadFields) => {
  const result = await Thread.create(thread);
  return result;
};
