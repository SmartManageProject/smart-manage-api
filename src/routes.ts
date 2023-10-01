import { Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { UserController } from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";

const routes = Router();

routes.post("/authenticate", new AuthController().authenticate);

routes.use(authMiddleware);

routes.post("/users", new UserController().create);

export default routes;
