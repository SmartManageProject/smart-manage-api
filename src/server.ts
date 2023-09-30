import "dotenv/config";
import "reflect-metadata";

import express from "express";

import { AppDataSource } from "./database";
import { routes } from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
