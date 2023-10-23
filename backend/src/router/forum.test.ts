import supertest from "supertest";
import { app } from "../index.js";
import {describe, test, expect } from '@jest/globals';
const api = supertest(app);

describe("Test post API", () => {
  test("User creation works", async () => {
    const response = await api.post("/posts/new_topic");
    expect(response.statusCode).toBe(200);
    const topicsResponse = await api.get("/posts/topic");
    expect(topicsResponse.statusCode).toBe(200);
  });
});
