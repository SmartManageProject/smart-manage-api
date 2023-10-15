import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

import { CreateProjectService } from "../services/CreateProjectService";
import ValidationException from "../exceptions/ValidationException";

const createProjectSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  members: z.string().uuid().array(),
});

export class ProjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, members } = createProjectSchema.parse(
        req.body,
      );

      const service = new CreateProjectService();
      const project = await service.execute({
        name,
        description,
        membersId: members,
      });

      return res.status(StatusCodes.CREATED).json({
        id: project.id,
        message: "Project created successfully",
      });
    } catch (e) {
      if (e instanceof ZodError) {
        return next(new ValidationException(e));
      }
      return next(e);
    }
  }
}
