import { PORT } from "./util/config.js";
import { connectToDatabase } from "./util/db.js";
import { app } from "./app.js";

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
