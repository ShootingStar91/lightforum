import supertest from "supertest";
import { app } from "../app.js";
import { describe, test, expect } from "@jest/globals";
import Forum from "../models/forum.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import { connectToDatabase } from "../util/db.js";
const api = supertest(app);

const seedTestData = async () => {
  await Post.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
  await User.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
  await Forum.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
  await User.create({ username: "Test User 1", password_hash: "dasfajfafsd" });
  await User.create({ username: "Test User 2", password_hash: "123assddasd" });
  await Forum.create({
    title: "Test forum",
    description: "General discussion about testing, obviously!",
  });
  await Post.create({
    title: "Test topic 1",
    content: "First test topic. Testing is fun!",
    forumId: 1,
    userId: 1,
  });
  await Post.create({
    title: "Test response 1",
    content: "Hi there, I agree.",
    forumId: 1,
    parentId: 1,
    userId: 2,
  });
};

describe("Test post API", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  beforeEach(async () => {
    await seedTestData();
  });

  test("Topic creation works", async () => {
    const mock_topic = {
      title: "test_user_1",
      content: "test_user_pass_1",
      forum_id: "1",
      user_id: "1",
    };
    const response = await api.post("/posts/new_topic").send(mock_topic);
    expect(response.statusCode).toBe(200);
    const topicsResponse = await api.get("/posts/topic");
    expect(topicsResponse.statusCode).toBe(200);
  });
});
