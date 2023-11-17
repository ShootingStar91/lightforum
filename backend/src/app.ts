import express from "express";
import "express-async-errors";
import userRouter from "./router/user.js";
import { errorHandler } from "./util/middlewares/errorHandler.js";
import postRouter from "./router/post.js";
import forumRouter from "./router/forum.js";
import threadRouter from "./router/thread.js";
import cors from 'cors';
import { logger } from "./util/middlewares/logger.js";
import { userExtractor } from "./util/middlewares/userExtractor.js";

const app = express();

app.use(cors());
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
