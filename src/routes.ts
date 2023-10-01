import { Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { UserController } from "./app/controllers/UserController";

const routes = Router();

routes.post("/users", new UserController().create);
routes.post("/authenticate", new AuthController().authenticate);

export default routes;
