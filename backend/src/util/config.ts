import * as dotenv from "dotenv";
dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PORT = process.env.PORT as string;