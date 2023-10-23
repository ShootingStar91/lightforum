import supertest from "supertest";
import { app } from "../app.js";
import { describe, test, expect } from "@jest/globals";
import Forum from "../models/forum.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import { connectToDatabase } from "../util/db.js";
import { testData } from "../testData.js";

const api = supertest(app);

const seedTestData = async () => {
  await Post.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Forum.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.bulkCreate(testData.users);
  await Forum.bulkCreate(testData.forums);
  await Post.bulkCreate(testData.posts);
  await Post.bulkCreate(testData.responses);
};

describe("Test post API", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  beforeEach(async () => {
    await seedTestData();
  });

  test("Test data exists in database", async () => {
    const response = await api.get("/posts/topic");
    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.text) as typeof testData.posts;
    testData.posts.forEach((post, index) =>
      expect(data[index]).toMatchObject(post)
    );
  });

  test("Topic creation works", async () => {
    const mock_topic = {
      title: "Mock topic 1",
      content: "Mock topic content",
      forum_id: "1",
      user_id: "1",
    };
    const response = await api.post("/posts/new_topic").send(mock_topic);
    expect(response.statusCode).toBe(200);
    const topicsResponse = await api.get("/posts/topic");
    expect(topicsResponse.statusCode).toBe(200);
  });
});
