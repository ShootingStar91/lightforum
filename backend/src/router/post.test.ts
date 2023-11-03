import supertest from "supertest";
import { app } from "../app.js";
import { describe } from "@jest/globals";
import { connectToDatabase, disconnectFromDatabase } from "../util/db.js";
import { Post } from "../models/index.js";
import { seedTestData } from "../testUtils/seedTestData.js";

const api = supertest(app);

describe("Test post routes", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  beforeEach(async () => {
    await seedTestData();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  test("Creating post works", async () => {
    const newPost = {
      content: "New post made in test",
      userId: 1,
      threadId: 1,
    };
    const response = await api.post("/posts/new").send(newPost);
    expect(response.status).toBe(200);
    const postInDb = await Post.findOne({
      where: { content: newPost.content },
    });
    expect(postInDb).toBeDefined();
    expect(postInDb!.content).toEqual(newPost.content);
  });
});
