import express from "express";
import userRouter from "./router/user.js";
import { logger, userExtractor } from "./util/middleware.js";
import postRouter from "./router/post.js";
import forumRouter from "./router/forum.js";
import "express-async-errors";

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

export { app };
