import { Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { UserController } from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";
import errorMiddleware from "./app/middlewares/errorMiddleware";

const routes = Router();

routes.post("/authenticate", new AuthController().authenticate);
routes.post("/users", new UserController().create);

routes.use(authMiddleware);

routes.get("/users", new UserController().list);

routes.use(errorMiddleware);

export default routes;
