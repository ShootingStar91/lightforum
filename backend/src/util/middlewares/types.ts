import express from "express";

export type Next = () => void | Promise<void>;

export type Middleware = (
  req: express.Request,
  res: express.Response,
  next: Next
) => void;
