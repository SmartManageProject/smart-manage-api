"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const http_status_codes_1 = require("http-status-codes");
const CreateProjectService_1 = require("../services/CreateProjectService");
const GetProjectsByUserIdService_1 = require("../services/GetProjectsByUserIdService");
class ProjectController {
    async create(req, res, next) {
        try {
            const { name, description, membersId } = req.body;
            const service = new CreateProjectService_1.CreateProjectService();
            const project = await service.execute({
                name,
                description,
                membersId,
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                id: project.id,
                message: "Project created successfully",
            });
        }
        catch (e) {
            return next(e);
        }
    }
    async list(req, res, next) {
        const { userId } = req;
        const service = new GetProjectsByUserIdService_1.GetAllProjectsService();
        const projects = await service.execute({ userId });
        return res.json(projects);
    }
}
exports.ProjectController = ProjectController;
