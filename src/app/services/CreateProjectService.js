"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectService = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../../database");
const Project_1 = __importDefault(require("../models/Project"));
const User_1 = __importDefault(require("../models/User"));
const MemberDoesNotExistException_1 = __importDefault(require("../exceptions/MemberDoesNotExistException"));
class CreateProjectService {
    async execute({ name, description, membersId }) {
        const projectRepository = database_1.AppDataSource.getRepository(Project_1.default);
        const userRepository = database_1.AppDataSource.getRepository(User_1.default);
        const members = await userRepository.findBy({ id: (0, typeorm_1.In)(membersId) });
        if (members.length !== membersId.length) {
            throw new MemberDoesNotExistException_1.default();
        }
        const project = projectRepository.create({ name, description, members });
        await projectRepository.save(project);
        return project;
    }
}
exports.CreateProjectService = CreateProjectService;
