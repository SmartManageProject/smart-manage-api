import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CreateProjectService } from "../services/CreateProjectService";
import { CreateProjectRequest } from "../schemas/projectSchema";

export class ProjectController {
  async create(
    req: Request<object, object, CreateProjectRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, description, membersId } = req.body;
      const service = new CreateProjectService();
      const project = await service.execute({
        name,
        description,
        membersId,
      });

      return res.status(StatusCodes.CREATED).json({
        id: project.id,
        message: "Project created successfully",
      });
    } catch (e) {
      return next(e);
    }
  }
}
