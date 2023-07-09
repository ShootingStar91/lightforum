import Post from "../models/post";

export const createPost = async (
  userId: number,
  topicId: number,
  content: string
) => {
  const newPost = await Post.create({ userId, topicId, content });
  return newPost;
};

export const createTopic = async (
  userId: number,
  forumId: number,
  content: string
) => {
  const newTopic = await Post.create({ userId, forumId, content });
  return newTopic;
};

export const getTopic = async (topicId: number) => {
  const topicPost = await Post.findByPk(topicId);
  const responses = await Post.findAll({ where: { parentId: topicId } });
  return [topicPost, ...responses];
};




