import express from "express";
import { connectToDatabase } from "./util/db.js";
import { PORT } from "./util/config.js";
import userRouter from "./router/user.js";
import { logger, userExtractor } from "./util/middleware.js";
import postRouter from "./router/post.js";
import forumRouter from "./router/forum.js";
import 'express-async-errors';

const errorHandler = (
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  res.json("Internal server error:" + error);
};

const app = express();
app.use(express.json());
app.use(logger);
app.use(userExtractor);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("forums", forumRouter);
app.get("/", (_req, res) => {
  res.send("Hello world");
});

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
