import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config.js";
console.log(DATABASE_URL);
const sequelize = new Sequelize(DATABASE_URL);

import { Umzug, SequelizeStorage } from "umzug";

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.ts",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((migration) => migration.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed", { err });
    return process.exit(1);
  }

  return null;
};

export { connectToDatabase, sequelize };
