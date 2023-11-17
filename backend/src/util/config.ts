import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT as string;

const IS_TEST = (process.env.IS_TEST as string) === "true";
export const IS_PRODUCTION = (process.env.PRODUCTION as string) === "true";
const POSTGRES_USER = IS_TEST
  ? (process.env.TEST_POSTGRES_USER as string)
  : (process.env.POSTGRES_USER as string);
const POSTGRES_PASSWORD = IS_TEST
  ? (process.env.TEST_POSTGRES_PASSWORD as string)
  : (process.env.POSTGRES_PASSWORD as string);
const POSTGRES_PORT = IS_TEST
  ? (process.env.TEST_POSTGRES_PORT as string)
  : (process.env.POSTGRES_PORT as string);
const POSTGRES_DB = IS_TEST
  ? (process.env.TEST_POSTGRES_DB as string)
  : (process.env.POSTGRES_DB as string);
const POSTGRES_CONTAINER = IS_TEST
  ? (process.env.TEST_POSTGRES_CONTAINER as string)
  : (process.env.POSTGRES_CONTAINER as string);

export const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_CONTAINER}:${POSTGRES_PORT}/${POSTGRES_DB}`;
