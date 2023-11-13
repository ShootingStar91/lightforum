import axios from "axios";
import { ForumType, PostType, ThreadType, UserType } from "../types";

const baseUrl = `http://localhost:3001`;

export const getForums = async () => {
  const response = await axios.get(`${baseUrl}/forums`);
  if (response) {
    return response.data as [ForumType];
  }
  return null;
};

export const getThreads = async () => {
  const response = await axios.get(`${baseUrl}/threads`);
  if (response) {
    return response.data as [ThreadType];
  }
  return null;
};

export const getThread = async ({ queryKey }: any) => {
  const [_, threadId] = queryKey;
  const response = await axios.get(`${baseUrl}/threads/${threadId}`);
  console.log({ threadId, response });
  if (response) {
    return response.data as { thread: ThreadType; posts: [PostType] };
  }
  return null;
};

export const getUsers = async () => {
  console.log("getusers");
  const response = await axios.get(`${baseUrl}/users`);
  console.log({ response });
  if (response) {
    return response.data as [UserType];
  }
  return null;
};

export const postMutation = async (post: { content: string, userId: number, threadId: number}) => {
  const response = await axios.post(`${baseUrl}/posts/new`, post);
  console.log({ response });
};