import { Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { UserController } from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";

const routes = Router();

routes.post("/users", new UserController().create);

routes.use(authMiddleware);

routes.post("/authenticate", new AuthController().authenticate);

export default routes;
