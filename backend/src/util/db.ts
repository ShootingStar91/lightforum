import { Sequelize } from "sequelize";
import { IS_TEST, DATABASE_URL, TEST_DATABASE_URL } from "./config.js";
import { Umzug, SequelizeStorage } from "umzug";

const db_url = IS_TEST ? TEST_DATABASE_URL : DATABASE_URL;

console.log("Connecting to database url: " + db_url);

const sequelize = new Sequelize(db_url);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "src/migrations/*.js",
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
    console.log("Database connected");
  } catch (err) {
    console.log("Connecting database failed", { err });
    return process.exit(1);
  }

  return null;
};

export { connectToDatabase, sequelize };
