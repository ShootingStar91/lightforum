import { Thread } from "../models/index.js";

export const getAllThreads = async () => {
  return await Thread.findAll();
};
