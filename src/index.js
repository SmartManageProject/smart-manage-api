"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
require("./app/websocket");
const PORT = process.env.PORT || 3000;
app_1.server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
