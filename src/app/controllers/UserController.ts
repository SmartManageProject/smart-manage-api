import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import { GetAllUsersService } from "../services/GetAllUsersService";
import { CreateUserService } from "../services/CreateUserService";
import ValidationException from "../exceptions/ValidationException";

const createUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty(),
});

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = createUserSchema.parse(req.body);

      const service = new CreateUserService();
      const user = await service.execute({ name, email, password });

      return res.status(StatusCodes.CREATED).json({
        id: user.id,
        message: "User created successfully",
      });
    } catch (e) {
      if (e instanceof ZodError) {
        return next(new ValidationException(e));
      }
      return next(e);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query.search as string;
      const page = Number(req.query.page) || undefined;
      const limit = Number(req.query.limit) || undefined;

      const service = new GetAllUsersService();
      const [users, count] = await service.execute({ search, page, limit });

      return res.status(StatusCodes.OK).json({ count, users });
    } catch (e) {
      return next(e);
    }
  }
}
