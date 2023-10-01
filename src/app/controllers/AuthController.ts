import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import User from "../models/User";
import { AppDataSource } from "../../database";

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(User);
      const { email, password } = authenticateSchema.parse(req.body);

      const user = await repository.findOne({ where: { email } });

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(StatusCodes.UNAUTHORIZED);
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return res.status(StatusCodes.OK).json({ id: user.id, token });
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
}