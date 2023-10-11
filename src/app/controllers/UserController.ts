import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import User from "../models/User";
import { AppDataSource } from "../../database";
import { FindOperator, ILike } from "typeorm";

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
    const { search } = req.query;
    const whereConditions: {
      where?: Array<{ [key: string]: FindOperator<string> }>;
    } = {};

    if (search) {
      whereConditions.where = [
        { name: ILike(`%${search as string}%`) },
        { email: ILike(`%${search as string}%`) },
      ];
    }

    try {
      const repository = AppDataSource.getRepository(User);
      const [users, count] = await repository.findAndCount({
        order: {
          name: "ASC",
        },
        ...whereConditions,
      });
      return res.status(StatusCodes.OK).json({ count, users });
    } catch {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}
