import express from "express";
import { connectToDatabase } from "./util/db.js";
import { PORT } from "./util/config.js";

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
