import "dotenv/config";
import "reflect-metadata";

import { AppDataSource } from "./database";

import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
