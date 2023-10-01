import { Router } from "express";
import { UserController } from "./app/controllers/UserController";

const routes = Router();

routes.post("/users", new UserController().create);

export default routes;
