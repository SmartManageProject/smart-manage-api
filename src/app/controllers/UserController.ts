import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import User from "../models/User";
import { AppDataSource } from "../../database";
import { GetAllUsersService } from "../services/GetAllUsersService";

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
  async list(req: Request, res: Response) {
    try {
      const search = req.query.search as string;
      const page = Number(req.query.page) || undefined;
      const limit = Number(req.query.limit) || undefined;

      const service = new GetAllUsersService();
      const [users, count] = await service.execute({ search, page, limit });

      return res.status(StatusCodes.OK).json({ count, users });
    } catch {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}
