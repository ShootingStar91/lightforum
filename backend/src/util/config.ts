import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT as string;

const POSTGRES_USER = process.env.POSTGRES_USER as string;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
const POSTGRES_PORT = process.env.POSTGRES_PORT as string;
const POSTGRES_DB = process.env.POSTGRES_DB as string;
const POSTGRES_CONTAINER = process.env.POSTGRES_CONTAINER as string;

export const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_CONTAINER}:${POSTGRES_PORT}/${POSTGRES_DB}`;
