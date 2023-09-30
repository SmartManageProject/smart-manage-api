import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import { CreateUserService } from "../../services/user";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = createUserSchema.parse(req.body);
      const service = new CreateUserService();
      const user = await service.execute({ name, email, password });
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully", userId: user.id });
    } catch (e) {
      if (e instanceof ZodError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Validation Error", errors: e.issues });
      }

      if (e instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
      }
    }
  }
}
