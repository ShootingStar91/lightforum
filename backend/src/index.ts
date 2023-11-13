import { PORT } from "./util/config.js";
import { connectToDatabase } from "./util/db.js";
import { app } from "./app.js";
import { seedTestData } from "./testUtils/seedTestData.js";

const start = async () => {
  await connectToDatabase();
  await seedTestData();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
