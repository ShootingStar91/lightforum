import express from "express";
import * as dotenv from "dotenv";

dotenv.config()

const app = express();

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

