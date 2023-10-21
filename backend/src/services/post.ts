import { Forum } from "../models/";
import { Post } from "../models/";

type ForumType = {
  id: number,
  title: string,
  description: string,
}

type PostType = {
  id: number,
  title: string,
  content: string,
  parentId: number,
  forumId: number,
}

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
  title: string,
  content: string
) => {
  const newTopic = await Post.create({
    user_id: userId,
    forum_id: forumId,
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
    where: { parent_id: null },
    raw: true,
    mapToModel: true,
  });
  const forums = await Forum.findAll<Forum>({ raw: true, mapToModel: true });
  console.log({ posts, forums });
  return forums.map((f) => ({
    ...f,
    posts: posts.filter((p) => p.dataValues.forumId === f.dataValues.id),
  }));
};
