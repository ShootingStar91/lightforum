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

describe("Test thread routes", () => {
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

  describe("Edit route tests", () => {
    test("Edit thread works", async () => {
      const editedFields = { title: "Edited title", content: "Edited content" };
      const responseToEdit = await api.put("/threads/1").send(editedFields);
      expect(responseToEdit.status).toBe(200);
      const allThreadsResponse = await api.get("/threads/");
      const allThreads = JSON.parse(allThreadsResponse.text) as [Thread];
      const found = allThreads.some((thread) =>
        expect(thread).toEqual(expect.objectContaining(editedFields))
      );
      expect(found).toBeDefined();
    });
    test("Appropriate error message when valid id but thread not found", async () => {
      const editedFields = { title: "Edited title", content: "Edited content" };
      const responseToEdit = await api.put("/threads/801").send(editedFields);
      expect(responseToEdit.status).toBe(400);
    });
  });
});
