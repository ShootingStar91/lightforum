import supertest from "supertest";
import { app } from "../app.js";
import { describe, test, expect } from "@jest/globals";
import Forum from "../models/forum.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import { connectToDatabase } from "../util/db.js";
import { testData } from "../testData.js";
import Thread from "../models/thread.js";

const api = supertest(app);

const destroyOptions = {
  where: {},
  truncate: true,
  cascade: true,
  restartIdentity: true,
};

const seedTestData = async () => {
  await Post.destroy(destroyOptions);
  await Thread.destroy(destroyOptions);
  await User.destroy(destroyOptions);
  await Forum.destroy(destroyOptions);
  await User.bulkCreate(testData.users);
  await Forum.bulkCreate(testData.forums);
  await Thread.bulkCreate(testData.threads);
  await Post.bulkCreate(testData.posts);
};

describe("Test post API", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  beforeEach(async () => {
    await seedTestData();
  });

  test("Test data exists in database", async () => {
    const response = await api.get("/threads/");
    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.text) as typeof testData.threads;
    testData.threads.forEach((thread, index) =>
      expect(data[index]).toMatchObject(thread)
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
