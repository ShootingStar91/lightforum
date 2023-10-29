import { Post, Thread, User, Forum } from "../models";
import { testData } from "../testData.js";

const destroyOptions = {
  where: {},
  truncate: true,
  cascade: true,
  restartIdentity: true,
};

export const seedTestData = async () => {
  await Post.destroy(destroyOptions);
  await Thread.destroy(destroyOptions);
  await User.destroy(destroyOptions);
  await Forum.destroy(destroyOptions);
  await User.bulkCreate(testData.users);
  await Forum.bulkCreate(testData.forums);
  await Thread.bulkCreate(testData.threads);
  await Post.bulkCreate(testData.posts);
};
