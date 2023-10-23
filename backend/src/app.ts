import express from "express";
import "express-async-errors";
import userRouter from "./router/user.js";
import { errorHandler, logger, userExtractor } from "./util/middleware.js";
import postRouter from "./router/post.js";
import forumRouter from "./router/forum.js";
import threadRouter from "./router/thread.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use(userExtractor);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/forums", forumRouter);
app.use("/threads", threadRouter);
app.get("/", (_req, res) => {
  res.send("Hello world");
});

app.use(errorHandler);

export { app };
