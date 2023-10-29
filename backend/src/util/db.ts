import { Sequelize } from "sequelize";
import { DATABASE_URL} from "./config.js";
import { Umzug, SequelizeStorage } from "umzug";

console.log("Connecting to database url: " + DATABASE_URL);

const sequelize = new Sequelize(DATABASE_URL);

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
