import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import User from "../models/User";
import { AppDataSource } from "../../database";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);
      const { name, email, password } = createUserSchema.parse(req.body);

      const userExists = await repository.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Email already exists" });
      }

      const user = repository.create({ name, email, password });

      await repository.save(user);

      return res.status(StatusCodes.CREATED).json({
        id: user.id,
        message: "User created successfully",
      });
    } catch (e) {
      if (e instanceof ZodError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Validation error", errors: e.issues });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async createFakeUser(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);
      const userData = {
        name: "User 1",
        email: "user1@example.com",
        password: "pass1",
      };
      const { name, email, password } = createUserSchema.parse(userData);

      if (!(await repository.findOne({ where: { email } }))) {
        const user = repository.create({ name, email, password });

        await repository.save(user);
      }

      res.status(StatusCodes.OK).json({ user: userData });
    } catch {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}
