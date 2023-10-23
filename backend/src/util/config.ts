import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT as string;

export const IS_TEST = (process.env.IS_TEST as string) === "true";

const POSTGRES_USER = process.env.POSTGRES_USER as string;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
const POSTGRES_PORT = process.env.POSTGRES_PORT as string;
const POSTGRES_DB = process.env.POSTGRES_DB as string;
const POSTGRES_CONTAINER = process.env.POSTGRES_CONTAINER as string;

const TEST_POSTGRES_USER = process.env.TEST_POSTGRES_USER as string;
const TEST_POSTGRES_PASSWORD = process.env.TEST_POSTGRES_PASSWORD as string;
const TEST_POSTGRES_PORT = process.env.TEST_POSTGRES_PORT as string;
const TEST_POSTGRES_DB = process.env.TEST_POSTGRES_DB as string;
const TEST_POSTGRES_CONTAINER = process.env.TEST_POSTGRES_CONTAINER as string;

export const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_CONTAINER}:${POSTGRES_PORT}/${POSTGRES_DB}`;
export const TEST_DATABASE_URL = `postgres://${TEST_POSTGRES_USER}:${TEST_POSTGRES_PASSWORD}@${TEST_POSTGRES_CONTAINER}:${TEST_POSTGRES_PORT}/${TEST_POSTGRES_DB}`;
