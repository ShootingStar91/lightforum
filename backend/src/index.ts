import express from "express";
import { connectToDatabase } from "./util/db.js";
import { PORT } from "./util/config.js";
import userRouter from "./router/user.js";
import { logger, userExtractor } from "./util/middleware.js";
import postRouter from "./router/post.js";

const errorHandler = async (error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.json("error happened" + error);
};

const app = express();
app.use(express.json())
app.use(logger);
app.use(userExtractor);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.get("/", (_req, res) => {
  res.send("Hello world");
});

console.log("moimoi")

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
