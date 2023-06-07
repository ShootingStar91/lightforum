import express from "express";
import { connectToDatabase } from "./util/db";
import { PORT } from "./util/config";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello world");
});

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })
}

start()
