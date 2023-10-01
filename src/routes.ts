import { Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { UserController } from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";

const routes = Router();

routes.post("/authenticate", new AuthController().authenticate);
routes.post("/users", new UserController().create);

routes.use(authMiddleware);

export default routes;
