import supertest from "supertest";
import { app } from "../app.js";
import { describe, test, expect } from "@jest/globals";
import { connectToDatabase } from "../util/db.js";
import { testData } from "../testData.js";
import { Thread } from "../models/index.js";
import { seedTestData } from "../testUtils/seedTestData.js";

const api = supertest(app);

describe("Test thread routes", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  beforeEach(async () => {
    await seedTestData();
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
      expect(responseToEdit.status).toBe(404);
    });

    test("Appropriate error message when id is not a number", async () => {
      const editedFields = { title: "Edited title", content: "Edited content" };
      const responseToEdit = await api.put("/threads/abc").send(editedFields);
      expect(responseToEdit.status).toBe(400);
      const responseObject = JSON.parse(responseToEdit.text) as {
        message: string;
      };
      expect(responseObject.message).toBe("Invalid id");
    });
  });

  describe("Getting threads routes tests", () => {
    test("Getting all threads returns test data", async () => {
      const response = await api.get("/threads/");
      expect(response.statusCode).toBe(200);
      const data = JSON.parse(response.text) as typeof testData.threads;
      testData.threads.forEach((thread, index) =>
        expect(data[index]).toMatchObject(thread)
      );
    });

    test("Getting single thread works", async () => {
      type ResponseType = {
        thread: (typeof testData.threads[0]);
        posts: [(typeof testData.posts[0])];
      };
      const id = 1;
      const response = await api.get(`/threads/${id}`);
      expect(response.statusCode).toBe(200);
      const data = JSON.parse(response.text) as ResponseType;
      expect(data.thread).toMatchObject(testData.threads[0]);
      testData.posts.forEach(post => expect(data.posts).toEqual(expect.arrayContaining([expect.objectContaining(post)])));
    });
  });
});
