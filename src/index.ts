import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import routes from "./routes";

import swaggerDoc from "./swagger.json";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
