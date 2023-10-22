import { Post, Forum } from "../models/index.js";

const findTopic = async (topicId: number) => {
  const topic = await Post.findOne({ where: { parentId: topicId } });
  return topic;
};

export const createPost = async (
  userId: number,
  topicId: number,
  content: string
) => {
  const topic = await findTopic(topicId);
  if (!topic) {
    return null;
  }
  const newPost = await Post.create({
    userId,
    parentId: topicId,
    content,
    forumId: topic.forumId,
  });
  return newPost;
};

export const createTopic = async (
  userId: number,
  forumId: number,
  title: string,
  content: string
) => {
  const newTopic = await Post.create({
    userId,
    forumId,
    title,
    content,
  });
  return newTopic;
};

export const getTopic = async (topicId: number) => {
  const topicPost = await Post.findByPk(topicId, { raw: true });
  const responses = await Post.findAll({
    where: { parentId: topicId },
    raw: true,
  });
  return [topicPost, ...responses];
};

export const getTopics = async () => {
  const posts = await Post.findAll({
    attributes: ["id", "title", "forum_id"],
    where: { parentId: null },
    raw: true,
    mapToModel: true,
  });
  const forums = await Forum.findAll({
    raw: true,
    mapToModel: true,
  });

  return forums.map((f) => ({
    ...f,
    posts: posts.filter((p) => p.forumId === f.id),
  }));
};
