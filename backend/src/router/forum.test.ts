import supertest from "supertest";
import { app } from "../app.js";
import { describe } from "@jest/globals";
import { connectToDatabase } from "../util/db.js";
import { Forum } from "../models/index.js";
import { seedTestData } from "../testUtils/seedTestData.js";
import { testData } from "../testData.js";

const api = supertest(app);

describe("Test forum routes", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });
  beforeEach(async () => {
    await seedTestData();
  });

  test("Get route returns test data forums", async () => {
    const result = await api.get("/forums/");
    expect(result.status).toBe(200);
    const data = JSON.parse(result.text) as typeof testData.forums;
    testData.forums.forEach((forum, index) => expect(data[index]).toMatchObject(forum));
  });

  test("Creating forum works", async () => {
    const fakeForum = { title: "New forum 1", description: "Forum created for testing" };
    const creationResponse = await api.post("/forums/new").send(fakeForum);
    expect(creationResponse.status).toBe(200);
    const response = await api.get("/forums/");
    const result = JSON.parse(response.text) as Forum[];
    expect(result).toContainEqual(expect.objectContaining(fakeForum));
  });

});

